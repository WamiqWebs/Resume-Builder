import ContactUsForm from "../Forms/ContactUsForm";

export default function ContactUsContent() {
    return (
        <>
            <section className="w-screen ml-[calc(50%-50vw)] bg-[#111827] py-8 px-5 flex flex-col items-center justify-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white text-center">Contact Us</h1>
                <p className="text-white text-sm text-center mt-3 px-3">We would love to hear from you. Please fill out the form below and we will get back to you as soon as possible.</p>
                <ContactUsForm />
            </section>
        </>
    )
} 