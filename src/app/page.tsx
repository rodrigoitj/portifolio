import Image from "next/image";

import { Roboto_Mono } from "next/font/google";
import { Github, Linkedin, Instagram, FileText, Mail } from "lucide-react";
import { AboutMe } from "@/components/AboutMe";
import { MyTechnologies } from "@/components/MyTechnologies";
import { ExternalLinks } from "@/components/ExternalLinks";

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
          style={{
            objectFit: "contain",
            objectPosition: "right",
            transform: "translateY(30%)",
          }}
          className="opacity-90 grayscale"
          priority
        />
      </div>
      {/* Left Info Bar */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-12 pl-8 text-xs text-gray-400 tracking-widest z-10 select-none">
        <div>
          <div className="mb-8 font-bold text-lg text-gray-200">
            <Image
              src="/logo.png"
              alt="Correa.Dev"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>
        {/* <div className="mt-8">© {new Date().getFullYear()}</div> */}
      </div>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center pt-32 pb-24 px-4 max-w-3xl w-full z-10">
        <AboutMe />
        <MyTechnologies
          technologies={[
            ".NET Core",
            "JavaScript",
            "Node.js",
            "ReactJS",
            "MySQL",
            "Oracle",
            "SQL Server",
            "Postgres",
            "MongoDB",
            "Docker",
            "Microservices",
            "Unit Testing",
            "DevOps",
          ]}
        />
      </main>
      <ExternalLinks links={links} />
      {/* Overlay for white paint effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(16,16,20,0.7) 0%, rgba(16,16,20,0.2) 60%, transparent 100%)",
        }}
      />
    </div>
  );
}
