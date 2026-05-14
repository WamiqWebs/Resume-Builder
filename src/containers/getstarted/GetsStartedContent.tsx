"use client"

import { useState } from "react"

export default function GetStartedContent() {

  const [dropdown, setDropdown] = useState(false)

  return (
    <>
      <section className="w-screen ml-[calc(50%-50vw)] bg-linear-to-r  from-teal-500 to-teal-700">

        <div className="py-8 text-center">

          <span className="text-lime-500 font-serif text-3xl md:text-4xl">Get Started</span>

          {/* wrapper */}
          <div className="inline-block relative group">

            <span
              onClick={() => setDropdown(!dropdown)}
              className={`inline-block ml-2 text-white transition-transform text-2xl duration-200 cursor-pointer
              ${dropdown ? "rotate-90" : ""}
              group-hover:rotate-90`}
            >
              {">"}
            </span>

            {(dropdown) && (
              <ul className="absolute left-1/2 -translate-x-1/2 text-white mt-3 bg-lime-400 py-4 rounded-md w-40 shadow-lg font-serif text-sm">
                <li className="hover:backdrop-blur-2xl hover:bg-white/30 py-2 px-2 md:px-5">Enter your data</li>
                <li className="hover:backdrop-blur-2xl hover:bg-white/30 py-2 px-2 md:px-5">Choose template</li>
                <li className="hover:backdrop-blur-2xl hover:bg-white/30 py-2 px-2 md:px-5">submit to generate Resume</li>
              </ul>
            )}

          </div>

        </div>

      </section>
    </>
  )
}