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
import { buttonVariants } from "@/components/ui/button"
import { InfraStackLogo3D } from "@/components/3d-logo"
import { InfiniteMovingCards } from "@/components/infinite-moving-cards"
import { ArrowUp, MessageSquare, MessagesSquare, Radio, Search, SearchCode, Signal, Sparkles, Zap } from "lucide-react"
import { MovingIntegrations } from "@/components/moving-integrations"
// import MailPage from "@/app/examples/mail/page"

import demoPic from "@/public/images/p12.png"

import burningMoney from "@/public/images/burning-money.gif"

import { Code } from "@/components/code";
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import GetDemoButton from "@/components/get-demo"
import { use, useEffect, useRef } from "react"


const customers = [
  {
    logo: "/images/openai.svg",
  },
  {
    logo: "/images/duolingo.svg",
  },
  {
    logo: "/images/tesla.svg",
  },
  // {
  //   logo: "/images/mercedes.svg",
  // },
  {
    logo: "/images/vercel.svg",
  },
  {
    logo: "/images/shopify.svg",
  },
  {
    logo: "/images/stripe.svg",
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
  init({ serviceName: 'your-service-name', apiKey: 'your-api-key'});
  openAI(); redis(); postgres();
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
    apiKey: 'your-api-key'
  });
  openAI(); redis(); postgres();
}
\`\`\`
`

  return (

    <div className="container relative">
      <PageHeader className="relative dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_1%,#09090b)]"></div>
        <Announcement />
        {/* <iframe className="bg-transparent h-60" src='https://my.spline.design/untitled-7aa2af24d18f7d296b43cefbb501a930/' frameborder='0' width='100%' height='100%'></iframe>        <Announcement /> */}
        <div className="top-32 blur-3xl bg-indigo-500/30 h-32 w-52 absolute"></div>
        <PageHeaderHeading className="z-[60] text-zinc-200 mt-4">AI-Powered<br></br>Observability Copilot</PageHeaderHeading>
        <PageHeaderDescription className="z-[60] text-zinc-300">
          <p>Stop <Image className="inline mb-3" src={burningMoney} width={30} height={30} alt="burning money"></Image> on legacy monitoring</p>
          Pinpoint performance bottlenecks, debug issues, and root causes, and get actionable insights within milliseconds
        </PageHeaderDescription>
        <PageActions>
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
          <Link href="https://us1.infrastack.dev/">
            <ButtonMoving
              borderRadius="0.6rem"
              containerClassName='z-[60] w-[180px] md:w-[220px] h-[45px] mt-[-1px] rounded-sm dark:bg-zinc-950'
              className="md:text-lg z-50 bg-white dark:hover:bg-zinc-900 dark:bg-zinc-950 text-black dark:text-white border-neutral-200 dark:border-zinc-800 "
            >
              Try InfraStack AI
            </ButtonMoving>
          </Link>
          {/* <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn("dark:text-base dark:border-slate-300 dark:border-[1px] dark:border-solid z-50", buttonVariants({ variant: "outline" }))}
          >
            Get a Demo
          </Link> */}
          <GetDemoButton />
        </PageActions>
      </PageHeader>
      <ExamplesNav className="[&>a:first-child]:text-primary pl-6 pr-6" />
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
      <section className="hidden md:block">

        {/* <div className="overflow-hidden h-fit rounded-lg ring-1 ring-zinc-900 bg-background p-0"> */}
        {/* <MailPage /> */}
        <Image priority src={demoPic} alt="InfraStack AI Demo" quality={100} className="object-center scale-100 mt-4 drop-shadow-2xl " />
        {/* </div> */}
      </section>
      <div className="w-full md:mt-14 relative" id="featuresContainerId">
        <div className="m-auto left-0 right-0 top-6 blur-3xl bg-indigo-800/20 h-40 w-full absolute z-40"></div>
        {/* <div className="w-full text-center">
          <p className="text text-zinc-200 text-2xl">Trusted by developers at</p>
        </div> */}
        {/* <div className="w-full mt-4 hidden md:block">
          <InfiniteMovingCards
            items={customers}
            direction="left"
            speed="slow"
          />
        </div> */}
      </div>
      <div className="w-full text-center text-[26px] md:text-5xl font-semibold text-zinc-200 mt-18 md:mt-44">
        <p className="">Supercharge your developers<br></br>with smart observability</p>
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
            Natural Language Querying
          </p>
          <p className="text-zinc-600 md:text-lg">Ask questions in any language and find the needle in the haystack within milliseconds.</p>
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
            Traces, Metrics, and Logs
          </p>
          <p className="text-zinc-600 md:text-lg">
            Only the most useful telemetry data, seamlessly integrated and intelligently correlated.
          </p>
        </div>
        <div className="relative md:w-80 md:h-72 border border-zinc-800 rounded-xl p-6 flex flex-col items-center pt-8 space-y-2 shadow-inner  shadow-zinc-900">
          <div className="m-auto left-0 right-0 top-[14px] blur-xl bg-indigo-700/30 rounded-full h-24 w-24 absolute z-20">
          </div>
          <div className="bg-gradient-to-bl from-green-400 via-[#5865F2] to-[#EB459E] p-[3px] rounded-full  bg-zinc-950 ">
            <div className="h-full w-full bg-zinc-950 p-2 rounded-full">
              <Radio className="md:h-fit md:w-fit w-6 h-6 bg-zinc-950 p-1 md:p-2" />
            </div>
          </div>
          <p className="w-full text-lg md:text-xl text-zinc-200 pt-2">
            Real Time & Dynamic
          </p>
          <p className="text-zinc-600 md:text-lg">
            Live graphs and dashboards are dynamically generated based on the context.
          </p>
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
            Mixture of Expert Copilots
          </p>
          <p className="text-zinc-600 md:text-lg">
            AI Copilots, equipped with specialized knowledge, ready to offer assistance & insights in niche domains.
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
            Get started in minutes with our quick start guides tailored to your application & cloud stack.
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
            Discord & Slack
          </p>
          <p className="text-zinc-600 md:text-lg w-full">
            Receive timely and actionable alerts directly within your preferred productivity platform.
          </p>
        </div>
      </div>

      <div className="">
        <div className="w-full text-center mt-12 md:mt-44">
          <p className="font-semibold text-zinc-200 text-[26px] md:text-5xl">Getting Started is Simple</p>
          <p className="text-zinc-500 mt-2  md:text-lg">Change a couple lines of code, and ask <br className="md:hidden"></br>InfraStack AI to find the pain</p>
          {/* <div className="flex flex-row items-center w-full justify-center">
          <div className="h-[60px] rounded-lg border border-zinc-800 w-[750px] flex flex-row mt-6">
            <div className="grow flex items-center pl-4 text-xl">
              I&apos;d like to<span className="text-green-400 ml-2 mr-2">observe</span>my nextjs app and openai api calls...
            </div>
            <div className="flex items-center justify-center w-14 ">
              <ArrowUp className="h-[26px] w-[26px] text-white " />
            </div>
          </div>
        </div> */}
          <div className="flex flex-row justify-center items-center space-x-2 mt-8">
            <div className="w-6 h-6  text-zinc-800 font-semibold rounded-full flex items-center justify-center bg-green-400">1</div>
            <div className="text-zinc-300 md:text-lg">
              Choose your application stacks
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row space-x-4 items-center justify-center mt-4">
          <div className="border border-zinc-800 rounded-xl p-3 bg-zinc-950 text-sm md:text-base">FastAPI</div>
          <div className="border border-zinc-800 bg-indigo-800 rounded-xl p-3 text-sm md:text-base">Next.JS</div>
          <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-3 hidden md:block text-sm md:text-base">Go</div>
          <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-3 hidden md:block text-sm md:text-base">AWS</div>
          <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-3 text-indigo-400 font-semibold text-sm md:text-base">+8</div>
        </div>
        <div className="w-full flex flex-row space-x-4 justify-center mt-3">
          <div className="border border-zinc-800 bg-indigo-800 rounded-xl p-3 text-sm md:text-base">OpenAI</div>
          <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-3 text-sm md:text-base">Mysql</div>
          <div className="border border-zinc-800 bg-indigo-800 rounded-xl p-3 text-sm md:text-base">Postgres</div>
          <div className="border border-zinc-800 bg-indigo-800 rounded-xl p-3 hidden md:block text-sm md:text-base">Redis</div>
          <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-3 hidden md:block text-sm md:text-base">Pinecone</div>
          <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-3 text-indigo-400 font-semibold text-sm md:text-base">+20</div>
        </div>

        {/* <div className="flex flex-row justify-center items-center space-x-2 mt-8">
        <div className="w-6 h-6 bg-green-400 text-zinc-800 font-semibold rounded-full text-center flex items-center justify-center">2</div>
        <div className="text-zinc-300 text-lg">
          Install OpenTelemetry SDKs
        </div>
      </div>

      <div className="container w-[640px] py-4 prose prose-invert border border-zinc-800 bg-zinc-950 rounded-xl mt-4">
        <Code code={install} />

      </div> */}

        <div className="flex flex-row justify-center items-center space-x-2 mt-12">
          <div className="w-6 h-6 bg-green-400 text-zinc-800 font-semibold rounded-full text-center flex items-center justify-center">2</div>
          <div className="text-zinc-300 md:text-lg">
            Install and instrument
          </div>
        </div>

        <div className="hidden md:block container text-sm md:text-base md:w-[780px]  py-4 prose prose-invert border border-zinc-800 rounded-xl mt-4 shadow-inner">
          <Code code={instrument} />
        </div>

        <div className="md:hidden container text-xs md:text-lg w-[360px] py-4 prose prose-invert border border-zinc-800 rounded-xl mt-4 shadow-inner">
          <Code code={instrumentMobile} />
        </div>

        <div className="flex flex-row justify-center items-center space-x-2 mt-12">
          <div className="w-6 h-6  text-zinc-800 font-semibold rounded-full flex items-center justify-center bg-green-400">3</div>
          <div className="text-zinc-300 md:text-lg">
            Ask InfraStack AI Copilot
          </div>
        </div>

        <div className="flex flex-row items-center w-full justify-center">
          <div className="md:h-[60px] h-[50px] rounded-lg border border-zinc-800 w-[468px] md:w-[600px] flex flex-row mt-4 items-center ">
            <div className="grow pl-4 text-sm hidden md:block md:text-xl">
              <span className="text-green-400">Find</span>&nbsp;the slowest API endpoints, and&nbsp;<span className="text-green-400">explain</span>&nbsp;why...
            </div>
            <div className="grow pl-4 text-sm md:hidden md:text-xl">
              <span className="text-green-400">Find</span>&nbsp;the slowest API endpoints, and&nbsp;<span className="text-green-400">explain</span>&nbsp;why...
            </div>
            <div className="flex items-center justify-center w-14 ">
              <ArrowUp className="h-[26px] w-[26px] text-white " />
            </div>
          </div>
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

      <div className="w-full text-center mt-24  md:mt-48">
        <p className="text-[26px] md:text-5xl font-semibold text-zinc-200">Built on Top of Open Standards</p>
        <p className="text-zinc-500 mt-2 md:text-lg">Have full ownership and control of your telemetry data</p>
      </div>

      <div className="container w-fit max-w-[800px] gap-x-5 gap-y-4 md:gap-y-0 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  py-10">
        <div className="md:h-72 border border-zinc-800 rounded-xl p-6 shadow-inner  shadow-zinc-900">
          <Image src="/images/integrations/otel_avatar.svg" alt="InfraStack AI Demo" width={40} height={40} />

          <p className="w-full text-lg md:text-xl text-zinc-200 mt-4">OpenTelemetry</p>
          <p className="text-zinc-500 mt-4 md:">
            OpenTelemetry is an open-source and vendor-neutral project, adopted and supported by industry leaders in the observability space.
          </p>
        </div>
        <div className="md:h-72 border border-zinc-800 rounded-xl p-6 shadow-inner  shadow-zinc-900">

          <Image src="/images/integrations/prometheusio-icon.svg" alt="InfraStack AI Demo" width={38} height={38} />

          <p className="w-full text-lg md:text-xl text-zinc-200 mt-4">Prometheus</p>
          <p className="text-zinc-500 mt-4">
            Prometheus is an open-source, community-driven monitoring tool, widely used for its robust data model and query language.
          </p>
        </div>
      </div>

      <div className="relative mt-60 md:mt-80 pt-20 md:p-20">
        <div className="md:hidden h-64 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] w-full absolute top-[-210px] m-auto left-0 right-0 z-50">
          <InfraStackLogo3D scale={3} />
          <div className="m-auto left-0 right-0 top-0 blur-3xl bg-indigo-700/20 h-60 w-full absolute z-30 rounded-2xl"></div>
          <div className="absolute pointer-events-none inset-0 z-0 dark:bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_1%,#09090b)]"></div>
        </div>
        <div className="hidden md:block h-64 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] w-full absolute top-[-210px] m-auto left-0 right-0 z-50">
          <InfraStackLogo3D scale={2} />
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
        <div className="container w-fit gap-x-5 gap-y-2 md:gap-y-0 grid grid-cols-1 md:grid-cols-1  lg:grid-cols-1 py-4  md:py-10">
          <div className="w-64 h-22 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-2 shadow-inner  shadow-zinc-900">
            <div className="hidden md:block">
              <Image src="/images/partners/nvidia.png" alt="NVIDIA" width={84} height={72} />
            </div>
            <div className="md:hidden">
              <Image src="/images/partners/nvidia.png" alt="NVIDIA" width={64} height={42} />
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