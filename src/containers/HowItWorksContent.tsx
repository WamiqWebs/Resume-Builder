import HowItWorks from "../components/HowItWorks";

interface HowItWorks{
    number: number;
    title: string;
    description: string;
}
const steps: HowItWorks[] = [
{
   number: 1,
   title: "Enter Your Details",
   description: "Add your education, skills, and experience easily in structured form.",
},
{
   number: 2,
   title: "Choose a Template",
   description: "Select a professional ATS-friendly design that fits your industry.",
},
{
    number: 3,
    title: "Download & Apply",
    description: "Export your resume in PDF format and start applying instantly.",
},
]
export default function HowItWorksContent(){
    return(
        <>

        <section className="px-5 md:px-15 py-8 w-screen ml-[calc(50%-50vw)]">

        <h1 className="mb-5 font-bold text-2xl md:text-3xl lg:text-4xl text-center">
            How It Works
        </h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {steps.map((step,idx) =>(
        <div 
        key={idx}
        className="py-5 px-3 flex flex-col bg-gray-300 rounded text-center"
        >   
        <div className="text-teal-400 text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {step.number.toString().padStart(2, "0")}
        </div>
            <h1 className="font-semibold mb-3 text-md md:text-lg">{step.title}</h1>
            <p className="text-gray-600 text-sm lg:text-md">{step.description}</p>
        </div>
        ))}
       </div>
        </section>

        </>
    )
}