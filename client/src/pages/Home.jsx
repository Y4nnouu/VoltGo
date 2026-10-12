
import { Herosection } from "../components/herosection.jsx";
import { Articlesection } from "../components/articlesection.jsx";
import { LogoMarquee } from "../components/logomarquee.jsx";
import { TutoSection } from "../components/tutosection.jsx";
import { Footer } from "../components/footer.jsx";

export default function Home() {
  return (
    <>
      
      <Herosection />
      <Articlesection />
      <LogoMarquee />
      <TutoSection />
      <Footer />
    </>
  );
}