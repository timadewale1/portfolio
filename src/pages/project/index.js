/* eslint-disable */
import { GrGithub } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";

// images from the asset folder in the image file
import {
  main,
  gericht,
  huddle,
  restCOuntry,
  trade,
  resturant,
  pharmacy,
  ecommerce,
  area,
  gemini,
} from "../../assets/images";

// projects' id, name, stacks, icon and url data
export const projects = [
  {
    id: 1,
    name: "Trade Activity",
    desc: "A landing page for a business website",
    stack: "HTML CSS JAVASCRIPT",
    gitHubUrl: {
      icon: <GrGithub />,
      url: "https://github.com/timadewale1/tradeactivity",
    },
    website: {
      icon: <TbWorld />,
      url: "https://tradeactivity.vercel.app/",
    },
    imgUrl: trade,
  },
  {
    id: 2,
    name: "Restaurant",
    desc: "A Responsive restaurant website design.",
    stack: "HTML CSS JAVASCRIPT",
    gitHubUrl: {
      icon: <GrGithub />,
      url: "https://github.com/timadewale1/restaurant",
    },
    website: {
      icon: <TbWorld />,
      url: "https://timadewale1.github.io/restaurant/",
    },
    imgUrl: resturant,
  },
  {
    id: 3,
    name: "first portfolio",
    desc:
      "This is my first official portfolio. A copy of Jacek Jeznach portfolio",
    stack: "HTML CSS JAVASCRIPT",
    imgUrl: main,

    gitHubUrl: {
      icon: <GrGithub />,
      url: "https://github.com/timadewale1/official-portfolio",
    },
    website: {
      icon: <TbWorld />,
      url: "https://adet-portfolio.vercel.app/",
    },
  },
  {
    id: 4,
    name: "Pharmacy landing page",
    desc: "A Static Pharmacy landing Page",
    stack: "HTML CSS",
    gitHubUrl: {
      icon: <GrGithub />,
      url:
        "https://github.com/timadewale1/official-portfolio/tree/main/Create_jack-Portfolio/pharmacy",
    },
    website: {
      icon: <TbWorld />,
      url: "https://adet-portfolio.vercel.app/pharmacy/pharmacy.html",
    },
    imgUrl: pharmacy,
  },

  {
    id: 5,
    name: "Area Calculator App",
    desc:
      "An app to calculate Area of different shapes with different units of measurement.",
    stack: "next JS",
    gitHubUrl: {
      icon: <GrGithub />,
      url: "https://github.com/timadewale1/Area-Calculator",
    },
    website: {
      icon: <TbWorld />,
      url: "https://timadewale1.github.io/Area-Calculator/",
    },
    imgUrl: area,
  },
  {
    id: 6,
    name: "ecommerce app",
    desc: "A fully functional ecommerce app",
    stack: "React js, firebase",
    gitHubUrl: {
      icon: <GrGithub />,
      url: "https://github.com/timadewale1/ecommerce",
    },
    website: {
      icon: <TbWorld />,
      url: "https://adetmart.vercel.app/",
    },
    imgUrl: ecommerce,
  },
  {
    id: 4,
    name: "Gemini AI clone",
    desc: "A fully functional clone of the google gemini AI",
    stack: "React JS",
    gitHubUrl: {
      icon: <GrGithub />,
      url: "https://github.com/timadewale1/project-gemini",
    },
    website: {
      icon: <TbWorld />,
      url: "https://adetgemini.vercel.app/",
    },
    imgUrl: gemini,
  },
  {
    id: 2,
    name: "Restaurant Website",
    desc: "A Responsive restaurant website design with great UI Effect",
    stack: "React JS",
    gitHubUrl: {
      icon: <GrGithub />,
      url: [],
    },
    website: {
      icon: <TbWorld />,
      url: "https://gericht-restaurant-website.netlify.app/",
    },
    imgUrl: gericht,
  },
];
