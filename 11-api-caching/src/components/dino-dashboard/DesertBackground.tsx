type DesertBackgroundProps = {
  speedFactor: number;
};

function layerDuration(baseSeconds: number, speedFactor: number) {
  const clamped = Math.max(speedFactor, 0.5);
  return `${(baseSeconds / clamped).toFixed(2)}s`;
}

export function DesertBackground({ speedFactor }: DesertBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(18,18,18,0.8),_rgba(2,2,2,0.95)_55%)]" />

      <div
        className="desert-layer desert-layer-back"
        style={{ animationDuration: layerDuration(45, speedFactor) }}
      />
      <div
        className="desert-layer desert-layer-mid"
        style={{ animationDuration: layerDuration(26, speedFactor) }}
      />
      <div
        className="desert-layer desert-layer-front"
        style={{ animationDuration: layerDuration(15, speedFactor) }}
      />

      <div
        className="ground-lines"
        style={{ animationDuration: layerDuration(6, speedFactor) }}
      />

      <div className="crt-overlay" />
    </div>
  );
}
