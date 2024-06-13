import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Announcement } from "@/components/announcement"
import { ExamplesNav } from "@/components/examples-nav"
import { ButtonMoving } from "@/components/ui/moving-border"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button, buttonVariants } from "@/components/ui/button"
import { InfraStackLogo3D } from "@/components/3d-logo"
import { InfiniteMovingCards } from "@/components/infinite-moving-cards"
import { Activity, ArrowUp, BarChart2, BarChart4, ChevronRight, LineChart, MessageSquare, MessagesSquare, Radio, Search, SearchCode, Signal, Sparkles, TrendingUp, Zap } from "lucide-react"
import { MovingIntegrations } from "@/components/moving-integrations"
// import MailPage from "@/app/examples/mail/page"

import demoPic from "@/public/images/latest-product.png"

import burningMoney from "@/public/images/burning-money.gif"

import { Code } from "@/components/code";
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import GetDemoButton from "@/components/get-demo"
import { use, useEffect, useRef } from "react"


const customers = [
  // {
  //   logo: "/images/openai.svg",
  //   className: "h-28 w-28"
  // },
  // {
  //   logo: "/images/mercedes.svg",
  // },
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
  // {
  //   logo: "/images/tesla.svg",
  //   className: "h-28 w-28"
  // },
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


const integrations1 = [
  {
    logo: "/images/integrations/aws.svg",
    label: "AWS",
    imgCss: 'pr-2'
  },
  {
    logo: "/images/integrations/vercel_avatar.svg",
    label: "Vercel",
    logoColor: 'bg-white'
  },
  {
    logo: "/images/integrations/kubernetes_avatar.svg",
    label: "Kubernetes",
  },
  {
    logo: "/images/integrations/pg_avatar.svg",
    label: "Postgres",
  },
  {
    logo: "/images/integrations/openai_avatar.svg",
    label: "OpenAI",
  },
  {
    logo: "/images/integrations/supabase-icon.svg",
    label: "Supabase",
  },
  {
    logo: "/images/integrations/redis_avatar.svg",
    label: "Redis",
  },
  {
    logo: "/images/integrations/rum-javascript_avatar.svg",
    label: "Javascript",
  },
  {
    logo: "/images/integrations/go_avatar.svg",
    label: "Go",
  },
  {
    logo: "/images/integrations/otel_avatar.svg",
    label: "OpenTelemetry",
  },
  {
    logo: "/images/integrations/kafka_avatar.svg",
    label: "Kafka",
  },
  {
    logo: "/images/integrations/rum-react_avatar.svg",
    label: "Vercel",
  },
  {
    logo: "/images/integrations/azure_avatar.svg",
    label: "Azure",
  },
  {
    logo: "/images/integrations/docker_avatar.svg",
    label: "Docker",
  },
  {
    logo: "/images/integrations/notion_avatar.svg",
    label: "Notion",
  },
  {
    logo: "/images/integrations/pulumi_avatar.svg",
    label: "Pulumi",
  },
  {
    logo: "/images/integrations/backstage_avatar.svg",
    label: "Backstage",
  },
  {
    logo: "/images/integrations/mysql_avatar.svg",
    label: "Mysql",
  },
  {
    logo: "/images/integrations/scylla_avatar.svg",
    label: "Scylla",
  },
  {
    logo: "/images/integrations/amazon-eks_avatar.svg",
    label: "EKS",
  },
]
const integrations2 = [
  {
    logo: "/images/integrations/upstash_avatar.svg",
    label: "Upstash",
  },
  {
    logo: "/images/integrations/slack_avatar.svg",
    label: "Slack",
  },
  {
    logo: "/images/integrations/github_avatar.svg",
    label: "Github",
  },
  {
    logo: "/images/integrations/nginx_avatar.svg",
    label: "Nginx",
  },
  {
    logo: "/images/integrations/stripe_avatar.svg",
    label: "Stripe",
  },
  {
    logo: "/images/integrations/terraform_avatar.svg",
    label: "Terraform",
  },
  {
    logo: "/images/integrations/jenkins_avatar.svg",
    label: "Jenkins",
  },
  {
    logo: "/images/integrations/google-cloud-platform_avatar.svg",
    label: "GCP",
  },
  {
    logo: "/images/integrations/clickhouse_avatar.svg",
    label: "Clickhouse",
  },
  {
    logo: "/images/integrations/k6_avatar.svg",
    label: "K6",
  },
  {
    logo: "/images/integrations/llamaindex.webp",
    label: "LlamaIndex",
  },
  {
    logo: "/images/integrations/lighthouse_avatar.svg",
    label: "Lighthouse",
  },
  {
    logo: "/images/integrations/prometheusio-icon.svg",
    label: "Prometheus",
  },
]

export default function IndexPage() {

  // bash snippet fibbonacci
  const install = `
\`\`\`bash
npm i @opentelemetry/api @infrastackai/otel
\`\`\``;

  const instrument = `
  \`\`\`bash
# Install SDKs
npm i @opentelemetry/api @infrastackai/otel
\`\`\`
\`\`\`javascript

// Create an instrumentation.ts file in the root of your project
import { init } from '@infrastackai/otel';
import { openAI, redis, postgres } from '@infrastackai/otel/instrument';

export function register() { 
  init({ serviceName: 'your-service-name', apiKey: 'your-api-key',
    instrumentations: [new openAI(), new redis(), new postgres()]
  });
}
\`\`\``;

  const instrumentMobile = `
\`\`\`bash
# Install SDKs
npm i @opentelemetry/api @infrastackai/otel
\`\`\`
\`\`\`javascript

// Create an instrumentation.ts file 
// in the root of your project
import { init } from '@infrastackai/otel';
import { openAI, redis, postgres } from 
  '@infrastackai/otel/instrument';

export function register() { 
  init({ 
    serviceName: 'your-service-name', 
    apiKey: 'your-api-key',
    instrumentations: [
      new openAI(), new redis(), 
      new postgres(),
    ]
  });
}
\`\`\`
`

  return (

    <div className="container relative">
      <PageHeader className="relative dark:bg-dot-white/[0.2] bg-dot-black/[0.2] rounded-full">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_1%,#09090b)]"></div>
        {/* <Announcement /> */}
        {/* <iframe className="bg-transparent h-60" src='https://my.spline.design/untitled-7aa2af24d18f7d296b43cefbb501a930/' frameborder='0' width='100%' height='100%'></iframe>        <Announcement /> */}
        <div className="top-20 blur-3xl bg-indigo-500/30 h-32 w-52 absolute"></div>
        <PageHeaderHeading className="z-[60] text-zinc-200 mt-4 ">AI-Powered Application Intelligence Platform</PageHeaderHeading>
        <PageHeaderDescription className="z-[60] text-lg md:text-2xl font-semibold mt-2 text-center text-zinc-200">
          <p className="hidden md:block ">Understand Application Behaviors & User Journeys Instantly.</p>
          <p className="md:hidden">Understand Application Behaviors & User Journeys Instantly.</p>
        </PageHeaderDescription>
        <PageActions className="mt-2 items-start">
          {/* <Link href="/docs" className={cn(buttonVariants())}>
            Get Started
          </Link> */}
          {/* <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Get started with InfraStack AI
          </Link> */}
          <Link className="relaive items-center flex flex-col space-y-1 z-[60]" href="https://app.infrastack.ai/api/auth/login" prefetch={false}>
            {/* <ButtonMoving
              borderRadius="0.6rem"
              containerClassName='z-[60] w-[180px] md:w-[220px] h-[60px] mt-[-1px] rounded-sm dark:bg-zinc-900'
              className="md:text-lg z-50 font-semibold dark:hover:bg-zinc-900 dark:bg-infrastack bg-infrastack text-black dark:text-green-400 border-neutral-200 dark:border-zinc-800 "
            >
              Get Started Free
            </ButtonMoving> */}
            <Button
              variant={"outline"}
              className={cn("text-white dark:hover:bg-indigo-800 bg-indigo-600 dark:md:text-lg border-zinc-800 dark:border-[1px] dark:border-solid z-50 h-[56px] w-[180px] md:w-[220px] rounded-lg")}
            >Get Started Free</Button>
            <p className="text-muted-foreground text-sm">No credit card required</p>
          </Link>
          {/* <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn("dark:text-base dark:border-slate-300 dark:border-[1px] dark:border-solid z-50", buttonVariants({ variant: "outline" }))}
          >
            Get a Demo
          </Link> */}
          {/* <GetDemoButton /> */}
        </PageActions>
        {/* <div className="flex flex-col items-center justify-center z-[60]">
          <div className=" shadow-inner rounded-xl px-4 text-center p-2 pl-4 pr-4 text-2xl"><span className="text-green-400 text-2xl md:text-4xl font-bold">1B+ <BarChart4 className="h-5 w-5 md:h-9 md:w-9 inline" /></span><br></br><span className="text-xl md:text-3xl">Traces Proceessed</span></div>
          <div className=" shadow-inner rounded-xl px-4 text-center p-2 pl-4 pr-4 text-2xl"><span className="text-green-400 text-2xl md:text-4xl font-bold">1K+ Dev Hours Saved <Sparkles className="h-5 w-5 md:h-9 md:w-9 inline" /></span><br></br><span className="text-xl md:text-3xl">By InfraStack AI</span></div>
        </div> */}
      </PageHeader>
      {/* <ExamplesNav className="[&>a:first-child]:text-primary pl-6 pr-6 i" /> */}
      {/* <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </section> */}
      <section className="">
        {/* <div className="overflow-hidden h-fit rounded-lg riolng-1 ring-zinc-900 bg-background p-0"> */}
        {/* <MailPage /> */}
        {/* <Image priority src={demoPic} alt="InfraStack AI Demo" quality={100} className="mt-4 border border-indigo-700 rounded-lg drop-shadow-2" /> */}
        {/* </div> */}
      </section>
      {true && <div className="w-full md:mt-20 mt-20 relative" id="featuresContainerId">
        <div className="m-auto left-0 right-0 top- blur-3xl bg-indigo-800/20 h-52 w-full absolute z-40"></div>
        <div className="w-full text-center">
          <div className="flex flex-col space-y- items-center justify-center h-0">
            {/* <div className=" shadow-inner rounded-xl px-4 text-center p-2 pl-4 pr-4 text-2xl "><span className="text-4xl text-green-400">1K+</span><br></br>Users signed up</div> */}
            {/* <div className=" shadow-inner rounded-xl px-4 text-center p-2 pl-4 pr-4 text-2xl"><span className="text-green-400 text-4xl font-bold">200M+ <BarChart4 className="h-10 w-10 inline" /></span><br></br>Traces Proceessed</div>
            <div className=" shadow-inner rounded-xl px-4 text-center p-2 pl-4 pr-4 text-2xl"><span className="text-green-400 text-4xl font-bold">1K+ Human Hours <Sparkles className="h-10 w-10 inline" /></span><br></br>Saved by InfraStack AI Copilots</div> */}
            {/* <div className="text text-3xl md:text-5xl p-2 mt- font-bold bg-gradient-to-r from-[#5865F2] to-green-400 inline-block text-transparent bg-clip-text z-[60]">Loved By Next-Gen Developers</div> */}
            <div className="text text-[26px] md:text-5xl p-2 mt- font-semibold bg-gradient-to-r from-[#5865F2] to-green-400 inline-block text-transparent bg-clip-text z-[60]">Loved By Modern Teams <br></br>and Developers</div>

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
      }

      <div className=" md:hidden">
        <div className="w-full text-center mt-20 md:mt-24">
          <p className="text-[28px] md:text-5xl font-bold text-zinc-200">Getting Started is Simple</p>
          <p className="text-zinc-500 mt-2  md:text-lg">Choose Your Application Stacks and Gain Insights in Minutes</p>
        </div>
        <div className="w-full flex flex-row space-x-4 items-center justify-center mt-8">
          <Link href="https://docs.infrastack.ai/integrations/nextjs" target="_blank" prefetch={false}>
            <div className="group h-28  cursor-pointer flex w-32 flex-col items-center justify-center rounded-xl border  hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconNextJs className="w-8 h-8  bg-infrastack    p-1 rounded-full" />
              <p className="font-medium mt-2">Next.js</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/fastapi" target="_blank" prefetch={false}>
            <div className="group h-28 cursor-pointer flex w-32 flex-col items-center justify-center rounded-xl border  hover:border-indigo-600  bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconFastAPI className="w-8 h-8  bg-infrastack   rounded-full" />
              <p className="font-medium mt-2">FastAPI</p>
            </div>
          </Link>
        </div>
        <div className="w-full flex flex-row space-x-4 justify-center mt-3">
          <Link href="https://docs.infrastack.ai" target="_blank" prefetch={false}>
            <p className="font-medium mt-4 text-zinc-400 items-center underline">View all integrations</p>
          </Link>
        </div>
      </div>

      <div className="hidden md:block mt-20 md:mt-32">
        <div className="w-full text-center">
          <p className="font-semibold text-zinc-200 text-[26px] md:text-5xl">Getting Started is Simple</p>
          <p className="text-zinc-500 mt-2  md:text-lg">Choose Your Application Stacks and Gain Insights in Minutes</p>
        </div>

        <div className="w-full flex flex-row space-x-4 items-center justify-center mt-8">
          <Link href="https://docs.infrastack.ai/integrations/nextjs" target="_blank" prefetch={false}>
            <div className="group h-26  cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border  hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconNextJs className="w-10 h-10  bg-infrastack    p-1 rounded-full" />
              <p className="font-medium mt-2">Next.js</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/expressjs" target="_blank" prefetch={false}>
            <div className="h-26cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border  hover:border-indigo-600 bg-infrastack hover:bg-muted/50  text-card-foreground shadow transition-colors sm:p-6">
              <Icons.IconExpressJS className="w-10 h-10  bg-white text-infrastack p-1 rounded-xl" />
              <p className="font-medium mt-2">Express.js</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/fastapi" target="_blank" prefetch={false}>
            <div className="group h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border  hover:border-indigo-600  bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconFastAPI className="w-10 h-10  bg-infrastack   rounded-full" />
              <p className="font-medium mt-2">FastAPI</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/django" target="_blank" prefetch={false}>
            <div className="group h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border    hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconDjango className="w-10 h-10  bg-infrastack  rounded-full" />
              <p className="font-medium mt-2">Django</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations" target="_blank" prefetch={false}>
            <div className="h-[123px] w-36 cursor-pointer flex flex-col items-center justify-center rounded-xl border  bg-infrastack text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-6">
              <p className="font-medium mt-2 text-green-400">+2 more</p>
            </div>
          </Link>
        </div>
        <div className="w-full flex flex-row space-x-4 justify-center mt-3">
          <Link href="https://docs.infrastack.ai/integrations/golang" target="_blank" prefetch={false}>
            <div className="group h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border    hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconGoLang className="w-10 h-10  bg-infrastack  rounded-full" />
              <p className="font-medium mt-2">Go Lang</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/python" target="_blank" prefetch={false}>
            <div className="group h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border   hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconPython className="w-10 h-10  bg-infrastack    p-1 rounded-full" />
              <p className="font-medium mt-2">Python</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/java" target="_blank" prefetch={false}>
            <div className="h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border   hover:border-indigo-600 bg-infrastack hover:bg-muted/50  text-card-foreground shadow transition-colors sm:p-6">
              <Icons.IconJava className="w-10 h-10  bg-white text-infrastack p-1 rounded-xl" />
              <p className="font-medium mt-2">Java</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/net" target="_blank" prefetch={false}>
            <div className="group h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border    hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconDotNet className="w-10 h-10  bg-infrastack   rounded-full" />
              <p className="font-medium mt-2">.Net</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/ruby" target="_blank" prefetch={false}>
            <div className="group h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border     hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconRuby className="w-10 h-10  bg-infrastack  rounded-full" />
              <p className="font-medium mt-2">Ruby</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations" target="_blank" prefetch={false}>
            <div className="h-[123px] w-36 cursor-pointer flex flex-col items-center justify-center rounded-xl border  bg-infrastack text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-6">
              <p className="font-medium mt-2 text-green-400">+4 more</p>
            </div>
          </Link>
        </div>
        <div className="w-full flex flex-row space-x-4 justify-center mt-3">
          <Link href="https://docs.infrastack.ai/integrations/postgres" target="_blank" prefetch={false}>
            <div className="group h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border    hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconPostgres className="w-10 h-10  bg-infrastack  rounded-full" />
              <p className="font-medium mt-2">Postgres</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/redis" target="_blank" prefetch={false}>
            <div className="group h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border   hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconRedis className="w-10 h-10  bg-infrastack    p-1 rounded-full" />
              <p className="font-medium mt-2">Redis</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/openai" target="_blank" prefetch={false}>
            <div className="h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border   hover:border-indigo-600 bg-infrastack hover:bg-muted/50  text-card-foreground shadow transition-colors sm:p-6">
              <Icons.IconOpenAI className="w-10 h-10  bg-white text-infrastack p-1 rounded-xl" />
              <p className="font-medium mt-2">OpenAI</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations/pinecone" target="_blank" prefetch={false}>
            <div className="group h-26 cursor-pointer flex w-36 flex-col items-center justify-center rounded-xl border    hover:border-indigo-600 bg-infrastack hover:bg-muted/50 text-card-foreground shadow transition-colors  sm:p-6">
              <Icons.IconPinecone className="w-10 h-10  bg-infrastack   rounded-full" />
              <p className="font-medium mt-2">Pinecone</p>
            </div>
          </Link>
          <Link href="https://docs.infrastack.ai/integrations" target="_blank" prefetch={false}>
            <div className="h-[123px] w-36 cursor-pointer flex flex-col items-center justify-center rounded-xl border  bg-infrastack text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-6">
              <p className="font-medium mt-2 text-green-400">+8 more</p>
            </div>
          </Link>
        </div>
        <div className="w-full flex flex-row space-x-4 justify-center mt-3">
          <Link href="https://docs.infrastack.ai" target="_blank" prefetch={false}>
            <p className="font-medium mt-4 text-zinc-400 items-center underline">View all integrations</p>
          </Link>
        </div>
      </div>

      <div className="w-full text-center text-[28px] md:text-5xl font-bold text-zinc-200 mt-16 md:mt-40">
        <p className="">Supercharge Your Developers<br></br>with Intelligent Tooling</p>
      </div>

      <div className="relative container w-fit  gap-x-6 gap-y-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3  py-10">
        {/* <div className="m-auto left-0 right-0 top-56 blur-3xl bg-indigo-700/20 h-44 w-full absolute z-20"></div> */}
        <div className="relative md:w-80 md:h-72 border border-zinc-800 rounded-xl p-6 flex flex-col items-center pt-8 space-y-2 shadow-inner  shadow-zinc-900">
          <div className="m-auto left-0 right-0 top-[14px] blur-xl bg-indigo-700/30 rounded-full h-24 w-24 absolute z-20">
          </div>
          <div className=" bg-gradient-to-br from-green-400 via-[#5865F2] to-[#EB459E] p-[3px] rounded-full  bg-zinc-950 ">
            <div className="h-full w-full bg-zinc-950 p-2 rounded-full">
              <Search className="md:h-fit md:w-fit w-6 h-6 bg-zinc-950 p-1 md:p-2" />
            </div>
          </div>
          <p className="w-full text-lg md:text-xl text-zinc-200 pt-2">
            Natural Language Search
          </p>
          <p className="text-zinc-600 md:text-lg">Ask questions in any language and get instant insights from your telemetry data.</p>
        </div>
        <div className="relative md:w-80 md:h-72 border border-zinc-800 rounded-xl p-6 flex flex-col items-center pt-8 space-y-2 shadow-inner  shadow-zinc-900">
          <div className="m-auto left-0 right-0 top-[14px] blur-xl bg-indigo-700/30 rounded-full h-24 w-24 absolute z-20">
          </div>
          <div className="bg-gradient-to-bl from-green-400 via-[#5865F2] to-[#EB459E] p-[3px] rounded-full  bg-zinc-950 ">
            <div className="h-full w-full bg-zinc-950 p-2 rounded-full">
              <Sparkles className="md:h-fit md:w-fit w-6 h-6 bg-zinc-950 p-1 md:p-2" />
            </div>
          </div>
          <p className="w-full text-lg md:text-xl text-zinc-200 pt-2">
            Agentic AI Workflows
          </p>
          <p className="text-zinc-600 md:text-lg">
            Use AI to handle complex tasks quickly and easily, so you can focus on what matters most.
          </p>
        </div>
        <div className="relative md:w-80 md:h-72 border border-zinc-800 rounded-xl p-6 flex flex-col items-center pt-8 space-y-2 shadow-inner  shadow-zinc-900">
          <div className="m-auto left-0 right-0 top-[14px] blur-xl bg-indigo-700/30 rounded-full h-24 w-24 absolute z-20">
          </div>
          <div className="bg-gradient-to-bl from-green-400 via-[#5865F2] to-[#EB459E] p-[3px] rounded-full  bg-zinc-950 ">
            <div className="h-full w-full bg-zinc-950 p-2 rounded-full">
              <LineChart className="md:h-fit md:w-fit w-6 h-6 bg-zinc-950 p-1 md:p-2" />
            </div>
          </div>
          <p className="w-full text-lg md:text-xl text-zinc-200 pt-2">
            Charts and Dashboards
          </p>
          <p className="text-zinc-600 md:text-lg">
            Live charts and dashboards are dynamically generated based on your application stacks.
          </p>
        </div>
        <div className="relative md:w-80 md:h-72 border border-zinc-800 rounded-xl p-6 flex flex-col items-center pt-8 space-y-2 shadow-inner  shadow-zinc-900 ">
          <div className="m-auto left-0 right-0 top-[14px] blur-xl bg-indigo-700/30 rounded-full h-24 w-24 absolute z-20">
          </div>
          <div className="bg-gradient-to-tr from-green-400 via-[#5865F2] to-[#EB459E] p-[3px] rounded-full  bg-zinc-950 ">
            <div className="h-full w-full bg-zinc-950 p-2 rounded-full">
              <Signal className="md:h-fit md:w-fit w-6 h-6 bg-zinc-950 p-1 md:p-2" />
            </div>
          </div>
          <p className="w-full text-lg md:text-xl text-zinc-200 pt-2">
            Application and Analytics Telemetry Data
          </p>
          <p className="text-zinc-600 md:text-lg">
            Only the most useful telemetry data seamlessly integrated on one platform.
          </p>
        </div>
        <div className="relative md:w-80 md:h-72 border border-zinc-800 rounded-xl p-6 flex flex-col items-center pt-8 space-y-2 shadow-inner  shadow-zinc-900">
          <div className="m-auto left-0 right-0 top-[14px] blur-xl bg-indigo-700/30 rounded-full h-24 w-24 absolute z-20">
          </div>
          <div className="bg-gradient-to-r from-green-400 via-[#5865F2] to-[#EB459E] p-[3px] rounded-full  bg-zinc-950 ">
            <div className="h-full w-full bg-zinc-950 p-2 rounded-full">
              <Zap className="md:h-fit md:w-fit w-6 h-6 bg-zinc-950 p-1 md:p-2" />
            </div>
          </div>
          <p className="w-full text-lg md:text-xl text-zinc-200 pt-2">
            Quick Start Guides
          </p>
          <p className="text-zinc-600 md:text-lg">
            Get started in minutes with our quick start guides tailored to your application stacks.
          </p>
        </div>
        <div className="relative md:w-80 md:h-72 border border-zinc-800 rounded-xl p-6 flex flex-col items-center pt-8 space-y-2 shadow-inner  shadow-zinc-900">
          <div className="m-auto left-0 right-0 top-[14px] blur-xl bg-indigo-700/30 rounded-full h-24 w-24 absolute z-20">
          </div>
          <div className="bg-gradient-to-tl from-green-400 via-[#5865F2] to-[#EB459E] p-[3px] rounded-full  bg-zinc-950 ">
            <div className="h-full w-full bg-zinc-950 p-2 rounded-full">
              <MessagesSquare className="md:h-fit md:w-fit w-6 h-6 bg-zinc-950 p-1 md:p-2" />
            </div>
          </div>
          <p className="w-full text-lg md:text-xl text-zinc-200 pt-2">
            Slack & Discord
          </p>
          <p className="text-zinc-600 md:text-lg w-full">
            Receive timely and actionable notifications directly within your preferred productivity platform.
          </p>
        </div>
      </div>

      {/* <MovingIntegrations
          items={integrations1}
          direction="left"
          speed="slow"
        />
        <br></br>
        <MovingIntegrations
          items={integrations2}
          direction="right"
          speed="slow"
        /> */}

      {false && <div className="w-full text-center mt-32  md:mt-24">
        <p className="text-[26px] md:text-5xl font-semibold text-zinc-200">Built on Open Source <br></br>& Open Standards</p>
        <p className="text-zinc-500 mt-2 md:text-lg">Have full ownership and control of your telemetry data</p>
      </div>}

      {false && <div className="container w-fit max-w-[800px] gap-x-5 gap-y-4 md:gap-y-0 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  py-10">
        <div className="md:h-72 border border-zinc-800 rounded-xl p-6 shadow-inner  shadow-zinc-900">
          <Image src="/images/integrations/otel_avatar.svg" alt="InfraStack AI OpenTelemetry" width={40} height={40} />

          <p className="w-full text-lg md:text-xl text-zinc-200 mt-4">OpenTelemetry</p>
          <p className="text-zinc-500 mt-4 md:">
            OpenTelemetry is an open-source and vendor-neutral project, adopted and supported by industry leaders in the observability space.
          </p>
        </div>
        {/* <div className="md:h-72 border border-zinc-800 rounded-xl p-6 shadow-inner  shadow-zinc-900">

          <Image src="/images/integrations/prometheusio-icon.svg" alt="InfraStack AI Demo" width={38} height={38} />

          <p className="w-full text-lg md:text-xl text-zinc-200 mt-4">Prometheus</p>
          <p className="text-zinc-500 mt-4">
            Prometheus is an open-source, community-driven monitoring tool, widely used for its robust data model and query language.
          </p>
        </div> */}
        <div className="md:h-72 border border-zinc-800 rounded-xl p-6 shadow-inner  shadow-zinc-900">

          <Image src="/images/integrations/clickhouse.svg" alt="InfraStack AI Clickhouse" width={38} height={38} />

          <p className="w-full text-lg md:text-xl text-zinc-200 mt-4">Clickhouse</p>
          <p className="text-zinc-500 mt-4">
            ClickHouse is an open-source, high-performance columnar database system, embraced and supported by industry leaders in data analytics.
          </p>
        </div>
      </div>}

      <div className="relative mt-60 md:mt-80 pt-20 md:p-20">
        <div className="h-64 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] w-full absolute top-[-210px] m-auto left-0 right-0 z-50">
          <InfraStackLogo3D />
          <div className="m-auto left-0 right-0 top-0 blur-3xl bg-indigo-700/20 h-60 w-full absolute z-30 rounded-2xl"></div>
          <div className="absolute pointer-events-none inset-0 z-0 dark:bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_1%,#09090b)]"></div>
        </div>

        {/* <div className="m-auto left-0 right-0 top-16 blur-3xl bg-indigo-700/20 h-80 w-full absolute z-30 rounded-xl"></div> */}
        <div className="w-full text-center text-[26px] md:text-5xl font-semibold text-white z-10 absolute left-0 right-0 m-auto top-10">
          <p className="text-white">Join the Community</p>
          <p className="text-zinc-500 mt-2 hidden md:block text-lg">
            Create your first PR on GitHub, help us with our<br></br>roadmap or discuss InfraStack AI on Discord
          </p>
          <p className="text-zinc-500 mt-2  md:hidden text-base">
            Create your first PR on GitHub, help us with our roadmap or discuss InfraStack AI on Discord
          </p>
        </div>
        <div className="container w-fit grid gap-y-4 gap-x-4  grid-cols-1 md:grid-cols-1  lg:grid-cols-3  py-12 mt-12 md:mt-16">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div className="cursor-pointer min-w-[240px] md:w-48 h-22 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70">
              <div className=""><Icons.gitHub className="h-8 w-8 fill-current" /></div>
            </div>
          </Link>
          <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
            <div className="cursor-pointer min-w-[240px] md:w-48 h-22 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-2 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 opacity-70">
              <div className=""><Icons.twitter className="h-8 w-8 fill-current" /></div>
            </div>
          </Link>
          <Link href={siteConfig.links.discord} target="_blank" rel="noreferrer">
            <div className="cursor-pointer min-w-[240px] md:w-48 h-22 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-70">
              <div className=""><Icons.discord className="h-8 w-8" /></div>
            </div>
          </Link>
        </div>

      </div>

      <div className="md:mt-20 mt-10  w-[20] relative">

        <div className="w-full text-center text-[26px] md:text-5xl font-semibold text-white">
          <p>Backed By</p>
        </div>
        <div className="container w-fit gap-x-5 gap-y-4 md:gap-y-4 grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 py-4  md:py-10">
          <div className="w-64 h-22 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-2 shadow-inner  shadow-zinc-900">
            <div className="hidden md:block">
              <Image src="/images/partners/nvidia.png" alt="NVIDIA" width={84} height={72} />
            </div>
            <div className="md:hidden">
              <Image src="/images/partners/nvidia.png" alt="NVIDIA" width={64} height={42} />
            </div>
          </div>
          <div className="w-64 h-22 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-2 shadow-inner  shadow-zinc-900">
            <div className="hidden md:block">
              <Image src="/images/partners/microsoft.webp" alt="NVIDIA" width={160} height={72} />
            </div>
            <div className="md:hidden">
              <Image src="/images/partners/microsoft.webp" alt="NVIDIA" width={160} height={42} />
            </div>
          </div>
          {/* <div className="w-64 h-22 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-2 shadow-inner  shadow-zinc-900">
            <Image src="/images/partners/finc.png" alt="Founders.Inc" width={150} height={100} />
          </div> */}

        </div>
      </div>

    </div>
  )
}