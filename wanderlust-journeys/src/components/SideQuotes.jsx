import {
  BoardingPass,
  Cactus,
  Camera,
  Cloud,
  Compass,
  Heart,
  HotAirBalloon,
  MapPin,
  Mountains,
  PalmTree,
  Passport,
  Polaroid,
  Snowflake,
  Star,
  Swirl,
  Anchor,
} from "./Doodles";

const QUOTES = {
  left: ["Our greatest adventure is loving each other.", "Two hearts, one world."],
  right: ["Exploring the world, together.", "Our journey, our story."],
};

// Doodles live inside the column so they always sit beside the quotes, whatever the
// screen size. "outer" hugs the page edge, "inner" hugs the stamp grid.
function SideDoodles({ side }) {
  const outer = side === "left" ? "left-0" : "right-0";
  const inner = side === "left" ? "right-0" : "left-0";

  if (side === "left") {
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Passport className={`absolute ${outer} top-[3%] w-[min(5vh,44px)] -rotate-12`} color="#c9534e" />
        <Snowflake className={`absolute ${outer} top-[30%] w-[min(3vh,26px)]`} />
        <Cactus className={`absolute ${outer} top-[50%] w-[min(4.5vh,38px)] -rotate-3`} />
        <MapPin className={`absolute ${outer} top-[71%] w-[min(3vh,26px)]`} />
        <Compass className={`absolute ${outer} top-[85%] w-[min(5.5vh,46px)] rotate-12`} />

        <HotAirBalloon className={`absolute ${inner} top-[6%] w-[min(4.5vh,38px)] -rotate-6`} />
        <Cloud className={`absolute ${inner} top-[28%] w-[min(6vh,52px)]`} />
        <Polaroid className={`absolute ${inner} top-[52%] w-[min(5.5vh,48px)] -rotate-[10deg]`} />
        <Star className={`absolute ${inner} top-[78%] w-[min(2.6vh,22px)]`} />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Passport className={`absolute ${outer} top-[3%] w-[min(5vh,44px)] rotate-[14deg]`} color="#9fa9b8" />
      <Cloud className={`absolute ${outer} top-[40%] w-[min(4.5vh,40px)]`} />
      <PalmTree className={`absolute ${outer} top-[49%] w-[min(5.5vh,46px)] rotate-3`} />
      <Camera className={`absolute ${outer} top-[75%] w-[min(6vh,52px)] rotate-[10deg]`} color="#a9cdea" />

      <Mountains className={`absolute ${inner} top-[5%] w-[min(6.5vh,56px)]`} />
      <Snowflake className={`absolute ${inner} top-[31%] w-[min(3vh,26px)] rotate-12`} color="#9ec5ee" />
      <BoardingPass className={`absolute ${inner} top-[63%] w-[min(7vh,60px)] rotate-[8deg]`} />
      <Anchor className={`absolute ${inner} top-[78%] w-[min(3.6vh,32px)] -rotate-12`} />
    </div>
  );
}

export default function SideQuotes({ side }) {
  const [first, second] = QUOTES[side];
  const tilt = side === "left" ? "-rotate-2" : "rotate-2";

  return (
    <aside className="relative z-10 hidden self-stretch lg:block">
      <SideDoodles side={side} />
      <div
        className={`relative flex h-full flex-col items-center justify-around gap-6 py-6 text-center font-hand uppercase leading-snug text-ink ${tilt}`}
      >
        <figure className="flex flex-col items-center gap-3">
          <Heart className="w-5" color={side === "left" ? "#e88a8a" : "#f4b6cf"} />
          <blockquote className="max-w-[11ch] text-[clamp(1rem,min(1.6vw,2.6vh),1.6rem)]">{first}</blockquote>
          <Swirl className="w-24" />
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <Swirl className="w-20 -scale-x-100" />
          <blockquote className="max-w-[10ch] text-[clamp(1rem,min(1.6vw,2.6vh),1.6rem)]">{second}</blockquote>
          <Heart className="w-4" color="#f6b98a" />
        </figure>
      </div>
    </aside>
  );
}
