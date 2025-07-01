import { Suspense } from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Team } from "@/components/Team";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full space-y-12">
      <Suspense>
        <Header />
      </Suspense>
      <Hero />
      <Features />
      <Team />
      <Footer />
    </div>
  );
}
