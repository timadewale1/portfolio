import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Blast from "../../components/BlastAnimation/Blast";
import Project from "../../components/projects/Project";
import { projects } from "./index";
import "./projectpage.scss";

const ProjectPage = () => {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  return (
    <>
      <section className="section__projects section__padding">
        <div className="fake-big">Projects</div>
        <h2 aria-label="My Projects" className="section__projects-title">
          <Blast
            letterClass={letterClass}
            arrayStr={["M", "y", " ", "P", "r", "o", "j", "e", "c", "t", "s"]}
            indexLetter={12}
          />
        </h2>
        <div className="section__projects-description">
          <Fade bottom>
            <p>
              Here's a peek at some of the projects I've done, sometimes I run
              into errors, but I was able to debug those errors with the help of
              some awesome folks from GitHub, Stack Overflow, YouTube, and other
              coding communities. The portfolio shows how much I have improved
              just by looking at the old works I've done and the latest ones.{" "}
            </p>
          </Fade>
        </div>
        <div className="section__projects-wrapper">
          {projects.map((project, index) => {
            return <Project {...project} key={index} />;
          })}
        </div>
      </section>
    </>
  );
};

export default ProjectPage;
