"use client";

import { useCallback } from "react";
import Particles, { ParticlesProps } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useDarkMode } from "@/contexts/darkmode"; // Import the useDarkMode hook

type InitType = ParticlesProps["init"];
type InitTypeNonNullable = NonNullable<InitType>;
type InitParameters = Parameters<InitTypeNonNullable>;
type Engine = InitParameters[0];

const Particle = () => {
  const { darkMode } = useDarkMode(); // Get dark mode state from context
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <Particles
      className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`} // Apply background class based on dark mode
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: true },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 1,
            },
          },
        },
        particles: {
          color: {
            value: ["#4CB853", "#48639C", "#28A992", "#F8961D", "#E01F27"],
          },
          collisions: {
            enable: true,
          },
          move: {
            enable: true,
            direction: "bottom",
            outModes: {
              default: "out",
            },
            random: false,
            straight: false,
            speed: 2,
            gravity: {
              enable: false,
              acceleration: 0,
            },
          },
          number: {
            density: {
              enable: true,
              area: 1200,
            },
            value: 20,
          },
          opacity: {
            value: 0.6,
          },
          shape: {
            type: "edge",
          },
          size: {
            value: { min: 22, max: 56 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Particle;
