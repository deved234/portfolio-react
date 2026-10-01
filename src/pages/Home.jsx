import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Work from "../components/Work";
import Toolkit from "../components/Toolkit";
import Magnetic from "../components/motion/Magnetic";
export default function Home({ ready }) {
  return (
    <>
      <Hero ready={ready} />
      <section className="home-intro section-shell" aria-label="Introduction">
        <h2 data-reveal>
          Building thoughtful
          <br />
          interfaces for the
          <br />
          modern web.
        </h2>
        <div>
          <p data-reveal>
            I’m David Atef, a frontend developer based in Assiut, Egypt, working
            with React and Next.js. Currently a Frontend Developer Trainee at
            Reservya, bringing interfaces to life with care for the details.
          </p>
          <p className="availability">
            <i />
            Open to opportunities · Remote & on-site
          </p>
          <Magnetic>
            <Link to="/about" className="circle-button">
              About me
            </Link>
          </Magnetic>
        </div>
      </section>
      <Toolkit />
      <Work />
    </>
  );
}
