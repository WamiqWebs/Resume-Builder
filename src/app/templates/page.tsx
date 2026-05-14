"use client";

import Footer from "@/src/components/Footer";
import ClassicTemplate from "@/src/components/templates/ClassicTemplate";
import MinimalTemplate from "@/src/components/templates/MinimalTemplate";
import ModernTemplate from "@/src/components/templates/ModernTemplate";
import { useEffect, useState, useRef } from "react";

export type UserData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  personal_statement: string;
  experience: string;
  education: string;
  skill: string;
};

export default function TemplatesPage() {
  const [data, setData] = useState<UserData | null>(null);
  const [aiData, setAiData] = useState<UserData | null>(null);
  const [theme, setTheme] = useState("blue");
  const templateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

 useEffect(() => {
  const stored = localStorage.getItem("userdata");

  if (stored) {
    const parsed = JSON.parse(stored);
    

    const isValid =
      parsed.name?.trim() &&
      parsed.email?.trim() &&
      parsed.phone?.trim();

    if (isValid) {
      setData(parsed);
      
    } else {
      setData(null);
      console.error("No Data Found in LocalStorage");
    }
  } else {
    setData(null);
  }
}, []);

  useEffect(() => {
    if (data) localStorage.setItem("userdata", JSON.stringify(data));
  }, [data]);

  const templates = ["MinimalTemplate", "ClassicTemplate", "ModernTemplate"];

  const handleRegenerate = async () => {
    if (!data) return;
    setLoading(true);

    try {
      const response = await fetch("/api/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      const isValid =
        result &&
        (result.personal_statement ||
          result.experience ||
          result.education ||
          result.skill);

      if (!isValid) return;

      const newData: UserData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        skill: result.skills || data.skill || "",
        education: result.education || data.education || "",
        experience: result.experience || data.experience || "",
        personal_statement:
          result.personal_statement || data.personal_statement || "",
      };

      setAiData(newData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOriginal = () => {
    setAiData(null);
  };

  const renderTemplate = () => {
    if (!data) {
      return (
        <p className="text-white mt-5 text-center">
          Please fill in the form first.
        </p>
      );
    }

    switch (selected) {
      case "MinimalTemplate":
        return <MinimalTemplate data={data} />;

      case "ClassicTemplate":
        return (
          <div className="flex justify-center items-center min-h-75">
            {loading ? (
              <div className="w-12 h-12 border-4 border-[#111827] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <ClassicTemplate data={aiData || data} />
            )}
          </div>
        );

      case "ModernTemplate":
        return (
          <div className="flex justify-center items-center min-h-75">
            {loading ? (
              <div className="w-12 h-12 border-4 border-[#111827] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <ModernTemplate data={aiData || data} theme={theme} />
            )}
          </div>
        );

      default:
        return (
          <p className="text-white mt-5 text-center">
            Please select a template.
          </p>
        );
    }
  };

  const handleDownloadPDF = async () => {
    // ✅ BLOCK EMPTY REQUEST
    if (!selected) {
      alert("Please select a template first");
      return;
    }

    try {
      setIsDownloading(true);

      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selected,
          theme,
          data: aiData || data,
        }),
      });

      if (!res.ok) {
        console.error("PDF FAILED:", await res.text());
        return;
      }

      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "My-CV.pdf";
      link.click();

    } catch (err) {
      console.error("PDF ERROR:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
    <section
      className="w-screen ml-[calc(50%-50vw)] py-8 min-h-screen"
      style={{
        background: "linear-gradient(to right, limegreen, teal)",
      }}
    >
      <div className="p-5 text-white max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-5">
          Select Template
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div
              key={t}
              onClick={() => setSelected(t)}
              className={`p-5 border rounded-lg cursor-pointer transition
              ${selected === t ? "border-2 border-[#111827] bg-black/50" : ""
                }`}
            >
              <h2 className="text-lg font-semibold">{t}</h2>
            </div>
          ))}
        </div>

        <div
          className="my-10 flex flex-col items-center justify-center"
          ref={templateRef}
        >
          {renderTemplate()}

          {selected === "ModernTemplate" && (
            <div className="p-2 flex items-center justify-center gap-2">
              <div
                className="h-4 w-4 border rounded-full bg-blue-800"
                onClick={() => setTheme("blue")}
              />
              <div
                className="h-4 w-4 border rounded-full bg-purple-800"
                onClick={() => setTheme("purple")}
              />
              <div
                className="h-4 w-4 border rounded-full bg-gray-800"
                onClick={() => setTheme("gray")}
              />
              <div
                className="h-4 w-4 border rounded-full bg-green-800"
                onClick={() => setTheme("green")}
              />
              <div
                className="h-4 w-4 border rounded-full bg-cyan-800"
                onClick={() => setTheme("cyan")}
              />
            </div>
          )}
        </div>

        {data &&
          (selected === "ClassicTemplate" ||
            selected === "ModernTemplate") && (
            <div className="flex justify-center items-center mt-5 gap-3">
              <button
                onClick={handleRegenerate}
                className="px-4 py-2 rounded-lg bg-[#111827] hover:bg-green-500"
                disabled={loading}
              >
                {loading ? "Regenerating..." : "Regenerate CV"}
              </button>

              <button
                onClick={handleOriginal}
                className="px-4 py-2 rounded-lg bg-[#111827] hover:bg-green-500"
              >
                Original CV
              </button>
            </div>
          )}

        {data &&
          (selected === "MinimalTemplate" ||
            selected === "ModernTemplate" ||
            selected === "ClassicTemplate") && (
            <div className="flex justify-center p-2">
              <button
                disabled={!selected || isDownloading}
                className="px-3 py-2 bg-red-500 hover:bg-green-500 rounded disabled:opacity-50"
                onClick={handleDownloadPDF}
              >
                Download CV
              </button>
            </div>
          )}
      </div>
    </section>
     <Footer />
    </>
  ); 
}
