import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.scss'

// import Home from './pages/home/Home'
// import About from './pages/about/About'

// import Sidebar from './components/sidebar/Sidebar'
// import ThemeTemplates from './components/ThemingTemplate/ThemeTemplates'

import { Sidebar, ThemeTemplates } from './components'
import './utils/templateColors.scss'

import { 
        Home, 
        About, 
        Contact, 
        Gaming, 
        BlogPage, 
        ErrorPage, 
        ProjectPage, 
        Tutorial 
        } from './pages'


const App = () => {
    return (
    <BrowserRouter>
    <Sidebar />
    <ThemeTemplates />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/blog" element={<BlogPage/>} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter> 
 ) 
}
 
export default App
