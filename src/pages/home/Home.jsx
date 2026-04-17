import React, {
  Suspense,
  lazy,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiPlay } from "react-icons/fi";

import { me } from "../../assets/images";
import logoMark from "../../assets/logo.svg";
import { projects } from "../project";
import "./home.scss";

const BrandSpline = lazy(() => import("../../components/BrandSpline/BrandSpline"));

const heroWords = [
  "Frontend developer",
  "Creative technologist",
  "Story-driven builder",
];

const storyMoments = [
  {
    index: "01",
    title: "Concept",
    text: "We open with a slow-burn intro, strong typography, and a living 3D backdrop that reacts to scroll instead of sitting still.",
  },
  {
    index: "02",
    title: "Progression",
    text: "As visitors move, the camera glides through the scene while the content stages your strengths, tools, and selected work with intent.",
  },
  {
    index: "03",
    title: "Conversion",
    text: "The final act shifts from showing taste to inviting action, turning the portfolio into a memorable pitch instead of a static resume.",
  },
];

const capabilities = [
  "Scroll-linked Three.js environment",
  "GSAP ScrollTrigger scene choreography",
  "Typewriter headline reveal",
  "Cinematic camera movement",
  "Spline-powered interactive vignette",
  "Responsive section transitions",
];

function useTypewriter(words, typingSpeed = 90, pause = 1400) {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeWord = words[wordIndex % words.length];
    const nextValue = isDeleting
      ? activeWord.slice(0, display.length - 1)
      : activeWord.slice(0, display.length + 1);

    const timeout = setTimeout(
      () => {
        setDisplay(nextValue);

        if (!isDeleting && nextValue === activeWord) {
          setTimeout(() => setIsDeleting(true), pause);
          return;
        }

        if (isDeleting && nextValue === "") {
          setIsDeleting(false);
          setWordIndex((current) => (current + 1) % words.length);
        }
      },
      isDeleting ? typingSpeed / 2 : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [display, isDeleting, pause, typingSpeed, wordIndex, words]);

  return display;
}

const Home = () => {
  const homeRef = useRef(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const splineSectionRef = useRef(null);
  const headline = useTypewriter(heroWords);
  const featuredProjects = useMemo(() => projects.slice(0, 4), []);
  const [canLoadSpline, setCanLoadSpline] = useState(false);

  useLayoutEffect(() => {
    if (!homeRef.current || !canvasRef.current) {
      return undefined;
    }

    let cleanup = () => {};

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, THREE] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("three"),
      ]);

      if (!homeRef.current || !canvasRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0.2, 7.5);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

      const resizeRenderer = () => {
        const width = parent?.clientWidth || window.innerWidth;
        const height = parent?.clientHeight || window.innerHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      resizeRenderer();

      scene.fog = new THREE.FogExp2("#090909", 0.08);

      const ambientLight = new THREE.AmbientLight("#ffffff", 0.9);
      const keyLight = new THREE.PointLight("#fe1616", 8, 22, 2);
      keyLight.position.set(3.5, 2.5, 5);
      const fillLight = new THREE.PointLight("#5ce0e5", 6, 24, 2);
      fillLight.position.set(-4, -1, 4);
      scene.add(ambientLight, keyLight, fillLight);

      const stage = new THREE.Group();
      scene.add(stage);

      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: "#fe1616",
        emissive: "#3f0909",
        roughness: 0.16,
        metalness: 0.72,
        transmission: 0.16,
        thickness: 0.8,
        clearcoat: 1,
      });

      const wireMaterial = new THREE.MeshStandardMaterial({
        color: "#5ce0e5",
        wireframe: true,
        emissive: "#081f20",
        roughness: 0.2,
        metalness: 0.85,
      });

      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.45, 1), glassMaterial);
      const orbit = new THREE.Mesh(new THREE.TorusKnotGeometry(1.6, 0.16, 180, 24), wireMaterial);
      orbit.rotation.set(0.8, 0.4, 0.1);
      orbit.position.set(0.25, -0.15, -0.25);

      const haloMaterial = new THREE.MeshBasicMaterial({
        color: "#f5eee8",
        transparent: true,
        opacity: 0.35,
      });
      const halo = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.04, 32, 180), haloMaterial);
      halo.rotation.x = Math.PI / 1.8;
      halo.rotation.y = Math.PI / 4;

      const logoTexture = new THREE.TextureLoader().load(logoMark);
      const logoPlate = new THREE.Mesh(
        new THREE.PlaneGeometry(2.1, 2.7),
        new THREE.MeshBasicMaterial({
          map: logoTexture,
          transparent: true,
          opacity: 0.92,
        }),
      );
      logoPlate.position.set(-0.2, 0.1, -0.55);
      logoPlate.rotation.y = -0.15;

      stage.add(core, orbit, halo, logoPlate);

      const particleCount = 760;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i += 1) {
        const radius = 7 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleField = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          color: "#5ce0e5",
          size: 0.035,
          transparent: true,
          opacity: 0.9,
        }),
      );
      scene.add(particleField);

      const lookTarget = { x: 0, y: 0, z: 0 };
      let animationFrame = null;

      const renderScene = () => {
        core.rotation.y += 0.004;
        core.rotation.x += 0.0015;
        orbit.rotation.x += 0.003;
        orbit.rotation.y -= 0.002;
        logoPlate.rotation.y += 0.001;
        particleField.rotation.y += 0.0009;
        particleField.rotation.x += 0.00025;
        halo.rotation.z += 0.002;
        camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);
        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(renderScene);
      };

      renderScene();

      const ctx = gsap.context(() => {
        const revealItems = gsap.utils.toArray(".home-reveal");
        revealItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 60 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: index * 0.05,
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
              },
            },
          );
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        })
          .to(camera.position, { x: -1.8, y: 0.8, z: 6.2, ease: "none" }, 0)
          .to(lookTarget, { x: -0.3, y: 0.2, z: 0, ease: "none" }, 0)
          .to(stage.rotation, { y: Math.PI * 0.65, x: 0.4, ease: "none" }, 0)
          .to(stage.position, { x: -0.7, y: 0.15, z: 0.2, ease: "none" }, 0)
          .to(halo.scale, { x: 1.2, y: 1.2, z: 1.2, ease: "none" }, 0)
          .to(camera.position, { x: 1.4, y: -0.35, z: 4.8, ease: "none" }, 1)
          .to(lookTarget, { x: 0.55, y: -0.1, z: 0, ease: "none" }, 1)
          .to(stage.rotation, { y: Math.PI * 1.4, x: -0.2, ease: "none" }, 1)
          .to(stage.position, { x: 0.85, y: -0.45, z: -0.3, ease: "none" }, 1)
          .to(core.scale, { x: 1.12, y: 1.12, z: 1.12, ease: "none" }, 1)
          .to(camera.position, { x: 0.2, y: 0.15, z: 3.9, ease: "none" }, 2)
          .to(lookTarget, { x: 0, y: 0, z: 0, ease: "none" }, 2)
          .to(stage.rotation, { y: Math.PI * 2, x: 0.15, ease: "none" }, 2)
          .to(stage.position, { x: 0, y: 0, z: 0.4, ease: "none" }, 2)
          .to(particleField.rotation, { y: Math.PI * 0.5, ease: "none" }, 2);
      }, homeRef);

      window.addEventListener("resize", resizeRenderer);

      cleanup = () => {
        ctx.revert();
        window.removeEventListener("resize", resizeRenderer);
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
        }
        particleGeometry.dispose();
        core.geometry.dispose();
        orbit.geometry.dispose();
        halo.geometry.dispose();
        logoPlate.geometry.dispose();
        glassMaterial.dispose();
        wireMaterial.dispose();
        haloMaterial.dispose();
        logoPlate.material.dispose();
        particleField.material.dispose();
        logoTexture.dispose();
        renderer.dispose();
      };
    })();

    return () => cleanup();
  }, []);

  useEffect(() => {
    if (!splineSectionRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanLoadSpline(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(splineSectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="portfolio-home" ref={homeRef}>
      <section className="hero-canvas" ref={heroRef}>
        <div className="hero-canvas__sticky">
          <canvas ref={canvasRef} className="hero-canvas__surface" />
          <div className="hero-canvas__glow hero-canvas__glow--left" />
          <div className="hero-canvas__glow hero-canvas__glow--right" />
        </div>

        <div className="hero-shell section__padding">
          <div className="hero-copy">
            <span className="hero-chip home-reveal">
              <img src={logoMark} alt="ADE.T logo" className="hero-chip__logo" />
              Portfolio Revamp / Node 24 / 3D Storytelling
            </span>
            <p className="hero-kicker home-reveal">TIMILEHIN ADEWALE</p>
            <h1 className="hero-title home-reveal">
              Building portfolio experiences that feel directed, tactile, and impossible to scroll past.
            </h1>
            <div className="hero-type home-reveal">
              <span className="hero-type__label">Now staging:</span>
              <span className="hero-type__word">{headline}</span>
              <span className="hero-type__cursor" />
            </div>
            <p className="hero-description home-reveal">
              This redesign turns your landing page into a cinematic product pitch with scroll-linked 3D
              motion, sharper messaging, and a better sense of craft from the first frame.
            </p>
            <div className="hero-actions home-reveal">
              <Link to="/project" className="hero-button hero-button--primary">
                Explore projects
                <FiArrowRight />
              </Link>
              <a href="mailto:timilehinadewale@gmail.com" className="hero-button hero-button--ghost">
                Start a conversation
                <FiMail />
              </a>
            </div>
            <div className="hero-metrics home-reveal">
              <div>
                <strong>3D</strong>
                <span>Three.js scene tied to scroll progress</span>
              </div>
              <div>
                <strong>GSAP</strong>
                <span>ScrollTrigger timelines, reveals, and pacing</span>
              </div>
              <div>
                <strong>Spline</strong>
                <span>Interactive vignette for extra dimensionality</span>
              </div>
            </div>
          </div>

          <div className="hero-aside home-reveal">
            <div className="hero-card hero-card--profile">
              <img src={me} alt="Timilehin Adewale portrait" className="hero-card__portrait" />
              <div>
                <p className="hero-card__eyebrow">Creative focus</p>
                <h2>Frontend systems with atmosphere</h2>
                <p>
                  I blend interface engineering with motion and storytelling so products feel intentional,
                  not just functional.
                </p>
              </div>
            </div>

            <div className="hero-card hero-card--stack">
              <div className="hero-card__brand">
                <div className="hero-card__brand-ring" />
                <img src={logoMark} alt="ADE.T logo mark" className="hero-card__brand-mark" />
              </div>
              <div className="hero-card__heading">
                <FiPlay />
                <span>Scene stack</span>
              </div>
              <ul>
                {capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="story-track section__padding">
          {storyMoments.map((moment) => (
            <article key={moment.index} className="story-card home-reveal">
              <span>{moment.index}</span>
              <h2>{moment.title}</h2>
              <p>{moment.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section section__padding home-reveal">
        <div className="section-heading">
          <p className="section-heading__label">Selected work</p>
          <h2>Proof that the visual ambition can still ship real products.</h2>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project) => (
            <article key={`${project.id}-${project.name}`} className="project-card home-reveal">
              <img src={project.imgUrl} alt={project.name} className="project-card__image" />
              <div className="project-card__content">
                <p className="project-card__stack">{project.stack}</p>
                <h3>{project.name}</h3>
                <p>{project.desc}</p>
                <div className="project-card__links">
                  <a href={project.website.url} target="_blank" rel="noreferrer">
                    Live site
                  </a>
                  {project.gitHubUrl?.url ? (
                    <a href={project.gitHubUrl.url} target="_blank" rel="noreferrer">
                      Code
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-section--spline section__padding" ref={splineSectionRef}>
        <div className="section-heading home-reveal">
          <p className="section-heading__label">Interactive lab</p>
          <h2>Spline adds a second layer of depth without replacing the custom Three.js scene.</h2>
        </div>

        <div className="spline-layout">
          <div className="spline-copy home-reveal">
            <p>
              The homepage now uses two kinds of dimensional storytelling: a handcrafted Three.js scene for
              scroll choreography, and a dedicated Spline embed for an interactive product vignette that can
              be swapped for your own branded asset later.
            </p>
            <div className="spline-copy__actions">
              <a href="https://github.com/timadewale1" target="_blank" rel="noreferrer">
                <FiGithub />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/timilehin-adewale-7911b8189" target="_blank" rel="noreferrer">
                <FiLinkedin />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="spline-frame home-reveal">
            <div className="spline-frame__brand-badge">
              <div className="spline-frame__brand-ring" />
              <img src={logoMark} alt="ADE.T logo" className="spline-frame__logo" />
            </div>
            <Suspense fallback={<div className="spline-loading">Loading branded 3D vignette...</div>}>
              {canLoadSpline ? <BrandSpline /> : <div className="spline-loading">Branded Spline scene primed on approach.</div>}
            </Suspense>
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-section--cta section__padding home-reveal">
        <div className="cta-block">
          <p className="section-heading__label">Next move</p>
          <h2>The foundation is ready for a full portfolio overhaul across the remaining routes.</h2>
          <p>
            We now have the runtime update and a high-impact homepage direction in place. From here we can
            carry the same visual language into About, Projects, and Contact so the whole site feels unified.
          </p>
          <div className="cta-links">
            <Link to="/about">About page</Link>
            <Link to="/contact">Contact page</Link>
            <Link to="/project">Projects archive</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
