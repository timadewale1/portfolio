import React, { useEffect, useState } from "react";
import myCV from "../../assets/images/Adewale.pdf";
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
                Passionate frontend web developer with over 2 years of
                experience, specializing in React, JavaScript, TypeScript, HTML,
                and CSS. Proficient in leveraging Firebase and other
                cutting-edge web technologies to create seamless user
                experiences. Constantly exploring new avenues in web development
                to craft innovative solutions and enhance user engagement.
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
