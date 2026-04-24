"use client";

import ResumeForm from "@/features/resume/components/ResumeForm";
import ResumePreview from "@/features/resume/components/ResumePreview";
import { ResumeData } from "@/features/resume/types";
import { Check, Download, RotateCcw, Save } from "lucide-react";
import { CSSProperties } from "react";
import { useState } from "react";

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
  },
  education: [],
  experience: [],
  projects: [],
};

const sparkles = [
  { top: "8%", left: "11%", size: 4, delay: "0.2s", duration: "7.8s" },
  { top: "18%", left: "74%", size: 5, delay: "1.1s", duration: "8.2s" },
  { top: "36%", left: "87%", size: 3, delay: "2.2s", duration: "7.4s" },
  { top: "52%", left: "6%", size: 4, delay: "1.8s", duration: "8.6s" },
  { top: "66%", left: "92%", size: 5, delay: "0.7s", duration: "6.9s" },
  { top: "81%", left: "34%", size: 3, delay: "2.8s", duration: "7.1s" },
  { top: "74%", left: "58%", size: 4, delay: "1.5s", duration: "8.9s" },
  { top: "26%", left: "45%", size: 3, delay: "0.4s", duration: "7.7s" },
] as const;

export default function Home() {
  const [formData, setFormData] = useState<ResumeData>(() => {
    if (typeof window === "undefined") {
      return initialResumeData;
    }

    const saved = localStorage.getItem("resume-data");
    if (!saved) {
      return initialResumeData;
    }

    try {
      return JSON.parse(saved) as ResumeData;
    } catch {
      localStorage.removeItem("resume-data");
      return initialResumeData;
    }
  });
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");

  const handleSave = () => {
    localStorage.setItem("resume-data", JSON.stringify(formData));
    setSaveState("saved");
    window.setTimeout(() => {
      setSaveState("idle");
    }, 1600);
  };

  const handleReset = () => {
    setFormData(initialResumeData);
    localStorage.removeItem("resume-data");
    setSaveState("idle");
  };

  const handleDownload = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    const html2pdf = (await import("html2pdf.js")).default;

    html2pdf()
      .set({
        margin: 0.5,
        filename: "hogwarts_resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <main className="page-fade relative min-h-screen bg-linear-to-br from-[#0f0f0f] to-[#1a1a1a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6))]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />

      {sparkles.map((sparkle, index) => (
        <span
          key={index}
          className="sparkle"
          style={
            {
              top: sparkle.top,
              left: sparkle.left,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              "--delay": sparkle.delay,
              "--duration": sparkle.duration,
            } as CSSProperties
          }
          aria-hidden="true"
        />
      ))}

      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#8a6c2f33] bg-[#111111cc] px-6 py-3 backdrop-blur">
        <p className="font-serif text-2xl font-semibold tracking-wide text-[#d4af37]">The Wizard&apos;s Ledger</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset resume"
            title="Reset"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-[#8a6c2f4d] bg-[#0b0b0b] text-[#d8ccb1] transition transform hover:scale-105 hover:bg-[#18140f] hover:shadow-xl active:scale-95"
          >
            <RotateCcw size={15} />
          </button>

          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download PDF"
            title="Download PDF"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-[#8a6c2f4d] bg-[#0b0b0b] text-[#d8ccb1] transition transform hover:scale-105 hover:bg-[#18140f] hover:shadow-xl active:scale-95"
          >
            <Download size={15} />
          </button>

          <button
            type="button"
            onClick={handleSave}
            aria-label="Save resume"
            title="Save"
            className="magic-button inline-flex size-9 items-center justify-center p-0 transition transform hover:scale-105 active:scale-95"
          >
            <Save size={15} />
          </button>

          <span
            className={`inline-flex min-w-20 items-center justify-center gap-1 rounded-lg border px-2 py-2 text-xs font-semibold transition duration-300 ${
              saveState === "saved"
                ? "border-[#4f8f65] bg-[#1d3a2a] text-[#d6f5e0] opacity-100"
                : "border-transparent text-transparent opacity-0"
            }`}
            aria-live="polite"
          >
            <Check size={14} />
            Saved
          </span>
        </div>
      </header>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 p-8">
        <section className="magical-panel section-entrance col-span-12 lg:col-span-5 p-5">
          <ResumeForm formData={formData} setFormData={setFormData} />
        </section>

        <section className="section-entrance col-span-12 lg:col-span-7 [animation-delay:120ms]">
          <ResumePreview data={formData} />
        </section>
      </div>
    </main>
  );
}
