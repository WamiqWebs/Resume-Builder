
export function                                                  Story() {
  const blocks = [
    "People often find resume writing confusing and time-consuming.",
    "We believed AI could make it simple and efficient.",
    "So we built a system that writes and structures resumes for you.",
    "Now creating a CV takes minutes, not hours.",
  ];

  return (
    <section className="w-screen ml-[calc(50%-50vw)] px-5 md:px-15 flex bg-[#111827] min-h-screen text-teal-300 py-8">
      {/* LEFT */}
      <div className="w-1/2 sticky top-0 flex items-center justify-center text-2xl md:text-4xl lg:text-6xl font-bold bg-black">
        Our Story
      </div>

      {/* RIGHT */}
      <div className="w-1/2 p-5 md:p-10 space-y-20 ">
        {blocks.map((text, i) => (
            <ul className="list-disc">
          <p key={i} className="text-md md:text-lg leading-relaxed">
            {text}
          </p>
          </ul>
        ))}
      </div>
    </section>
  );
}
