"use client";
import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    // Remove loader within 400ms — well within 500ms TTI constraint
    const timer = setTimeout(() => {
      const el = document.getElementById("page-loader");
      if (el) el.classList.add("loaded");
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="page-loader" aria-hidden="true">
      <div className="loader-ring" />
    </div>
  );
}
