import { LandingPage } from "@/components/LandingPage";
import Script from "next/script";

export default function Home() {
  return (
    <>
      {/* ✅ Insertion du script externe */}
      <Script async src="https://cdn.seline.so/seline.js" data-token="1aa05bdcda54bd7" />
      
      {/* ✅ Affichage de la LandingPage */}
      <LandingPage />
    </>
  );
}
