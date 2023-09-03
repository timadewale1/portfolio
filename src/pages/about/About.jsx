import React, { useEffect, useState} from 'react'
import myCV from '../../assets/images/Timilehin.pdf'
import Reveal from "react-reveal/Reveal"
import Fade from 'react-reveal/Fade'
 
import Blast from '../../components/BlastAnimation/Blast'
import Cards from '../../components/skillsCards/Cards'

import "./about.scss"
const About = () => {
    const  [letterClass, setLetterClass] = useState("text-animate")
    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    })
    return (
    <>
        <Reveal>
            <div className='fake-big'>About</div>
        </Reveal>
        <div className='section-about-wrapper section__padding'>
            <article className='section-about-description'>
                <div>
                    <h2 aria-label='About and Skills'>
                            <Blast
                                letterClass={letterClass}
                                arrayStr={[
                                    "A", 
                                    "b", 
                                    "o", 
                                    "u", 
                                    "t", 
                                    " ", 
                                    "&", 
                                    " ",
                                    "S", 
                                    "k", 
                                    "i", 
                                    "l", 
                                    "l", 
                                    "s" ,
                                ]}
                                indexLetter={15}
                            />
                    </h2>
                    <Fade left>
                            <p>My journey as a programmer started in october 2021, when I was introduced to NFTs and Metaplex solana NFT standard
                                that was when I got curious and started learning some programming code, figment by figment.
                            </p>
                    </Fade>
                     <Fade bottom>
                            <p>
                    
                                I didn't pick a particular programming language to learn, I was just doing it as it comes.
                                I have brushed react, next.js, javascript, python, django, html, css, vanilla.js and even a little bit of ethical hacking
                                I discovered I wasn't really learning anything if I don't have a particular field I'm interested in.
                            </p>
                    </Fade>
                    <Fade bottom>
                            <p>
                                For this reason, I choose frontend development, I went on to Coursera, github, stackoverflow, youtube and other coding sites I could find to
                                gather knowledge on web development and so far I have learnt a lot(I'm still learning, one can't stop learning).

                            </p>
                    </Fade>
                    <Fade left>
                            <a href={myCV} download className='contact-button submit-button'>
                        <div>
                                <span className='bg switch__bg'></span>
                                <span className='base switch__border-color'></span>
                                <span className='text'>Download CV</span>
                        </div>
                            </a>
                    </Fade>
                </div>
            </article> 
            <Cards />
        </div>
    </>
    )
}

export default About