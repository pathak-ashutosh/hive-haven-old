import { Link } from 'react-router-dom'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { PrimaryButton, SecondaryButton } from '../components/Buttons'
import { bestPlace } from '../assets/images'

// TODO:
// x Add a catchy headline
// x Add a brief description
// - Add a search bar for properties

const Hero = () => {
  return (
    <section id='home' className='w-full flex flex-col xl:flex-row justify-center gap-10 min-h-screen'>
      <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:p-8 pt-18'>
        <Link to="/deals">
          <p className='text-xl font-sans text-yellow'>Our Summer Deals {'\u{1F389}'}</p>
        </Link>
        <h1 className='mt-5 md:mt-10 font-serif text-8xl max-sm:text-[72px] max-sm:leading-[82px]'>
          <span className='xl:bg-white xl:whitespace-nowrap relative z-10 pr-10'>Find Your Perfect</span>
          <br/>
          <span className='text-yellow inline-block mt-3'>Home</span> Away From Home
        </h1>
        <p className='font-sans text-slate-gray text-lg leading-8 my-6 sm:max-w-sm'>Connecting International Students with Trusted Accommodations Across the US</p>
        <div className='flex flex-col md:flex-row '>
          <Link to="/properties">
            <PrimaryButton label="Begin" Icon={ArrowLongRightIcon}/>
          </Link>
          <Link to="/services" className='md:ml-6 max-md:mt-3'>
            <SecondaryButton label="Learn More" Icon={null}/>
          </Link>
        </div>
      </div>
      <div className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-10'>
        <img src={bestPlace} alt='Hero Image' width={610} height={500} className='object-contain relative z-10'/>
      </div>
    </section>
  )
}

export default Hero