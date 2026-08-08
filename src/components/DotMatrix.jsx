const densityConfig = {
  dense: { gap: 10, size: 2 },
  normal: { gap: 14, size: 2 },
  sparse: { gap: 22, size: 2 }
};

const clampOpacity = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return 0.5;
  return Math.min(1, Math.max(0, num > 1 ? num / 10 : num));
};

const DotMatrix = ({ className = "", density = "normal", opacity = "5", color }) => {
  const { gap, size } = densityConfig[density] || densityConfig.normal;
  const alpha = clampOpacity(opacity);
  const dotColor = color || `rgba(255, 255, 255, ${alpha})`;

  return (
    <div
      aria-hidden
      className={`absolute -z-10 w-full h-full overflow-hidden ${className}`}
      style={{
        color: dotColor,
        backgroundImage: `radial-gradient(currentColor ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`
      }}
    />
  );
};

export default DotMatrix;