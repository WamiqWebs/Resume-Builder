// export default function PerfectFor() {
//   const options = [
//     "Students",
//     "Graduates",
//     "Professionals",
//     "Freelancers",
//   ];

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="grid grid-cols-2 gap-6">
//         {options.map((item) => (
//           <div
//             key={item}
//             className="cursor-pointer rounded-2xl bg-white px-8 py-6 text-center font-semibold text-gray-700 shadow-md transition hover:shadow-xl hover:-translate-y-1"
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function PerfectFor(){
  const options = [
    "Students",
    "Graduates",
    "Professionales",
    "Freelancers",
  ]
  return(
    <>
     <section className="w-screen ml-[calc(50%-50vw)] bg-gray-600 px-5 md:px-15 gap-4 md:gap-8 py-15 ">
      <h1 className="text-teal-400  font-semibold font-serif text-2xl md:text-4xl md:font-bold mt-2 mb-6">Perfect For</h1>
      <div className="grid grid-cols-2 gap-4 px-5 md:px-15 mt-10">
     {options.map((item)=>(
      <div 
      key={item}
      className="cursor-pointer bg-lime-400 transition shadow-md hover:-translate-y-1 text-center font-semibold text-gray-700 hover:shadow-2xl rounded-2xl p-2 md:p-4">
        {item}
      </div>
     ))}
     </div>
     </section>
    </>
  )
}