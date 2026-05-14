import Footer from "@/src/components/Footer";
import { MissionVision } from "@/src/containers/aboutus/MissionVision";
import { Personal } from "@/src/containers/aboutus/Personal";
import { Story } from "@/src/containers/aboutus/Story";
import Why from "@/src/containers/aboutus/Why";

export default function  AboutUs() {
  return(
    <>
     <section className="px-5"> 
        <Why />
        <Story />
        <MissionVision />
        <Personal />
     </section>
      <Footer />
    </>
  )
}