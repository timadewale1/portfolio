import React from 'react'
import './singlepost.scss'

const SinglePost = (props) => {
    const {title, brief, coverImage, url } = props
    return (
        <>
        <article className='section__article'>
            <img src={coverImage} alt=" coverImage" />
            <div className='article__styles switch__color'>
                <h2>{title}</h2>
                <p>{brief.substring(0, 150)}...</p>
                <a href={url} className="switch__color">
                    Read more
                </a>
            </div>
        </article>
        </>
    )
}

export default SinglePost