import React, { useEffect, useState } from "react";
import myCV from "../../assets/images/Timilehin.pdf";
import { Reveal } from "react-awesome-reveal";
import { Fade } from "react-awesome-reveal";

import Blast from "../../components/BlastAnimation/Blast";
import Cards from "../../components/skillsCards/Cards";

import "./about.scss";
const About = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);
  });
  return (
    <>
      <Reveal>
        <div className="fake-big">About</div>
      </Reveal>
      <div className="section-about-wrapper section__padding">
        <article className="section-about-description">
          <div>
            <h2 aria-label="About and Skills">
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
                  "s",
                ]}
                indexLetter={15}
              />
            </h2>
            <Fade left>
              <p>
                My programming journey commenced in October 2021 when I delved
                into NFTs and the Metaplex Solana NFT standard. This initial
                curiosity sparked a methodical approach to learning programming,
                covering React, Next.js, JavaScript, Python, Django, HTML, CSS,
                Vanilla.js, and a touch of ethical hacking.
              </p>
            </Fade>
            <Fade bottom>
              <p>
                Recognizing the need for a focused path, I narrowed my scope to
                frontend development. Leveraging platforms like Coursera,
                GitHub, Stack Overflow, YouTube, and various coding sites, I've
                diligently gathered knowledge in web development. Continuous
                learning remains my ethos as I strive to enhance my skills in
                this dynamic field.
              </p>
            </Fade>
            <Fade left>
              <a href={myCV} download className="contact-button submit-button">
                <div>
                  <span className="bg switch__bg"></span>
                  <span className="base switch__border-color"></span>
                  <span className="text">Download CV</span>
                </div>
              </a>
            </Fade>
          </div>
        </article>
        <Cards />
      </div>
    </>
  );
};

export default About;
