import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MemberDashboard from "./pages/MemberDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";
import CoworkingSpaces from "./pages/CoworkingSpaces";
import PartnerList from "./pages/PartnerList";
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
          <Route path="/spaces" element={<CoworkingSpaces />} />
          <Route path="/partners" element={<PartnerList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
