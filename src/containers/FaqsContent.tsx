// "use client";
// import { useState } from "react";

// /* ---------- Types ---------- */
// interface FAQItem {
//   id: number;
//   question: string;
//   answer: string;
// }

// /* ---------- Page Component ---------- */
// export default function FaqsContent() {
  
//   /* ---------- Data (Same Page) ---------- */
//   const faqs: FAQItem[] = [
//     {
//       id: 1,
//       question: "Can I edit my resume later?",
//       answer: "Yes, you can update and download your resume anytime."
//     },
//     {
//       id: 2,
//       question: "Are the templates ATS-friendly?",
//       answer: "All templates are fully optimized for ATS systems."
//     },
//     {
//       id: 3,
//       question: "Is this platform free?",
//       answer: "Basic features are free. Premium templates may require payment."
//     }
//   ];

//   /* ---------- State ---------- */
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   /* ---------- UI ---------- */
//   return (
//     <section className="py-20 bg-gray-100">
      
//       <h2 className="text-3xl font-bold text-center mb-12">
//         Frequently Asked Questions
//       </h2>

//       <div className="max-w-3xl mx-auto space-y-4">

//         {faqs.map((item, index) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-xl shadow-md p-5 transition-all duration-300"
//           >
//             <button
//               onClick={() =>
//                 setOpenIndex(openIndex === index ? null : index)
//               }
//               className="w-full flex justify-between items-center font-semibold text-left"
//             >
//               {item.question}
//               <span className="text-xl">
//                 {openIndex === index ? "−" : "+"}
//               </span>
//             </button>

//             {openIndex === index && (
//               <p className="mt-3 text-gray-600 leading-relaxed">
//                 {item.answer}
//               </p>
//             )}
//           </div>
//         ))}

//       </div>
//     </section>
//   );
// }
"use client"
import { useState } from "react";

interface FAQItem {
    id:number;
    question: string;
    answer: string;
}
const faqs: FAQItem[] = [

    {
      id: 1,
      question: "Can I edit my resume later?",
      answer: "Yes, you can update and download your resume anytime."
    },
      {
      id: 2,
      question: "Are the templates ATS-friendly?",
      answer: "All templates are fully optimized for ATS systems."
    },
    {
      id: 3,
      question: "Is this platform free?",
      answer: "Basic features are free. Premium templates may require payment."
    }

]

export default function FaqsContent(){
    const [openIndex,setOpenIndex] = useState<number | null>(null)
    return(
        <>
         <section className="bg-gray-300 py-15 w-screen ml-[calc(50%-50vw)]">
            <h1 className="text-center px-2 font-light lg:px-5 lg:font-bold mb-5 text-2xl md:text-3xl lg:text-4xl">Frequently Ask Questions</h1>
            <div className="p-2 md:p-10 mx-5 lg:mx-30 flex flex-col gap-3">
          {faqs.map((items,index) => (
          <div
          key={index}
          className="p-2 md:p-5 bg-white rounded-xl shadow-md transition-all duration-300">
         <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full flex justify-between gap-2 items-center font-semibold text-left"
            >   
         <span className="text-sm md:text-xl">{items.question}</span>
        <span
       className="text-sm md:text-xl"
       > {openIndex === index ? "-" : "+"} </span>
       </button>
       {openIndex === index && (
          <p className="mt-2 text-sm text-gray-600">{items.answer}</p>
        )
       }
          </div>
        ))}
            </div>
         </section>
        </>
    )
}