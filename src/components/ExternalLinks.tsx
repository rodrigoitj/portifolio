import { LucideIcon } from "lucide-react";
import { Tooltip } from "@/components/Tooltip";

interface Link {
  name: string;
  url: string;
  icon: LucideIcon;
  protectFromScrapers?: boolean;
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
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-10"
      style={{ bottom: "max(2rem, env(safe-area-inset-bottom, 0px))" }}
    >
      {links.map(
        ({ name, url, icon: Icon, protectFromScrapers = false }, index) => (
          <Tooltip key={index} content={name}>
            <a
              href={protectFromScrapers ? "#" : url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="group w-12 h-12 md:w-14 md:h-14 rounded-lg border border-gray-700 bg-[#181824]/80 shadow flex items-center justify-center hover:border-gray-500 hover:bg-[#1f1f2a]/80 transition-colors"
              data-protected-url={
                protectFromScrapers ? createObfuscatedDataUrl(url) : undefined
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
