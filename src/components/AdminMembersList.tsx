import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  status: string;
  tier: string;
  created_at: string;
  subscription?: {
    status: string;
    current_period_end: string;
  };
}

const AdminMembersList = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const { data: membersData, error } = await supabase
      .from("members")
      .select(`
        id,
        first_name,
        last_name,
        status,
        tier,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading members:", error);
      setLoading(false);
      return;
    }

    // Load subscriptions for each member
    const membersWithSubs = await Promise.all(
      (membersData || []).map(async (member) => {
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("status, current_period_end")
          .eq("member_id", member.id)
          .maybeSingle();

        return {
          ...member,
          subscription: sub || undefined,
        };
      })
    );

    setMembers(membersWithSubs);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      active: "secondary",
      trial: "default",
      inactive: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  {member.first_name} {member.last_name}
                </TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell>{member.tier}</TableCell>
                <TableCell>
                  {member.subscription ? (
                    <div className="text-sm">
                      <div>{getStatusBadge(member.subscription.status)}</div>
                      <div className="text-muted-foreground text-xs mt-1">
                        Until {new Date(member.subscription.current_period_end).toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">No subscription</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(member.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminMembersList;
