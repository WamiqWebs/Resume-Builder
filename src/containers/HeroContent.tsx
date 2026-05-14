// src/components/Hero.tsx
import React from "react";
import Link from "next/link";


export default function HeroContent() {
  return (
    <section className="w-screen ml-[calc(50%-50vw)] bg-[#111827] justify-center items-center flex flex-col p-5 text-center">
     <h1 className="text-[#F9FAFB] font-bold text-2xl md:text-3xl lg:text-4xl mb-5">Build Your Perfect Resume with AI</h1>
     <p className="text-[#F9FAFB] font-serif mb-5"> Generate professional, ATS-friendly resumes in minutes.</p>
    <div className="flex gap-3 md:gap-5 lg:gap-7">
        <Link  href="/getstarted" className="py-2 px-3 rounded bg-teal-400 hover:bg-lime-500 text-white ">Get Started</Link>
        <Link href="/learnmore" className="py-2 px-3 rounded bg-teal-400 hover:bg-lime-500 text-white">Learn More</Link>
    </div>
    </section>
  );
}