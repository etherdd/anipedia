import Poster from "../components/Poster";

export default function Home() {

  const animations = [
    {
      path: "/sgheSKxZkttIe8ONsf2sWXPgip3.jpg",
      title: "Monsters, Inc."
    },
    {
      path: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
      title: "Toy Story"
    },
    {
      path: "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
      title: "The Lion King"
    },
    {
      path: "/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg",
      title: "Frozen"
    },
    {
      path: "/dyhaB19AICF7TO7CK2aD6KfymnQ.jpg",
      title: "Shrek"
    },
  ]

  return (
    <div>
      <h1>HomePage</h1>
      <div className="overflow-auto whitespace-nowrap">
        {
          animations.map((animation, idx) => <Poster animation={animation} key={idx}></Poster>)
        }
      </div>
      
    </div>
  );
}
