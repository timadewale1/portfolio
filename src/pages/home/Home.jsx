import React from 'react'
import Header from '../../components/header/Header'

import About  from '../about/About'
import ProjectPage from '../project/ProjectPage'
// import Blog from '../../components/blogCompo/Blogs'
import Contact from '../contact/Contact'
const Home = () => {
    return (
        <>
         <Header />
         <section className='section-about'>
            <About />
         </section>
         <ProjectPage  />
            {/* <Blog /> */}
         <Contact />
        </>
    )
}

export default Home