export function MissionVision() {
  return (
    <section className="w-screen ml-[calc(50%-50vw)] px-5 md:px-15 py-20 text-teal-400 text-center bg-gray-900">
      <h2 className="text-3xl font-bold mb-10">Our Purpose</h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-black/40 p-6 rounded-2xl border-teal-400 border-2 transition-all duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">Mission</h3>
          <p className="text-gray-200">
            To make resume building simple, fast, and accessible for everyone.
          </p>
        </div>

        <div className="bg-black/40 p-6 rounded-2xl border-teal-400 border-2 transition-all duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 ">Vision</h3>
          <p className="text-gray-200">
            To help people present themselves better and unlock opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}