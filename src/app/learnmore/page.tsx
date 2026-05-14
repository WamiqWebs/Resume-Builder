import Footer from "@/src/components/Footer";
import HeadingContent from "@/src/containers/learnmore/HeadingContent";
import KeyFeatures from "@/src/containers/learnmore/KeyFeatures";
import PerfectFor from "@/src/containers/learnmore/PerfectFor";
import WhyChooseUs from "@/src/containers/learnmore/WhyChooseContent";

export default function LearnMore() {
  return(
    <>
    <section className="px-5">
        <HeadingContent />
        <WhyChooseUs />
        <KeyFeatures />
        <PerfectFor />
    </section>
    <Footer />
    </>
  )
}