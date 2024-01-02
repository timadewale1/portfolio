/* eslint-disable */
import React from "react";

// react-icons
import { FiGrid, FiLinkedin, FiYoutube, FiFigma } from "react-icons/fi";
import { ImBlogger } from "react-icons/im";
import { VscProject } from "react-icons/vsc";
import {
  BsBootstrapFill,
  BsPersonLinesFill,
  BsGithub,
  BsGoogle,
} from "react-icons/bs";

import { RiContactsLine, RiReactjsLine } from "react-icons/ri";
import {
  SiFuturelearn,
  SiSass,
  SiJquery,
  SiExpress,
  SiRedux,
  SiNextdotjs,
  SiWordpress,
} from "react-icons/si";

import { GrGithub, GrTwitter, GrInstagram } from "react-icons/gr";
import { AiFillHtml5 } from "react-icons/ai";
import { DiCss3, DiMongodb } from "react-icons/di";
import { IoLogoJavascript, IoLogoGameControllerB } from "react-icons/io";
import { FaNodeJs, FaGit, FaPython } from "react-icons/fa";

// sidebar menu functionality
const sideBarMenu = [
  {
    text: "Home",
    icon: <FiGrid className="link-icon" />,
    url: "/",
  },
  {
    text: "About",
    icon: <BsPersonLinesFill className="link-icon" />,
    url: "/about",
  },
  {
    text: "Projects",
    icon: <VscProject className="link-icon" />,
    url: "/project",
  },
  // {
  //   text: 'Blog',
  //   icon: (
  //     <ImBlogger
  //       className="link-icon"
  //       style={{ fill: 'current', stroke: 'current' }}
  //     />
  //   ),
  //   url: '/blog',
  // },
  {
    text: "Contact",
    icon: <RiContactsLine className="link-icon" />,
    url: "/contact",
  },

  // {
  //   text: 'Tutorials',
  //   icon: <SiFuturelearn className="link-icon" />,
  //   url: '/tutorial',
  // },
  // {
  //   text: 'Gaming',
  //   icon: <IoLogoGameControllerB className="link-icon" />,
  //   url: '/gaming',
  // },
];
// social media icons
const socialIcons = [
  {
    icon: <GrGithub className="icon switch__color" />,
    url: "https://github.com/timadewale1 ",
  },
  {
    icon: <FiLinkedin className="icon switch__color" />,
    url: "https://www.linkedin.com/in/timilehin-adewale-7911b8189",
  },
];
// skills card
const skillSet = [
  {
    icon: <AiFillHtml5 className="skills-icon switch__color" />,
    spanText: "HTML",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    icon: <DiCss3 className="skills-icon switch__color" />,
    spanText: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    icon: <IoLogoJavascript className="skills-icon switch__color" />,
    spanText: "JAVASCRIPT",
    url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript",
  },
  {
    icon: <SiSass className="skills-icon switch__color" />,
    spanText: "SASS",
    url: "",
  },

  {
    icon: <BsBootstrapFill className="skills-icon switch__color" />,
    spanText: "BOOTSTRAP",
    url: "",
  },

  {
    icon: <FaGit className="skills-icon switch__color" />,
    spanText: "GIT",
    url:
      "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub",
  },
  {
    icon: <BsGithub className="skills-icon switch__color" />,
    spanText: "GITHUB",
    url:
      "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub",
  },
  {
    icon: <RiReactjsLine className="skills-icon switch__color" />,
    spanText: "REACT JS",
    url:
      "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started",
  },

  {
    icon: <FaNodeJs className="skills-icon switch__color" />,
    spanText: "NODE",
    url:
      "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs",
  },

  {
    icon: <SiNextdotjs className="skills-icon switch__color" />,
    spanText: "NEXT JS",
    url: "https://nextjs.org/docs",
  },
  {
    icon: <SiWordpress className="skills-icon switch__color" />,
    spanText: "WORDPRESS",
    url: "https://wordpress.org/",
  },
  {
    icon: <FiFigma className="skills-icon switch__color" />,
    spanText: "Figma",
    url: "https://figma.com",
  },
];

export { sideBarMenu, socialIcons, skillSet };
