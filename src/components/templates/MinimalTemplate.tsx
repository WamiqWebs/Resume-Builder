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

export default function MinimalTemplate({ data }: TemplateProps) {
  return (
    <div className="max-w-3xl bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">

      {/* Header */}
      <div className="border-b border-gray-600 pb-4 mb-5 ">
        <div className="text-center flex flex-col md:flex-row justify-center">
          <span className="text-2xl md:text-3xl">💠</span>
          <span className="text-2xl md:text-3xl font-bold font-serif text-white mb-3 md:mb-5">{data.name}</span>
        </div>
        <p className="text-gray-300">{data.email} | {data.phone}</p>
        <p className="text-gray-400">{data.location}</p>
      </div>

      {/* Summary */}
      <div className="mb-5">
        <h2 className="font-semibold text-lg mb-1 text-blue-400">Profile</h2>
        <p className="text-gray-300">{data.personal_statement}</p>
      </div>

      {/* Skills */}
      <div className="mb-5">
        <h2 className="font-semibold text-lg mb-1 text-blue-400">Skills</h2>
        <p className="text-gray-300">{data.skill}</p>
      </div>

      {/* Education */}
      <div className="mb-5">
        <h2 className="font-semibold text-lg mb-1 text-blue-400">Education</h2>
        <p className="text-gray-300">{data.education}</p>
      </div>

      {/* Experience */}
      <div>
        <h2 className="font-semibold text-lg mb-1 text-blue-400">Experience</h2>
        <p className="text-gray-300">{data.experience}</p>
      </div>

    </div>
  );
}