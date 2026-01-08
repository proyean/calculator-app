import React from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Project from './components/Project'
import Testimonails from './components/Testimonails'
import Contact from './components/Contact'
import Footers from './components/Footers'


const App = () => {
  return (
    <div className='w-full overflow-hidden' >
      <Navbar />
      <About />
      <Project/>
      <Testimonails/>
      <Contact/>
      <Footers/>
    </div>
  )
}

export default App
