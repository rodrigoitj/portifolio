import { LucideIcon } from "lucide-react";
import { Tooltip } from "@/components/Tooltip";

interface Link {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface ExternalLinksProps {
  links: Link[];
}

export function ExternalLinks({ links }: ExternalLinksProps) {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-10"
      style={{ bottom: "max(2rem, env(safe-area-inset-bottom, 0px))" }}
    >
      {links.map(({ name, url, icon: Icon }, index) => (
        <Tooltip key={index} content={name}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="group w-12 h-12 md:w-14 md:h-14 rounded-lg border border-gray-700 bg-[#181824]/80 shadow flex items-center justify-center hover:border-gray-500 hover:bg-[#1f1f2a]/80 transition-colors"
          >
            <Icon
              className="w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-white transition-colors"
              strokeWidth={1.75}
            />
            <span className="sr-only">{name}</span>
          </a>
        </Tooltip>
      ))}
    </div>
  );
}
