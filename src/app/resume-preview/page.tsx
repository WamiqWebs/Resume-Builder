"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ModernTemplate from "@/src/components/templates/ModernTemplate";
import ClassicTemplate from "@/src/components/templates/ClassicTemplate";
import MinimalTemplate from "@/src/components/templates/MinimalTemplate";

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

export default function ResumePreview() {
  const searchParams = useSearchParams();

  const selected = searchParams.get("selected") || "MinimalTemplate";
  const theme = searchParams.get("theme") || "blue";

  const [data, setData] = useState<UserData | null>(null);

  // ✅ LOAD REAL DATA FROM LOCALSTORAGE
  useEffect(() => {
  const stored = localStorage.getItem("userdata");
  const urlData = searchParams.get("data");

  if (urlData) {
    setData(JSON.parse(decodeURIComponent(urlData)));
  } else if (stored) {
    setData(JSON.parse(stored));
  }
}, []);

  const render = () => {
    if (!data) {
      return (
        <div className="text-center mt-5 text-gray-500">
          Loading resume data...
        </div>
      );
    }

    switch (selected) {
      case "ModernTemplate":
        return <ModernTemplate data={data} theme={theme} />;

      case "ClassicTemplate":
        return <ClassicTemplate data={data} />;

      case "MinimalTemplate":
        return <MinimalTemplate data={data} />;

      default:
        return <p>Invalid template</p>;
    }
  };

  return <div className="flex justify-center items-center h-screen">{render()}</div>;
}