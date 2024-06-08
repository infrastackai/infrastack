import { InfiniteMovingCards } from "./infinite-moving-cards";

const customers = [
  {
    logo: "/images/glide.svg",
    className: "h-12 w-32"
  },
  {
    logo: "/images/thirdweb.svg",
    className: "h-40 w-40"
  },
  {
    logo: "/images/permify-logo.svg",
    className: "h-44 w-44"
  },
  {
    logo: "/images/upstash.svg",
    className: "h-12 w-44"
  },
  {
    logo: "/images/formbricks.svg",
    className: "h-44 w-44"
  },
  {
    logo: "/images/glide.svg",
    className: "h-12 w-32"
  },
  {
    logo: "/images/permify-logo.svg",
    className: "h-40 w-40"
  },
  {
    logo: "/images/upstash.svg",
    className: "h-12 w-44"
  },
  {
    logo: "/images/unwave.svg",
    className: "h-44 w-44"
  },
  // {
  //   logo: "/images/dell.svg",
  // },
];

export function CustomersSection() {

  return (

    <div className="w-full md:mt-40 mt-20 relative" id="featuresContainerId">
      <div className="m-auto left-0 right-0 top- blur-3xl bg-indigo-800/20 h-52 w-full absolute z-40"></div>
      <div className="w-full text-center">
        <div className="flex flex-col space-y- items-center justify-center h-0">
          {/* <div className=" shadow-inner rounded-xl px-4 text-center p-2 pl-4 pr-4 text-2xl "><span className="text-4xl text-green-400">1K+</span><br></br>Users signed up</div> */}
          {/* <div className=" shadow-inner rounded-xl px-4 text-center p-2 pl-4 pr-4 text-2xl"><span className="text-green-400 text-4xl font-bold">200M+ <BarChart4 className="h-10 w-10 inline" /></span><br></br>Traces Proceessed</div>
            <div className=" shadow-inner rounded-xl px-4 text-center p-2 pl-4 pr-4 text-2xl"><span className="text-green-400 text-4xl font-bold">1K+ Human Hours <Sparkles className="h-10 w-10 inline" /></span><br></br>Saved by InfraStack AI Copilots</div> */}
          {/* <div className="text text-3xl md:text-5xl p-2 mt- font-bold bg-gradient-to-r from-[#5865F2] to-green-400 inline-block text-transparent bg-clip-text z-[60]">Loved By Next-Gen Developers</div> */}
          <div className="text text-[26px] md:text-5xl p-2 mt- font-semibold bg-gradient-to-r from-[#5865F2] to-green-400 inline-block text-transparent bg-clip-text z-[60]">Loved By Modern Developers</div>

        </div>
      </div>

      <div className="w-full mt-8 md:mt-12">

        <InfiniteMovingCards
          items={customers}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  )
}
