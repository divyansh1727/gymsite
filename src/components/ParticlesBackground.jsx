import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
      console.log("🚀 Particles engine initialized:", engine); // <- ADD THIS LINE

    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: "#000000",
        },
        particles: {
          number: {
            value: 25,
            density: {
              enable: true,
              area: 800,
            },
          },
          shape: {
            type: "image",
            image: {
              src: "/particles/dumbbell.svg",
              width: 32,
              height: 32,
            },
          },
          size: {
            value: 24,
          },
          move: {
            enable: true,
            speed: 1.5,
            outModes: {
              default: "out",
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
