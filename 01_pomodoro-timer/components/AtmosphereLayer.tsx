interface AtmosphereLayerProps {
  effect: "none" | "rain" | "snow" | "stars";
  rainDrops: Array<{ left: number; delay: number; angle: number; speed: number; length: number; layer: number }>;
  snowFlakes: Array<{ left: number; delay: number; duration: number; layer: number; size: number }>;
  stars: Array<{ top: number; left: number; brightness: number; size: number; layer: number; drift: number }>;
}

const AtmosphereLayer = ({ effect, rainDrops, snowFlakes, stars }: AtmosphereLayerProps) => {
  return (
    <>
      {/* Subtle atmospheric overlay - creates depth and focus */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/25 backdrop-blur-xs pointer-events-none opacity-60" />

      {/* RAIN EFFECT */}
      {effect === "rain" && (
        <div className="pointer-events-none absolute inset-0 z-12 overflow-hidden">
          {[0.2, 0.5, 0.8].map((layer, layerIndex) => {
            const speedVariation = [1.2, 1, 0.85][layerIndex];
            return (
              <div
                key={layerIndex}
                className="absolute inset-0 overflow-hidden"
                style={{ opacity: layer }}
              >
                {rainDrops.map((drop, i) => {
                  const speed = drop.speed * speedVariation;
                  const size = 0.8 + layerIndex * 0.6;
                  const dropOpacity = 0.5 + layerIndex * 0.15;
                  const blurAmount = layerIndex * 0.4;
                  const animationName = [
                    "rain-fall-slow",
                    "rain-fall",
                    "rain-fall-fast",
                  ][layerIndex];

                  return (
                    <div
                      key={i}
                      className="absolute will-change-transform"
                      style={{
                        left: `${drop.left}%`,
                        top: "0px",
                        width: `${size}px`,
                        height: `${drop.length}px`,
                        background: `linear-gradient(to bottom, rgba(255,255,255,${0.9 - layerIndex * 0.1}), rgba(255,255,255,0.1), rgba(255,255,255,0))`,
                        animation: `${animationName} ${speed}s linear infinite`,
                        animationDelay: `${drop.delay}s`,
                        filter: `blur(${blurAmount}px)`,
                        opacity: dropOpacity,
                        boxShadow:
                          layerIndex === 2
                            ? `0 0 ${4 + layerIndex}px rgba(255,255,255,${0.3 + layerIndex * 0.15})`
                            : "none",
                        backfaceVisibility: "hidden",
                        perspective: "1000px",
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* SNOW EFFECT - Visible cinematic depth with 2 layers */}
      {effect === "snow" && (
        <div className="pointer-events-none absolute inset-0 z-12 overflow-hidden">
          {/* Background snow layer - slower, visible presence with glow */}
          <div className="absolute inset-0 opacity-70">
            {snowFlakes.filter((_, i) => i % 2 === 0).map((flake, i) => (
              <div
                key={`bg-snow-${i}`}
                className="absolute rounded-full will-change-transform"
                style={{
                  left: `${flake.left}%`,
                  top: "0px",
                  width: `${flake.size + 1.5}px`,
                  height: `${flake.size + 1.5}px`,
                  background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(219, 234, 254, 0.6) 100%)",
                  filter: "blur(1px)",
                  animation: `snow-cinematic ${flake.duration * 1.4}s ease-in-out infinite`,
                  animationDelay: `${flake.delay * 1.5}s`,
                  boxShadow: "0 0 14px rgba(191, 219, 254, 0.6), 0 0 6px rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>

          {/* Foreground snow layer - faster, sharper, clearly visible */}
          <div className="absolute inset-0 opacity-80">
            {snowFlakes.filter((_, i) => i % 2 !== 0).map((flake, i) => (
              <div
                key={`fg-snow-${i}`}
                className="absolute rounded-full will-change-transform"
                style={{
                  left: `${(flake.left + 2) % 100}%`,
                  top: "0px",
                  width: `${flake.size + 0.5}px`,
                  height: `${flake.size + 0.5}px`,
                  background: "radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(226, 239, 250, 0.7) 100%)",
                  filter: "blur(0.5px)",
                  animation: `snow-cinematic ${flake.duration}s ease-in-out infinite`,
                  animationDelay: `${flake.delay}s`,
                  boxShadow: "0 0 16px rgba(191, 219, 254, 0.8), 0 0 8px rgba(255,255,255,0.6)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* STARS EFFECT - Cinematic with soft glow and natural twinkle */}
      {effect === "stars" && (
        <div className="pointer-events-none absolute inset-0 z-12 overflow-visible">
          {/* Background stars - soft glow, subtle twinkle */}
          <div className="absolute inset-0 opacity-55">
            {stars.filter((_, i) => i % 2 === 0).map((star, i) => (
              <div
                key={`bg-star-${i}`}
                className="absolute rounded-full will-change-transform"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  background: `radial-gradient(circle, rgba(255, 255, 255, ${Math.min(star.brightness * 0.9, 0.85)}) 0%, rgba(255, 255, 255, ${Math.min(star.brightness * 0.4, 0.5)}) 100%)`,
                  filter: "blur(0.6px)",
                  animation: `star-twinkle-soft ${5 + i % 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.35}s`,
                  boxShadow: `0 0 12px rgba(191, 219, 254, ${star.brightness * 0.5}), 0 0 6px rgba(255, 255, 255, ${star.brightness * 0.4})`,
                }}
              />
            ))}
          </div>

          {/* Foreground stars - brighter, more visible glow and twinkle */}
          <div className="absolute inset-0 opacity-75">
            {stars.filter((_, i) => i % 2 !== 0).map((star, i) => (
              <div
                key={`fg-star-${i}`}
                className="absolute rounded-full will-change-transform"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size * 1.2}px`,
                  height: `${star.size * 1.2}px`,
                  background: `radial-gradient(circle, rgba(255, 255, 255, ${Math.min(star.brightness, 1)}) 0%, rgba(255, 255, 255, ${Math.min(star.brightness * 0.5, 0.7)}) 100%)`,
                  filter: "blur(0.5px)",
                  animation: `star-twinkle-cinematic ${4 + i % 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.25}s`,
                  boxShadow: `0 0 16px rgba(191, 219, 254, ${star.brightness * 0.7}), 0 0 8px rgba(255, 255, 255, ${star.brightness * 0.5})`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AtmosphereLayer;
