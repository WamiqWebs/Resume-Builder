import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Faqs from "../components/Faqs";
import ContactUs from "../components/ContactUs";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <> 
    <Toaster />
     <Hero />
     <Features />
     <HowItWorks />
     <Testimonials />
     <Faqs />
     <ContactUs /> 
     <Footer />
    </>
  );
}
