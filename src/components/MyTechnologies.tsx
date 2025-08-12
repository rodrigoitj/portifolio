interface MyTechnologiesProps {
  technologies: string[];
}

export function MyTechnologies({ technologies }: MyTechnologiesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8 z-10">
      {technologies.map((tag) => (
        <span
          key={tag}
          className="inline-block px-3 py-1 rounded-full bg-gray-800/80 text-xs font-medium text-cyan-300 border border-cyan-700 shadow-sm tracking-wide"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
