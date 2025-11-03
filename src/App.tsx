import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MemberDashboard from "./pages/MemberDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";
import PartnerVerification from "./pages/PartnerVerification";
import AdminDashboard from "./pages/AdminDashboard";
import Billing from "./pages/Billing";
import CoworkingSpaces from "./pages/CoworkingSpaces";
import PartnerList from "./pages/PartnerList";
import DirectoryWithMap from "./pages/DirectoryWithMap";
import ExclusivePerks from "./pages/ExclusivePerks";
import InstantVerification from "./pages/InstantVerification";
import TenantPrivilege from "./pages/TenantPrivilege";
import DigitalPass from "./pages/DigitalPass";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/partner" element={<PartnerDashboard />} />
          <Route path="/partner/verify" element={<PartnerVerification />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/spaces" element={<CoworkingSpaces />} />
          <Route path="/partners" element={<PartnerList />} />
          <Route path="/directory" element={<DirectoryWithMap />} />
          <Route path="/perks" element={<ExclusivePerks />} />
          <Route path="/verification" element={<InstantVerification />} />
          <Route path="/tenant-privilege" element={<TenantPrivilege />} />
          <Route path="/digital-pass" element={<DigitalPass />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
