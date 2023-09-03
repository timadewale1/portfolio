import React, { useState, useEffect } from 'react'
import Reveal from 'react-reveal/Reveal'
import Fade from 'react-reveal/Fade'

import { blogData } from '../../data/blogData'

import './blogs.scss'

const Blogs = () => {
    const [blog, setBlog] = useState([])

    useEffect(() => {
        setBlog(blogData)
    }, [])


    return (
        <section className='section-blog blog-home-section section__padding'>
            <div className='blog-header'>
                <p className='blog-header'>Latest News</p>
                <h2>My Latest Articles</h2>
                <p className='blog__description'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis numquam similique culpa maiores laudantium, laborum ad tenetur quidem eligendi! Neque ullam cupiditate illo. Maiores cum numquam quia pariatur et saepe.
                </p>
                <span></span>
            </div> 

            <Reveal left>
                <div className='fake-big'>Blog</div>
            </Reveal>
            <div className='blog-wrapper blog-home-wrapper'>
               {blog.map((blogpost) => {
                   const { _id, title, brief, url} = blogpost
                   return (
                    <Fade bottom key={_id}>
                        <article className='article-section-home'>
                            <div className='article-description'>
                                <a href={url}>
                                    <h2>{title}</h2>
                                    </a> 
                                    <p>{brief.substring(0, 150)}...</p>
                                    <a href={url} className="switch__color">
                                        Read more
                                    </a>
                            </div>
                        </article>
                    </Fade> 
                   ) 
               })} 
            </div> 
        </section>
    )
    
}

export default Blogs