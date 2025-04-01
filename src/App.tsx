
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import DocumentsPage from "./pages/DocumentsPage";
import StatsPage from "./pages/StatsPage";
import VehiclesPage from "./pages/VehiclesPage";
import WalletPage from "./pages/WalletPage";
import RatingPage from "./pages/RatingPage";
import ProfileLevelPage from "./pages/ProfileLevelPage";
import ReviewsPage from "./pages/ReviewsPage";
import NewCargoPage from "./pages/NewCargoPage";
import PersonalDataPage from "./pages/PersonalDataPage";
import RolesPage from "./pages/RolesPage";
import LoginHistoryPage from "./pages/LoginHistoryPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/rating" element={<RatingPage />} />
          <Route path="/profile-level" element={<ProfileLevelPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/new-cargo" element={<NewCargoPage />} />
          
          {/* New profile related routes */}
          <Route path="/profile/personal-data" element={<PersonalDataPage />} />
          <Route path="/profile/roles" element={<RolesPage />} />
          <Route path="/profile/login-history" element={<LoginHistoryPage />} />
          <Route path="/profile/change-password" element={<ChangePasswordPage />} />
          
          {/* Additional routes would be added here */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
