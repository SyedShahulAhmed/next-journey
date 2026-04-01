interface BackgroundLayerProps {
  bgImage: string | null;
}

const BackgroundLayer = ({ bgImage }: BackgroundLayerProps) => {
  return (
    <>
      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={
          bgImage
            ? {
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                filter: "blur(2px) brightness(0.95)",
              }
            : {
                background: "linear-gradient(135deg, #0a0e27 0%, #16213e 50%, #0f3460 100%)",
              }
        }
      />
      {/* Subtle overlay to reduce brightness and add depth */}
      <div className="absolute inset-0 z-1 bg-black/25 pointer-events-none" />
    </>
  );
};

export default BackgroundLayer;
