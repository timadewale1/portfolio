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
    name: "Hotel Booking Project",
    desc: "A complicated project that enhanced my skills a lot",
    stack: "React JS",

    website: {
      icon: <TbWorld />,
      url: "https://react-booking-project.netlify.app/",
    },
    imgUrl:
      "https://cdn.dribbble.com/userupload/2512424/file/original-03f9f265f9a4adbd54644841930518a1.png?compress=1&resize=320x240&vertical=top",
  },
  {
    id: 2,
    name: "Restaurant Website",
    desc: "A Responsive restaurant website design with great UI Effect",
    stack: "React JS",

    website: {
      icon: <TbWorld />,
      url: "https://gericht-restaurant-website.netlify.app/",
    },
    imgUrl: gericht,
  },
];
