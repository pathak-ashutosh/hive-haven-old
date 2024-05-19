import { Link } from "react-router-dom";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { bestPlace } from "../assets/images";
import { motion } from "framer-motion";

// TODO:
// x Add a catchy headline
// x Add a brief description
// - Add a search bar for properties

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex flex-col xl:flex-row justify-center gap-10 min-h-screen"
    >
      <motion.div
        className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:p-8 pt-18"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut"}}
      >
        <Link to="/deals" className="border shadow-md rounded-2xl">
          <p className="px-6 py-2 text-sm font-inter text-pink">
            Our Summer Deals {"\u{1F389}"}
          </p>
        </Link>
        <h1 className="mt-5 md:mt-10 font-inter text-7xl max-md:text-[72px] max-md:leading-[82px] tracking-tight font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
            Find Your Perfect
          </span>
          <br />
          <span className="text-yellow-500 inline-block mt-3">Home</span> Away
          From Home
        </h1>
        <p className="font-inter text-slate-500 text-lg tracking-tight leading-8 my-6 sm:max-w-sm">
          Connecting International Students with{" "}
          <span className="font-semibold">Trusted Accommodations</span> Across
          the US
        </p>
        <div className="flex flex-col md:flex-row ">
          <Link to="/properties">
            <PrimaryButton label="Begin" Icon={ArrowLongRightIcon} />
          </Link>
          <Link to="/services" className="md:ml-6 max-md:mt-3">
            <SecondaryButton label="Learn More" Icon={null} />
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={bestPlace}
          alt="Hero Image"
          width={610}
          height={500}
          className="object-contain relative z-10"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
