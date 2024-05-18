import Hero from "../sections/Hero";
import FeaturedProperties from "../sections/FeaturedProperties";

// Wireframe:
// -------------------------------------------------
// | Logo | Home | About | Services | Contact | Login/Signup |
// -------------------------------------------------
// | Hero Section: Headline, Description, Search Bar |
// -------------------------------------------------
// | Featured Properties (Carousel/Grid)             |
// -------------------------------------------------
// | How It Works (Steps)                            |
// -------------------------------------------------
// | Testimonials                                    |
// -------------------------------------------------
// | Footer: Links, Social Media, Contact Info       |
// -------------------------------------------------

function Home() {
  return (
    <div className="relative lg:px-24"> 
      <section className="px-3 md:px-12 xl:px-24 py-12 sm:py-24">
        <Hero />
      </section>
      <section className="pb-12 sm:pb-24">
        <FeaturedProperties />
      </section>
      <section className="pb-12 sm:pb-24">
        How It Works
      </section>
      <section className="pb-12 sm:pb-24">
        Testimonials
      </section>
    </div>
  );
}

export default Home;
