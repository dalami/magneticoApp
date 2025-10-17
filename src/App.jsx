import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadForm from "./components/UploadForm.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
