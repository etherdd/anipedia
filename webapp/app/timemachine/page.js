import Image from "next/image"

export default function TimeMachine() {
  return (
    <div className="w-full m-auto">
      <div>abc</div>
      <div className="">
        <Image 
          src={"/cell.png"}
          // fill={true}
          width={600}
          height={100}
          // objectFit="contain"
          alt="cell"
          className="block m-auto"
        />
        
        
      </div>
    </div>
  )
}