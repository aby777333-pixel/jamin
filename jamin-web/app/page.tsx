import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyLand from "./components/WhyLand";
import FeaturedProperties from "./components/FeaturedProperties";
import IndiaMap from "./components/IndiaMap";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import ClientEnquiryForm from "./components/ClientEnquiryForm";
import BrokerEnquiryForm from "./components/BrokerEnquiryForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingElements from "./components/FloatingElements";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyLand />
      <FeaturedProperties />
      <IndiaMap />
      <Testimonials />
      <Blog />
      <ClientEnquiryForm />
      <BrokerEnquiryForm />
      <Contact />
      <Footer />
      <FloatingElements />
    </main>
  );
}
