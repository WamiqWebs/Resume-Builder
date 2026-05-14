"use client";

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  skill: string;
  education: string;
  experience: string;
  personal_statement: string;
}

interface TemplateProps {
  data: UserData;
  theme: string;
}

export default function ModernTemplate({ data, theme }: TemplateProps) {
  console.log("THEME:", theme);

  const themes: any = {
    blue: {
      gradient: "linear-gradient(to right, #22d3ee, #3b82f6, #1d4ed8)",
      accent: "text-blue-600",
      border: "border-blue-400",
      badge: "bg-blue-100 text-blue-700",
      dot: "bg-blue-500",
    },
    purple: {
      gradient: "linear-gradient(to right, #c084fc, #ec4899, #7e22ce)",
      accent: "text-purple-600",
      border: "border-purple-400",
      badge: "bg-purple-100 text-purple-700",
      dot: "bg-purple-500",
    },
    green: {
      gradient: "linear-gradient(to right, #4ade80, #10b981, #15803d)",
      accent: "text-green-600",
      border: "border-green-400",
      badge: "bg-green-100 text-green-700",
      dot: "bg-green-500",
    },
    gray: {
      gradient: "linear-gradient(to right, #9ca3af, #4b5563, #111827)",
      accent: "text-gray-600",
      border: "border-gray-400",
      badge: "bg-gray-200 text-gray-700",
      dot: "bg-gray-600",
    },
     cyan: {
      gradient: "linear-gradient(to right, #22d3ee, #0ea5e9, #075985)",
      accent: "text-cyan-600",
      border: "border-cyan-400",
      badge: "bg-cyan-200 text-cyan-700",
      dot: "bg-cyan-600",
    },
  };

  const active = themes[theme] || themes.blue;

  return (
    <div id="cv-template" className="max-w-4xl mx-auto p-6 transition-all duration-500">

      {/* MAIN CARD */}
      <div className={`relative shadow-2xl rounded-2xl overflow-hidden bg-white border ${active.border}`}>

        {/* ✅ FIXED TOP BAR */}
        <div
          className="h-2"
          style={{ background: active.gradient }}
        />

        <div className="p-8 text-black">

          {/* HEADER */}
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6 mb-6 ${active.border}`}>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
                {data.name || "Your Name"}
              </h1>

              <p className="text-sm mt-2">
                {data.email} • {data.phone} • {data.location}
              </p>
            </div>

            {/* BADGE */}
            <div className={`px-4 py-2 text-center rounded-lg text-sm font-medium ${active.badge}`}>
              Professional Profile
            </div>
          </div>

          {/* PROFILE */}
          <section className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${active.accent}`}>
              Profile
            </h2>
            <p className="leading-relaxed">
              {data.personal_statement}
            </p>
          </section>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* SKILLS */}
            <section className={`p-5 rounded-xl border transition hover:scale-[1.02] ${active.border}`}>
              <h2 className={`text-lg font-semibold mb-3 ${active.accent}`}>
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {(data.skill || "").split(",").map((skill, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 text-sm rounded-full border ${active.border}`}
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section className={`p-5 rounded-xl border transition hover:scale-[1.02] ${active.border}`}>
              <h2 className={`text-lg font-semibold mb-3 ${active.accent}`}>
                Education
              </h2>

              <ul className="space-y-2 text-sm">
                {(data.education || "").split(",").map((edu, i) => (
                  <li key={i} className={`border-l-2 pl-3 ${active.border}`}>
                    {edu.trim()}
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* EXPERIENCE */}
          <section className={`mt-6 p-5 rounded-xl border ${active.border}`}>
            <h2 className={`text-lg font-semibold mb-3 ${active.accent}`}>
              Experience
            </h2>

            <ul className="space-y-3 text-sm">
              {(data.experience || "").split(",").map((exp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`w-2 h-2 mt-1.5 rounded-full ${active.dot}`} />
                  <span>{exp.trim()}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}