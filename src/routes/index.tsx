import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Intro } from "@/components/scrapbook/Intro";
import { GiftRoom } from "@/components/scrapbook/GiftRoom";
import { FinalGift } from "@/components/scrapbook/FinalGift";
import { FloatingHearts } from "@/components/scrapbook/FloatingHearts";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const roomRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(false);

  const openRoom = () =>
    roomRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="relative">
      <FloatingHearts count={10} />
      <div className="relative z-10">
        <Intro onOpen={openRoom} />
        <div ref={roomRef} />
        <GiftRoom onAllOpened={() => setUnlocked(true)} />
        <FinalGift unlocked={unlocked} />
        <footer className="py-10 text-center font-hand text-lg text-muted-foreground">
          made with ♡ — just for you
        </footer>
      </div>
    </main>
  );
}
