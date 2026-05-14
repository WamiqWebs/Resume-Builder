import Link from "next/link";
export default function FooterContent() {
    return (
        <>
            <section className="w-screen ml-[calc(50%-50vw)] px-5 md:px-15 py-8 bg-[#111827] ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-xl text-white font-bold mb-4">ResumeBuilder</h1>
                        <p className=" text-gray-400 text-sm md:text-base mb-4">Build professional resumes fast and easy, get noticed by recruiters.</p>
                         <h1 className="text-2xl md:text-xl text-white font-bold mb-4">Contact</h1>
                         <p className="text-gray-400 text-sm md:text-base mb-4">
                           Have questions or feedback? Reach out and we'll be happy to help you.
                        </p>
                    </div>
                    <div className="md:pl-8 lg:pl-2 mb-3">
                        <h2 className="text-2xl md:text-xl text-white font-bold mb-4">Quick Links</h2>
                        <ul className="mb-2 text-gray-400 text-sm md:text-base flex flex-col gap-2">
                            <Link href={"./"} className="hover:text-white w-fit">Home</Link>
                            <Link href={"/getstarted"} className="hover:text-white w-fit">Form</Link>
                            <Link href={"/pricing"} className="hover:text-white w-fit">Pricing</Link>
                            <Link href={"/aboutus"} className="hover:text-white w-fit">About</Link>
                        </ul>
                    </div>
                    
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm border-t text-gray-400 pt-2">
                    <div className="">
                        <p className="text-gray-400">© 2026 ResumeBuilder. All rights reserved.</p>
                    </div>
                    <div className="flex gap-3 md:justify-end">
                        <Link href={"#"} className="hover:text-white w-fit">Terms</Link>
                        /
                        <Link href={"#"} className="hover:text-white w-fit">Privacy Policy</Link>
                    </div>
                </section>
            </section>
        </>
    )
}