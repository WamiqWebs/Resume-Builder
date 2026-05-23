"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

function ResumeContent() {
  const searchParams = useSearchParams();

  const selected =
    searchParams.get("selected") || "MinimalTemplate";

  const theme =
    searchParams.get("theme") || "blue";

  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userdata");
    const urlData = searchParams.get("data");

   if (urlData) {
  try {
    setData(JSON.parse(decodeURIComponent(urlData)));
  } catch (err) {
    console.error("URL DATA PARSE ERROR:", err);
  }
}
  }, [searchParams]);

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

  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      {render()}
    </div>
  );
}

export default function ResumePreview() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeContent />
    </Suspense>
  );
}