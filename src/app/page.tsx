import Image from "next/image";

import { Roboto_Mono } from "next/font/google";
import { Github, Linkedin, Instagram, FileText, Mail } from "lucide-react";

const roboto = Roboto_Mono({ subsets: ["latin"], preload: true });
// console.log(roboto);
const links = [
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/rodrigoitj/",
    icon: Linkedin,
  },
  {
    name: "Github",
    url: "https://github.com/rodrigoitj",
    icon: Github,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/rodrigoitjsc/",
    icon: Instagram,
  },
  {
    name: "Resume",
    url: "/resume.pdf",
    icon: FileText,
  },
  {
    name: "Email",
    url: "mailto:rodrigo@correa.dev",
    icon: Mail,
  },
];
export default function Home() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden content">
      {/* Hero Section */}
      <div className="absolute inset-0 -z-0 max-h-[815px]">
        <Image
          src="/hero2.png"
          alt="Hero background"
          fill
          style={{ objectFit: "contain", objectPosition: "right", transform: "translateY(30%)" }}
          className="opacity-90 grayscale"
          priority
        />
      </div>
      {/* Left Info Bar */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-12 pl-8 text-xs text-gray-400 tracking-widest z-10 select-none">
        <div>
          <div className="mb-8 font-bold text-lg text-gray-200">
            <Image src="/logo.png" alt="Correa.Dev" width={160} height={40} className="h-10 w-auto" />
          </div>
        </div>
        {/* <div className="mt-8">© {new Date().getFullYear()}</div> */}
      </div>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center pt-32 pb-24 px-4 max-w-3xl w-full z-10">
        <div className="text-center">
          <h1 className={`text-4xl md:text-5xl font-bold tracking-widest mb-4 text-gray-100 ${roboto.className}`}>Rodrigo Corrêa</h1>
          <p className={`${roboto.className} max-w-xl mx-auto text-gray-300 text-base md:text-lg leading-relaxed mb-8`}>
          I&apos;m a web developer with experience in building modern, efficient, and scalable solutions. Passionate about technology, I combine best practices and performance to deliver applications that truly make a difference.
          </p>
        </div>
      </main>
      {/* Social / Contact Icons */}
      <div
        className="fixed left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-10"
        style={{ bottom: 'max(2rem, env(safe-area-inset-bottom, 0px))' }}
      >
        {links.map(({ name, url, icon: Icon }, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className="group w-12 h-12 md:w-14 md:h-14 rounded-lg border border-gray-700 bg-[#181824]/80 shadow flex items-center justify-center hover:border-gray-500 hover:bg-[#1f1f2a]/80 transition-colors"
          >
            <Icon
              className="w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-white transition-colors"
              strokeWidth={1.75}
            />
            <span className="sr-only">{name}</span>
          </a>
        ))}
      </div>
      {/* Overlay for white paint effect */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{background: "radial-gradient(circle at 60% 40%, rgba(16,16,20,0.7) 0%, rgba(16,16,20,0.2) 60%, transparent 100%)"}} />
    </div>
  );
}
