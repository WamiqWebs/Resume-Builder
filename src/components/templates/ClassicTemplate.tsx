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
}

export default function ClassicTemplate({ data }: TemplateProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white/90  backdrop-blur-md text-black p-8 shadow-lg border border-black/30 rounded-lg">

      {/* Header */}
      <div className="text-center border-b text-black border-black/30 pb-4 mb-6">
        <h1 className="text-3xl font-bold">{data.name || "Full Name"}</h1>
        <p className="text-sm mt-1">
          {data.email || "email@example.com"} | {data.phone || "+00 123456"} | {data.location || "City, Country"}
        </p>
      </div>

      {/* Profile */}
      <section className="mb-6 text-black">
        <h2 className="font-semibold text-lg border-b border-black/30 mb-2">Profile</h2>
        <p className="text-sm leading-relaxed">{data.personal_statement || "Your professional summary..."}</p>
      </section>

      {/* Skills */}
      <section className="mb-6 text-black">
        <h2 className="font-semibold text-lg border-b border-black/30 mb-2">Skills</h2>
        <ul className="list-disc pl-5 text-sm">
          {(data.skill || "").split(",").map((skill, i) => (
            <li key={i}>{skill.trim() || "Skill"}</li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="mb-6 text-black">
        <h2 className="font-semibold text-lg  border-b border-black/30 mb-2">Experience</h2>
        <ul className="list-disc pl-5 text-sm">
          {(data.experience || "").split(",").map((exp, i) => (
            <li key={i}>{exp.trim() || "Job / Role"}</li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section className="text-black">
        <h2 className="font-semibold text-lg border-b border-black/30 mb-2">Education</h2>
        <ul className="list-disc pl-5 text-sm ">
          {(data.education || "").split(",").map((edu, i) => (
            <li key={i}>{edu.trim() || "Degree / Institution"}</li>
          ))}
        </ul>
      </section>

    </div>
  );
}