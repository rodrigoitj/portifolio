"use client";
import { LucideIcon } from "lucide-react";
import { Tooltip } from "@/components/Tooltip";
import { useState } from "react";

interface Submenu {
  name: string;
  url: string;
}

interface Link {
  name: string;
  url?: string;
  icon: LucideIcon;
  protectFromScrapers?: boolean;
  submenu?: Submenu[];
}

interface ExternalLinksProps {
  links: Link[];
}

// Server-side URL obfuscation function
function obfuscateUrl(url: string): string {
  // Simple obfuscation: base64 encode, reverse, and add noise
  const encoded = Buffer.from(url, "utf-8").toString("base64");
  const reversed = encoded.split("").reverse().join("");
  const noise = Math.random().toString(36).substring(2, 8);
  return `${noise}${reversed}${noise}`;
}

// Create a data attribute with obfuscated URL for client-side decoding
function createObfuscatedDataUrl(url: string): string {
  const obfuscated = obfuscateUrl(url);
  return `data:url;base64,${Buffer.from(obfuscated).toString("base64")}`;
}

export function ExternalLinks({ links }: ExternalLinksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-10"
      style={{ bottom: "max(2rem, env(safe-area-inset-bottom, 0px))" }}
    >
      {links.map(
        ({ name, url, icon: Icon, protectFromScrapers = false, submenu }, index) => (
          <div 
            key={index} 
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {submenu && hoveredIndex === index && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2">
                <div className="bg-[#181824]/95 border border-gray-700 rounded-lg shadow-lg overflow-hidden min-w-[140px] backdrop-blur-sm">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 border-b border-gray-700 uppercase tracking-wide">
                    {name}
                  </div>
                  {submenu.map((item, subIndex) => (
                    <a
                      key={subIndex}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1f1f2a] hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {submenu ? (
              <button
                aria-label={name}
                className="group w-12 h-12 md:w-14 md:h-14 rounded-lg border border-gray-700 bg-[#181824]/80 shadow flex items-center justify-center hover:border-gray-500 hover:bg-[#1f1f2a]/80 transition-colors"
              >
                <Icon
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-white transition-colors"
                  strokeWidth={1.75}
                />
                <span className="sr-only">{name}</span>
              </button>
            ) : (
              <Tooltip content={name}>
                <a
                  href={protectFromScrapers ? "#" : url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="group w-12 h-12 md:w-14 md:h-14 rounded-lg border border-gray-700 bg-[#181824]/80 shadow flex items-center justify-center hover:border-gray-500 hover:bg-[#1f1f2a]/80 transition-colors"
                  data-protected-url={
                    protectFromScrapers ? createObfuscatedDataUrl(url!) : undefined
                  }
                  data-protected={protectFromScrapers ? "true" : undefined}
                >
                  <Icon
                    className="w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-white transition-colors"
                    strokeWidth={1.75}
                  />
                  <span className="sr-only">{name}</span>
                </a>
              </Tooltip>
            )}
          </div>
        )
      )}
      {/* Client-side script to handle protected links */}
      {links.some((link) => link.protectFromScrapers) && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.addEventListener('DOMContentLoaded', function() {
                  const protectedLinks = document.querySelectorAll('a[data-protected="true"]');
                  protectedLinks.forEach(function(link) {
                    link.addEventListener('click', function(e) {
                      e.preventDefault();
                      const obfuscatedData = this.getAttribute('data-protected-url');
                      if (obfuscatedData) {
                        try {
                          // Decode the obfuscated URL
                          const obfuscated = atob(obfuscatedData.replace('data:url;base64,', ''));
                          const noise = obfuscated.substring(0, 6);
                          const reversed = obfuscated.substring(6, obfuscated.length - 6);
                          const encoded = reversed.split('').reverse().join('');
                          const decodedUrl = atob(encoded);
                          window.open(decodedUrl, '_blank', 'noopener,noreferrer');
                        } catch (error) {
                          console.error('Error decoding protected URL:', error);
                        }
                      }
                    });
                  });
                });
              })();
            `,
          }}
        />
      )}
    </div>
  );
}
