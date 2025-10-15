import React from "react";
import UploadForm from "./components/UploadForm.jsx";
import "./style.css";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF8F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <UploadForm />
    </div>
  );
}
