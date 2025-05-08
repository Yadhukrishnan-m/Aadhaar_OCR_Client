import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import AadhaarOcrPage from "./pages/AadhaarOcrPage";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
function App() {

  return (
    <>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<AadhaarOcrPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
