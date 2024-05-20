import { Link } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex flex-col xl:flex-row justify-center gap-10 min-h-screen"
    >
      <div className="relative xl:w-2/5 flex flex-col justify-center items-center w-full max-xl:p-8 pt-18 text-center">

        {/* Deals floating card */}
        <motion.div
          className="mt-20 md:mt-16 border shadow-md rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate" }}
        >
          <Link to="/deals">
            <p className="px-6 py-2 text-sm font-inter text-pink">
              Our Summer Deals {"\u{1F389}"}
            </p>
          </Link>
        </motion.div>

        {/* Hero content */}
        <motion.h1
          className="mt-5 md:mt-10 font-inter text-7xl max-lg:text-[72px] max-lg:leading-[82px] tracking-tight font-bold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.2 }}
        >
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10">
            Find Your Perfect
          </span>
          <br />
          <span className="text-yellow-500 inline-block mt-3">Home</span> Away
          From Home
        </motion.h1>
        <motion.p
          className="font-inter text-slate-500 text-lg tracking-tight leading-8 my-6 sm:max-w-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.4 }}
        >
          Connecting International Students with{" "}
          <span className="font-semibold">Trusted Accommodations</span> Across
          the US
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col md:flex-row items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.6 }}
        >
          <Link to="/properties">
            <PrimaryButton
              label="Start Your Search"
              Icon={FaCircleArrowRight}
            />
          </Link>
          <Link to="/services" className="md:ml-6 max-md:mt-3">
            <SecondaryButton label="Learn More" Icon={IoBookOutline} />
          </Link>
        </motion.div>
      </div>
      {/* <motion.div
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
      </motion.div> */}
    </section>
  );
};

export default Hero;
