import Image from "next/image";

export default function Poster({ animation }) {
  const posterPath = `https://image.tmdb.org/t/p/w440_and_h660_face${animation.path}`;
  return (
    <div className="group inline-block p-5 relative text-center">
      <div className="">
        <Image
          src={posterPath}
          width={300}
          height={600}
          alt="cell"
          className="group-hover:brightness-50 group-hover:cursor-pointer transition duration-1000 ease-in-out"
        />
        <div className="invisible group-hover:visible group-hover:cursor-pointer text-neutral-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-3xl">{animation.title}</span>
        </div>
      </div>
    </div>
  );
}
