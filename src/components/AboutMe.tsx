import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({ subsets: ["latin"], preload: true });

export function AboutMe() {
  return (
    <div className="text-center">
      <h1
        className={`text-4xl md:text-5xl font-bold tracking-widest mb-4 text-gray-100 ${roboto.className}`}
      >
        Rodrigo Corrêa
      </h1>
      <p
        className={`${roboto.className} max-w-xl mx-auto text-gray-300 text-base md:text-lg leading-relaxed mb-8`}
      >
        I&apos;m a web developer with experience in building modern, efficient,
        and scalable solutions. Passionate about technology, I combine best
        practices and performance to deliver applications that truly make a
        difference.
      </p>
    </div>
  );
}
