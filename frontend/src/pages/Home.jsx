import Hero from "../components/home/Header";
import Testimonial from "../components/home/Testimonials";
import Brand from "../components/home/Brands";
import Service from "../components/home/Features";
import Pricing from "../components/home/Pricing";
import Cta from "../components/home/CTA";
import AboutUs from "../components/home/AboutUs";
export default function Home() {
  return (
    <>
      <header className="relative">
        <Hero />
      </header>
      <main className="px-6">
        <Service />
        <Cta />
        <Testimonial />
        <Brand />
        <AboutUs />
        <Pricing />
      </main>
    </>
  );
}
