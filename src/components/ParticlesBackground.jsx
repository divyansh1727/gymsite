import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          number: { value: 25},
          shape: {
            type: "image",
            image: [
              {
      src: "icons/dumbbell.svg", // Dumbbell
      width: 50,
      height: 50,
    },
    {
      src: "icons/fire.svg", // Rod / Barbell
      width: 32,
      height: 32,
    },
    {
      src: "icons/barbell.svg", // Kettlebell
      width: 50,
      height: 50,
    },
            ],
          },
          size: { value: 20, random: true },
          opacity: { value: 0.85 },
          move: {
            enable: true,
            speed: 7,
            direction: "none",
            outModes: { default: "out" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: false },
          },
          modes: {
            repulse: { distance: 120, duration: 0.6 },
          },
        },
      }}
    />
  );
}




