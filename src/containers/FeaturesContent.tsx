interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Fast Resume Generation",
    description: "Generate your resume in minutes with AI-powered suggestions.",
  },
  {
    title: "Professional Templates",
    description: "Choose from multiple ATS-friendly resume templates.",
  },
  {
    title: "Easy Editing",
    description: "Customize your content and layout effortlessly.",
  },
  {
  title: "ATS Optimization",
  description: "Ensure your resume passes Applicant Tracking Systems with smart keyword suggestions."
},
{
  title: "Real-Time Preview",
  description: "See instant updates as you edit your resume with a live preview panel."
},
{
  title: "Export in Multiple Formats",
  description: "Download your resume in PDF or DOCX format ready to send to employers."
},
];

export default function FeaturesContent() {
  return (
    <section className="w-screen ml-[calc(50%-50vw)] bg-[#111827] p-5">
      <h1 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl text-white mt-6 mb-6">
        Features
      </h1>

      <div className="mx-[5%] px-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg hover:shadow-lime-500 transition"
          >
            <h3 className="text-md lg:text-xl font-semibold text-teal-400 hover:underline mb-3 inline-block">
              {feature.title}
            </h3>
            <p className="text-[#F9FAFB]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
