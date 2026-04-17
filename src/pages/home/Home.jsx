import React, { Suspense, lazy, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiNavigation,
  FiPlay,
  FiZap,
} from "react-icons/fi";

import { me } from "../../assets/images";
import logoMark from "../../assets/logo.svg";
import { projects } from "../project";
import "./home.scss";

const BrandSpline = lazy(() => import("../../components/BrandSpline/BrandSpline"));

const heroSentence = "We design portfolio experiences that move through the story, not just sit on the screen.";

const storyMoments = [
  {
    index: "01",
    title: "Sunrise Setup",
    text: "A warm horizon, branded convoy forms, and a sticky hero establish the cinematic tone before the page even begins to explain itself.",
  },
  {
    index: "02",
    title: "Blueprint Merge",
    text: "Wireframe trucks and structures phase into solid surfaces as the scroll advances, making the build feel engineered in real time.",
  },
  {
    index: "03",
    title: "Arrival",
    text: "The camera glides through the yard, text reveals with intent, and the rest of the portfolio lands like the next act of the same film.",
  },
];

const capabilities = [
  "Scroll-synced convoy scene in Three.js",
  "Wireframe-to-solid material progression",
  "Cinematic camera moves with GSAP ScrollTrigger",
  "Typed copy reveal driven by scroll position",
  "Spline support for interactive 3D set pieces",
  "Branded sunset palette around your ADE.T mark",
];

const routeStates = ["Dawn Run", "Merge Phase", "Convoy Pass", "Arrival Frame"];

const Home = () => {
  const homeRef = useRef(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const splineSectionRef = useRef(null);
  const featuredProjects = useMemo(() => projects.slice(0, 4), []);
  const [canLoadSpline, setCanLoadSpline] = useState(false);
  const [typedMessage, setTypedMessage] = useState(heroSentence.slice(0, 1));
  const [routeState, setRouteState] = useState(routeStates[0]);

  useLayoutEffect(() => {
    if (!homeRef.current || !canvasRef.current) {
      return undefined;
    }

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, THREE] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("three"),
      ]);

      if (cancelled || !homeRef.current || !canvasRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2("#170d0a", 0.045);

      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 150);
      camera.position.set(-9.5, 2.4, 16.5);

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

      const ambientLight = new THREE.AmbientLight("#ffe6cf", 1.15);
      const sunLight = new THREE.DirectionalLight("#ffb066", 3.6);
      sunLight.position.set(12, 9, 6);
      const rimLight = new THREE.PointLight("#5ce0e5", 5.5, 40, 2);
      rimLight.position.set(-10, 2, -5);
      const accentLight = new THREE.PointLight("#fe1616", 4.2, 35, 2);
      accentLight.position.set(8, 2, 12);
      scene.add(ambientLight, sunLight, rimLight, accentLight);

      const world = new THREE.Group();
      scene.add(world);

      const logoTexture = new THREE.TextureLoader().load(logoMark);
      logoTexture.colorSpace = THREE.SRGBColorSpace;

      const horizon = new THREE.Mesh(
        new THREE.PlaneGeometry(90, 34),
        new THREE.MeshBasicMaterial({
          color: "#f8c28f",
          transparent: true,
          opacity: 0.75,
        }),
      );
      horizon.position.set(0, 9, -30);
      world.add(horizon);

      const sun = new THREE.Mesh(
        new THREE.SphereGeometry(3.2, 32, 32),
        new THREE.MeshBasicMaterial({
          color: "#ffcb96",
          transparent: true,
          opacity: 0.88,
        }),
      );
      sun.position.set(18, 7.5, -25);
      world.add(sun);

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(90, 52),
        new THREE.MeshStandardMaterial({
          color: "#20120d",
          roughness: 0.97,
          metalness: 0.04,
        }),
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1.7;
      world.add(ground);

      const reflectiveStrip = new THREE.Mesh(
        new THREE.PlaneGeometry(90, 9),
        new THREE.MeshStandardMaterial({
          color: "#7f3d1f",
          emissive: "#65240e",
          roughness: 0.14,
          metalness: 0.08,
          transparent: true,
          opacity: 0.72,
        }),
      );
      reflectiveStrip.rotation.x = -Math.PI / 2;
      reflectiveStrip.position.set(0, -1.66, 5.5);
      world.add(reflectiveStrip);

      const laneMaterial = new THREE.MeshBasicMaterial({
        color: "#e8c4a0",
        transparent: true,
        opacity: 0.32,
      });
      for (let i = -2; i <= 2; i += 1) {
        const lane = new THREE.Mesh(new THREE.BoxGeometry(70, 0.03, 0.18), laneMaterial.clone());
        lane.position.set(0, -1.63, i * 4.3 + 6);
        world.add(lane);
      }

      const containerPalette = ["#34211a", "#442a1f", "#6c3924", "#2a1c18"];
            const containers = new THREE.Group();
      for (let row = 0; row < 2; row += 1) {
        for (let i = 0; i < 6; i += 1) {
          const material = new THREE.MeshStandardMaterial({
            color: containerPalette[(i + row) % containerPalette.length],
            roughness: 0.55,
            metalness: 0.15,
            transparent: true,
            opacity: 0.96,
          });          const box = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2 + row * 0.35, 1.65), material);
          box.position.set(8 + i * 3.5, -0.75 + row * 1.9, -8.5 + row * 2.4);
          containers.add(box);
        }
      }
      world.add(containers);

      const logoBillboard = new THREE.Mesh(
        new THREE.PlaneGeometry(3.1, 4),
        new THREE.MeshBasicMaterial({
          map: logoTexture,
          transparent: true,
          opacity: 0.8,
        }),
      );
      logoBillboard.position.set(12.5, 3.2, -10.5);
      logoBillboard.rotation.y = -0.7;
      world.add(logoBillboard);

      const truckMaterialSets = [];

      const createTruck = ({
        scale = 1,
        color = "#f4dbc4",
        accent = "#fe1616",
        wire = "#5ce0e5",
        logo = false,
      }) => {
        const truck = new THREE.Group();
        const solidMaterials = [];
        const wireMaterials = [];

        const makeSolid = (meshColor, opacity = 0.1, emissive = "#1a0b08") => {
          const material = new THREE.MeshPhysicalMaterial({
            color: meshColor,
            emissive,
            roughness: 0.28,
            metalness: 0.45,
            transparent: true,
            opacity,
            clearcoat: 0.65,
          });
          solidMaterials.push(material);
          return material;
        };

        const makeWire = (meshColor, opacity = 0.95) => {
          const material = new THREE.MeshBasicMaterial({
            color: meshColor,
            wireframe: true,
            transparent: true,
            opacity,
          });
          wireMaterials.push(material);
          return material;
        };

        const trailerGeometry = new THREE.BoxGeometry(7, 2.35, 2.2);
        const trailerSolid = new THREE.Mesh(trailerGeometry, makeSolid(color, 0.12, "#2d140e"));
        const trailerWire = new THREE.Mesh(trailerGeometry, makeWire(wire, 0.88));
        trailerSolid.position.set(0.8, 0.25, 0);
        trailerWire.position.copy(trailerSolid.position);
        truck.add(trailerSolid, trailerWire);

        const cabGeometry = new THREE.BoxGeometry(2.2, 1.95, 2);
        const cabSolid = new THREE.Mesh(cabGeometry, makeSolid(accent, 0.18, "#340808"));
        const cabWire = new THREE.Mesh(cabGeometry, makeWire("#f5d3a7", 0.92));
        cabSolid.position.set(4.9, -0.05, 0);
        cabWire.position.copy(cabSolid.position);
        truck.add(cabSolid, cabWire);

        const roof = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.55, 1.9), makeSolid("#f2e6dc", 0.22, "#3a2116"));
        roof.position.set(5.1, 1.1, 0);
        const roofWire = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.55, 1.9), makeWire("#5ce0e5", 0.8));
        roofWire.position.copy(roof.position);
        truck.add(roof, roofWire);

        const windshield = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 1.1, 1.75),
          new THREE.MeshPhysicalMaterial({
            color: "#5ce0e5",
            roughness: 0.1,
            transmission: 0.68,
            transparent: true,
            opacity: 0.18,
          }),
        );
        windshield.position.set(6.08, 0.12, 0);
        truck.add(windshield);

        const wheelGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 24);
        const wheelMaterial = new THREE.MeshStandardMaterial({
          color: "#090909",
          roughness: 0.92,
          metalness: 0.08,
        });
        const wheelWireMaterial = makeWire("#5ce0e5", 0.66);
        const wheelPositions = [
          [-1.5, -1.08, -1.05],
          [-1.5, -1.08, 1.05],
          [1.4, -1.08, -1.05],
          [1.4, -1.08, 1.05],
          [4.45, -1.08, -1.05],
          [4.45, -1.08, 1.05],
          [5.85, -1.08, -1.05],
          [5.85, -1.08, 1.05],
        ];
        wheelPositions.forEach(([x, y, z]) => {
          const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
          wheel.rotation.z = Math.PI / 2;
          wheel.position.set(x, y, z);
          const wheelWire = new THREE.Mesh(wheelGeometry, wheelWireMaterial.clone());
          wheelWire.rotation.z = Math.PI / 2;
          wheelWire.position.copy(wheel.position);
          wireMaterials.push(wheelWire.material);
          truck.add(wheel, wheelWire);
        });

        if (logo) {
          const logoPanel = new THREE.Mesh(
            new THREE.PlaneGeometry(1.4, 1.95),
            new THREE.MeshBasicMaterial({
              map: logoTexture,
              transparent: true,
              opacity: 0.72,
            }),
          );
          logoPanel.position.set(1.6, 0.38, 1.13);
          truck.add(logoPanel);
        }

        truck.scale.setScalar(scale);
        truckMaterialSets.push({ solidMaterials, wireMaterials });
        return truck;
      };

      const leadTruck = createTruck({ scale: 1.2, logo: true });
      leadTruck.position.set(-6.5, -0.28, 5.5);
      leadTruck.rotation.y = -0.08;
      world.add(leadTruck);

      const convoyTruck = createTruck({
        scale: 0.84,
        color: "#f1d6ba",
        accent: "#c8662d",
      });
      convoyTruck.position.set(7.8, -0.65, -2.8);
      convoyTruck.rotation.y = -0.12;
      world.add(convoyTruck);

      const blueprintTruck = createTruck({
        scale: 0.92,
        color: "#ffd2b5",
        accent: "#fe1616",
      });
      blueprintTruck.position.set(2.1, -0.56, 8.2);
      blueprintTruck.rotation.y = 0.08;
      truckMaterialSets[2].solidMaterials.forEach((material) => {
        material.opacity = 0.02;
      });
      world.add(blueprintTruck);

      const particlePositions = new Float32Array(720 * 3);
      for (let i = 0; i < 720; i += 1) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 44;
        particlePositions[i * 3 + 1] = Math.random() * 8 + 0.3;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 28 - 8;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: "#f6cfa8",
        size: 0.06,
        transparent: true,
        opacity: 0.35,
      });
      const particleField = new THREE.Points(particleGeometry, particleMaterial);
      world.add(particleField);

      const lookTarget = { x: 0.5, y: 0.2, z: 1.5 };
      let animationFrame = null;

      const renderScene = () => {
        particleField.rotation.y += 0.0006;
        leadTruck.position.z += Math.sin(Date.now() * 0.0015) * 0.002;
        convoyTruck.position.z += Math.cos(Date.now() * 0.0012) * 0.0015;
        logoBillboard.lookAt(camera.position);
        camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);
        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(renderScene);
      };
      renderScene();

      const setTypedByProgress = (progress) => {
        const nextCount = Math.max(1, Math.round(progress * heroSentence.length));
        const nextText = heroSentence.slice(0, nextCount);
        setTypedMessage((current) => (current === nextText ? current : nextText));
        const routeIndex = Math.min(routeStates.length - 1, Math.floor(progress * routeStates.length));
        const nextState = routeStates[routeIndex];
        setRouteState((current) => (current === nextState ? current : nextState));
      };
      setTypedByProgress(0.02);

      const ctx = gsap.context(() => {
        const revealItems = gsap.utils.toArray(".home-reveal");
        revealItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              delay: index * 0.03,
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
              },
            },
          );
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
            onUpdate: (self) => {
              setTypedByProgress(self.progress);
            },
          },
        });

        tl.to(camera.position, { x: -5.8, y: 1.8, z: 13.5, ease: "none" }, 0)
          .to(lookTarget, { x: 2.2, y: 0.25, z: 5.5, ease: "none" }, 0)
          .to(leadTruck.position, { x: -2.1, z: 4.2, ease: "none" }, 0)
          .to(convoyTruck.position, { x: 5.2, z: -1.8, ease: "none" }, 0)
          .to(sun.position, { x: 16, y: 7.8, z: -24, ease: "none" }, 0)
          .to(camera.position, { x: -1.4, y: 1.25, z: 10.1, ease: "none" }, 1)
          .to(lookTarget, { x: 3.4, y: 0.1, z: 2.6, ease: "none" }, 1)
          .to(leadTruck.position, { x: 0.9, z: 2.6, ease: "none" }, 1)
          .to(leadTruck.rotation, { y: 0.02, ease: "none" }, 1)
          .to(convoyTruck.position, { x: 2.8, z: -0.2, ease: "none" }, 1)
          .to(blueprintTruck.position, { x: -1.1, z: 6.4, ease: "none" }, 1)
          .to(camera.position, { x: 2.4, y: 2.2, z: 8.6, ease: "none" }, 2)
          .to(lookTarget, { x: 1.4, y: 0.25, z: 5.4, ease: "none" }, 2)
          .to(leadTruck.position, { x: 2.6, z: 3.3, ease: "none" }, 2)
          .to(convoyTruck.position, { x: -0.1, z: 3.7, ease: "none" }, 2)
          .to(blueprintTruck.position, { x: 4.2, z: 1.9, ease: "none" }, 2)
          .to(containers.position, { x: -1.4, z: 0.3, ease: "none" }, 2)
          .to(camera.position, { x: 5.8, y: 2.8, z: 11.8, ease: "none" }, 3)
          .to(lookTarget, { x: 4.6, y: 0.45, z: 4.6, ease: "none" }, 3)
          .to(leadTruck.position, { x: 5.4, z: 4.5, ease: "none" }, 3)
          .to(convoyTruck.position, { x: 2.6, z: 6.7, ease: "none" }, 3)
          .to(blueprintTruck.position, { x: 7.4, z: 3.9, ease: "none" }, 3)
          .to(particleField.rotation, { y: Math.PI * 0.36, ease: "none" }, 3);

        truckMaterialSets.forEach(({ solidMaterials, wireMaterials }, index) => {
          const start = index * 0.48;
          solidMaterials.forEach((material) => {
            tl.to(material, { opacity: 0.92, duration: 0.8, ease: "none" }, start + 0.35);
          });
          wireMaterials.forEach((material) => {
            tl.to(material, { opacity: index === 2 ? 0.1 : 0.16, duration: 0.8, ease: "none" }, start + 0.45);
          });
        });

        gsap.to(".hero-scanline", {
          backgroundPositionX: "240px",
          repeat: -1,
          duration: 8,
          ease: "none",
        });
      }, homeRef);

      window.addEventListener("resize", resizeRenderer);

      cleanup = () => {
        ctx.revert();
        window.removeEventListener("resize", resizeRenderer);
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
        }
        particleGeometry.dispose();
        particleMaterial.dispose();
        logoTexture.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
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
          <div className="hero-canvas__sunset" />
          <div className="hero-canvas__vignette" />
          <div className="hero-scanline" />
        </div>

        <div className="hero-shell section__padding">
          <div className="hero-copy">
            <div className="hero-topbar home-reveal">
              <span className="hero-chip">
                <img src={logoMark} alt="ADE.T logo" className="hero-chip__logo" />
                ADE.T / Scroll Cinema
              </span>
              <span className="hero-route">
                <FiNavigation />
                {routeState}
              </span>
            </div>

            <p className="hero-kicker home-reveal">TIMILEHIN ADEWALE / FRONTEND MOTION SYSTEMS</p>
            <h1 className="hero-title home-reveal">
              A portfolio that feels like the camera is traveling through the product.
            </h1>
            <div className="hero-type home-reveal">
              <span className="hero-type__label">Scroll-linked message</span>
              <span className="hero-type__word">{typedMessage}</span>
              <span className="hero-type__cursor" />
            </div>
            <p className="hero-description home-reveal">
              The reference you shared leans on scrollytelling, not just animation. So this direction
              pushes the site toward a cinematic yard run: convoy movement, blueprint overlays, and text
              reveals that advance only when the visitor does.
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
                <strong>Yard Scene</strong>
                <span>Truck-like branded geometry gliding through a sunset logistics world</span>
              </div>
              <div>
                <strong>Scroll Sync</strong>
                <span>Camera, materials, and copy all progress with the wheel or touch drag</span>
              </div>
              <div>
                <strong>Blueprint FX</strong>
                <span>Wireframe overlays dissolve into solid surfaces as the sequence builds</span>
              </div>
            </div>
          </div>

          <div className="hero-aside home-reveal">
            <div className="hero-card hero-card--profile">
              <img src={me} alt="Timilehin Adewale portrait" className="hero-card__portrait" />
              <div>
                <p className="hero-card__eyebrow">Director's note</p>
                <h2>Interface engineering with cinematic restraint</h2>
                <p>
                  Your brand already has a sharp red-and-aqua identity, so this version uses that palette as
                  the "tech layer" against a sunrise industrial atmosphere instead of default neon futurism.
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
                <span>Scrollytelling stack</span>
              </div>
              <ul>
                {capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="hero-card hero-card--command">
              <div className="hero-card__heading">
                <FiZap />
                <span>Motion cues</span>
              </div>
              <p>`camera.push()` through the yard</p>
              <p>`wireframe.fade()` into solid forms</p>
              <p>`copy.type()` with scroll progress</p>
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
          <h2>The cinematic layer still needs real projects underneath it, so the work stays front and center.</h2>
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
          <p className="section-heading__label">Interactive Lab</p>
          <h2>Spline stays available as the second camera angle, but the lead storytelling is now your custom yard scene.</h2>
        </div>

        <div className="spline-layout">
          <div className="spline-copy home-reveal">
            <p>
              The reference site uses a strong single narrative device. Here, that role belongs to the custom
              Three.js convoy sequence. Spline remains useful for secondary modules, branded product callouts,
              or interactive showcases deeper in the site.
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
              {canLoadSpline ? (
                <BrandSpline />
              ) : (
                <div className="spline-loading">Branded Spline module armed for the next section.</div>
              )}
            </Suspense>
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-section--cta section__padding home-reveal">
        <div className="cta-block">
          <p className="section-heading__label">Next move</p>
          <h2>This gives the homepage the right grammar. The next win is carrying the same system across the whole site.</h2>
          <p>
            About can become the technical dossier, Projects can inherit the convoy card language, and Contact
            can land like the final stop in the route rather than a separate page with a different mood.
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

