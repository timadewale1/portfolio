import React, { useState, useEffect } from 'react'
import SinglePost from '../../components/signlePost/SinglePost'
import { Fade } from 'react-awesome-reveal'
import { blogData } from '../../data/blogData'
import "./blogpage.scss"

const BlogPage = () => {
    const [blog, setBlog] = useState([])
    useEffect(() => {
        setBlog(blogData)
    },[])
    return (
    <>
    <Fade>
        <section className='section__blogpage section__padding'>
            <div className='section__blogpage-wrapper'>
                {blog.map((postItem, index) => {
                return <SinglePost key={index} {...postItem} />
                })}
            </div>
        </section>
    </Fade>
    </>
    )
}

export default BlogPage 