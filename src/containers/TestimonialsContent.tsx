"use client";

import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ali Khan",
    role: "Frontend Developer",
    message: "This platform completely changed my workflow.",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    role: "UI Designer",
    message: "Beautiful experience and smooth performance.",
  },
  {
    id: 3,
    name: "Hassan Raza",
    role: "Full Stack Dev",
    message: "Highly professional and well structured.",
  },
  {
    id: 4,
    name: "Ahmed Ali",
    role: "Full Stack Dev",
    message: "Great and professional structure.",
  },
];

export default function TestimonialsContent() {

  // ✅ Hooks MUST be inside component
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    arrows: false,
    cssEase: "linear",
  };

  return (
    <div
      className="w-screen ml-[calc(50%-50vw)] px-5 md:px-15 py-10 bg-cover bg-center border-2 border-white"
      style={{ backgroundImage: "url('/Gai.png')" }}
    >
      <h1 className="text-gray-800 text-center font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
        Testimonials
      </h1>

      <Slider {...settings}>
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="rounded-lg hover:scale-95 transition-all duration-300 p-3 sm:p-2 md:p-5 text-center min-h-40 bg-black/70 border border-white overflow-hidden"
          >
            <h1 className="text-2xl font-bold mb-2 text-white">{t.id}</h1>
            <h3 className="text-2xl font-bold mb-2 text-teal-300">
              {t.name}
            </h3>
            <span className="text-white text-sm block mb-2">
              {t.role}
            </span>
            <p className="text-white text-sm">
              {t.message}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}