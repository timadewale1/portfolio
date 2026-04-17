import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import './utils/templateColors.scss';

import { Sidebar, ThemeTemplates } from './components';
const Home = lazy(() => import('./pages/home/Home'));
const About = lazy(() => import('./pages/about/About'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const Gaming = lazy(() => import('./pages/gaming/Gaming'));
const BlogPage = lazy(() => import('./pages/blogPage/BlogPage'));
const ErrorPage = lazy(() => import('./pages/errorPage/ErrorPage'));
const ProjectPage = lazy(() => import('./pages/project/ProjectPage'));
const Tutorial = lazy(() => import('./pages/tutorial/Tutorial'));

const App = () => {
  return (
      <BrowserRouter>
        <Sidebar />
        <ThemeTemplates />
        <Suspense fallback={<div className="route-loader">Loading experience...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
    </BrowserRouter>
  );
};

export default App;
