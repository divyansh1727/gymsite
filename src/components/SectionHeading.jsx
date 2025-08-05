export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold neon-text mb-2">{title}</h2>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </div>
  );
}
