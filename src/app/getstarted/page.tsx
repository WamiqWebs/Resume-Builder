import Footer from "@/src/components/Footer";
import FormSection from "@/src/containers/getstarted/FormSection";
import GetStartedContent from "@/src/containers/getstarted/GetsStartedContent";
import Info from "@/src/containers/getstarted/Info";

export default function Get_Started(){
return(
    <>
    <section className="px-5">
     <GetStartedContent />
     <FormSection />
     <Info />
     </section>
     <Footer />
    </>
)
}