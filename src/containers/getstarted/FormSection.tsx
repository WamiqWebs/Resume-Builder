import GetStartedForm from "@/src/Forms/GetStartedForm";

export default function FormSection() {
  return (
    <section className="w-screen ml-[calc(50%-50vw)] py-8 px-5 md:px-15 lg:px-18 bg-linear-to-r from-teal-500 to-teal-700">

      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="material-symbols-outlined text-white text-4xl md:text-6xl animate-bounce">
          dynamic_form
        </span>

        <h1 className="font-semibold text-2xl md:text-4xl text-white">
          Fill Form
        </h1>
      </div>

      <GetStartedForm />

    </section>
    
  );
}