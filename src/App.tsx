import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import RecipeDetail from "./pages/RecipeDetail";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import CreateRecipe from "./pages/CreateRecipe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppProvider>
          <Navbar />
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
