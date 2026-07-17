import Hero from '../components/sections/Hero.jsx'
import WhoWeAre from '../components/sections/WhoWeAre.jsx'
import Products from '../components/sections/Products.jsx'
import Teaching from '../components/sections/Teaching.jsx'
import Process from '../components/sections/Process.jsx'
import Lecturers from '../components/sections/Lecturers.jsx'
import OpenCourses from '../components/sections/OpenCourses.jsx'
import Cases from '../components/sections/Cases.jsx'
import Partners from '../components/sections/Partners.jsx'
import OtherProducts from '../components/sections/OtherProducts.jsx'
import CTA from '../components/sections/CTA.jsx'

function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Products />
      <Teaching />
      <Lecturers />
      <OpenCourses />
      <Cases />
      <Process />
      <Partners />
      <OtherProducts />
      <CTA />
    </>
  )
}

export default HomePage
