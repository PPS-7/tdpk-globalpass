import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Search, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MemberVerification {
  member_id: string;
  member_name: string;
  tier: string;
  status: string;
  subscription_status: string;
  subscription_end: string | null;
}

export const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verification, setVerification] = useState<MemberVerification | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  const startScanning = () => {
    setScanning(true);
    setVerification(null);

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        handleScanSuccess(decodedText);
        scanner.clear();
        setScanning(false);
      },
      (error) => {
        console.log("Scan error:", error);
      }
    );

    scannerRef.current = scanner;
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setScanning(false);
  };

  const handleScanSuccess = async (token: string) => {
    await verifyMember(token);
  };

  const handleManualVerify = async () => {
    if (!manualInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter an email or token",
        variant: "destructive",
      });
      return;
    }
    await verifyMember(manualInput);
  };

  const verifyMember = async (identifier: string) => {
    setVerifying(true);
    try {
      // Get current partner info
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: partnerUser } = await supabase
        .from("partner_users")
        .select("partner_id")
        .eq("id", session.user.id)
        .single();

      if (!partnerUser) {
        toast({
          title: "Error",
          description: "Partner information not found",
          variant: "destructive",
        });
        return;
      }

      // Check if it's a QR token or email
      const isEmail = identifier.includes('@');
      
      let memberId: string | null = null;

      if (isEmail) {
        // Look up member by email
        const { data: user } = await supabase.auth.admin.getUserById(identifier);
        if (user) {
          memberId = user.user.id;
        }
      } else {
        // Validate QR token
        const { data: token } = await supabase
          .from("qr_tokens")
          .select("member_id, expires_at, revoked")
          .eq("jti", identifier)
          .maybeSingle();

        if (token && !token.revoked && new Date(token.expires_at) > new Date()) {
          memberId = token.member_id;
        } else {
          toast({
            title: "Invalid Token",
            description: "QR code is expired or invalid",
            variant: "destructive",
          });
          setVerifying(false);
          return;
        }
      }

      if (!memberId) {
        toast({
          title: "Not Found",
          description: "Member not found",
          variant: "destructive",
        });
        setVerifying(false);
        return;
      }

      // Get member details
      const { data: member } = await supabase
        .from("members")
        .select("id, first_name, last_name, tier, status")
        .eq("id", memberId)
        .single();

      // Get subscription status
      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("status, current_period_end")
        .eq("member_id", memberId)
        .maybeSingle();

      if (member) {
        const verificationData: MemberVerification = {
          member_id: member.id,
          member_name: `${member.first_name} ${member.last_name}`,
          tier: member.tier,
          status: member.status,
          subscription_status: subscription?.status || 'none',
          subscription_end: subscription?.current_period_end || null,
        };

        setVerification(verificationData);

        // Record verification
        await supabase.from("verifications").insert({
          partner_id: partnerUser.partner_id,
          member_id: memberId,
          method: isEmail ? 'lookup' : 'qr',
          result: subscription?.status === 'active' ? 'active' : 'expired',
        });

        toast({
          title: "Verification Successful",
          description: `Member ${verificationData.member_name} verified`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            QR Code Scanner
          </CardTitle>
          <CardDescription>
            Scan member QR codes to verify membership status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!scanning && !verification && (
            <Button onClick={startScanning} className="w-full" variant="premium">
              <Camera className="h-4 w-4 mr-2" />
              Start Camera Scanner
            </Button>
          )}

          {scanning && (
            <div>
              <div id="qr-reader" className="w-full"></div>
              <Button onClick={stopScanning} variant="outline" className="w-full mt-4">
                Stop Scanning
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Manual Lookup
          </CardTitle>
          <CardDescription>
            Search member by email or token code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="manual-input">Email or Token</Label>
            <Input
              id="manual-input"
              placeholder="member@example.com or token123"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualVerify()}
            />
          </div>
          <Button
            onClick={handleManualVerify}
            disabled={verifying}
            className="w-full"
          >
            {verifying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Verify Member
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {verification && (
        <Card className={
          verification.subscription_status === 'active'
            ? "border-secondary/50 bg-secondary/5"
            : "border-destructive/50 bg-destructive/5"
        }>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {verification.subscription_status === 'active' ? (
                <CheckCircle2 className="h-5 w-5 text-secondary" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
              Verification Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Member Name</p>
                <p className="font-semibold">{verification.member_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tier</p>
                <Badge variant="outline">{verification.tier}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={
                  verification.subscription_status === 'active'
                    ? 'bg-secondary'
                    : 'bg-destructive'
                }>
                  {verification.subscription_status}
                </Badge>
              </div>
              {verification.subscription_end && (
                <div>
                  <p className="text-sm text-muted-foreground">Valid Until</p>
                  <p className="text-sm font-medium">
                    {new Date(verification.subscription_end).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {verification.subscription_status === 'active' ? (
              <Alert className="border-secondary/50 bg-secondary/10">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <AlertDescription>
                  Member has an active subscription and can access partner benefits
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  Member does not have an active subscription
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={() => {
                setVerification(null);
                setManualInput("");
              }}
              variant="outline"
              className="w-full"
            >
              Verify Another Member
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
