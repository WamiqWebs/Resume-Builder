"use client"

export default function Info() {

  const infoprops = [
    {
      icon: "🔒",
      description: "Your data stays private and secure"
    },
    {
      icon: "⚡",
      description: "Simple, fast, and hassle-free."
    },
    {
      icon: "🤖",
      description: "AI helps improve your wording and structure."
    }
  ]

  return(
    <section className="w-screen ml-[calc(50%-50vw)] py-12 bg-linear-to-r from-[#111827] to-[#1f2937]">
      
      <h1 className="font-semibold text-2xl md:text-3xl text-teal-500 text-center">
        Important Notes
      </h1>

      <div className="px-5 md:px-15 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 mt-8">

        {infoprops.map((item, index) => (
          
          <div 
            key={index} 
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-teal-700 p-2 md:p-5 
            rounded-xl text-center text-white
                       hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20 
                       transition-all duration-300"
          >

            <div className="text-3xl mb-3">
              {item.icon}
            </div>

            <p className="text-sm md:text-base text-gray-200">
              {item.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  )
}