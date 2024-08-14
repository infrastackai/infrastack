import Link from "next/link";

import fortMason from "@/public/images/fort-mason.png";
import Image from "next/image";
import { ArrowUpRightFromSquare } from "lucide-react";

export default function IndexPage() {
    return (
        <div className="container max-w-[800px] mt-20 items-left flex flex-col">
            <div className="pl-4 pr-4">
                <h1 className="text-4xl md:text-5xl text-zinc-200">About us</h1>
                <p className="mt-12 text-md text-zinc-400">
                    <span className="font-semibold text-lg text-left text-zinc-300">Our Mission</span>
                    <br></br>
                    We aim to create a new category in application monitoring, observability, and user analytics, shaping the future of agentic workflows and next-gen application intelligence.
                </p>
                <p className="mt-12 text-lg text-zinc-400">
                    <span className="font-semibold text-left text-zinc-300">About InfraStack AI</span>
                    <br></br>Our journey began through firsthand experience with the challenges of managing development teams, compounded by the lack of sophisticated tools necessary to effectively identify and address the complexities inherent in modern application stacks. This journey has shaped our mission: to pioneer a new epoch in application intelligence.

                    <br></br>
                    <br></br>
                    Our vision is to replace outdated monitoring systems with a next-generation application intelligence platform. This platform empowers developers with deep insights, helping them quickly find and fix issues, innovate faster, and strengthen system reliability. At the heart of this change is artificial intelligence, making application development smarter and more efficient.
                </p>
                <h1 className="font-semibold text-lg text-left text-zinc-300 mt-12">Meet our team</h1>
                <div className="flex flex-col space-y-2 text-zinc-400">
                    <div className="mt-2"><Link href="https://www.linkedin.com/in/aykutgk/" target="_blank" className="text-indigo-500">Aykut Gedik</Link> - Founder and CEO</div>
                    <div><Link href="https://www.linkedin.com/in/frank-kuehnel-74a191/" target="_blank" className="text-indigo-500">Frank Kuehnel</Link> - Artificial Intelligence and Research</div>
                </div>

                <h1 className="font-semibold text-lg text-left text-zinc-300 mt-12">Where we work from</h1>
                <div className="flex flex-col space-y-2 text-zinc-400 mb-4">
                    <p className="mt-2 mb-4">We are located in Fort Mason, a stone’s throw from San Francisco’s Golden Gate Bridge.
                    </p>
                    <Image src={fortMason} className="object-fit rounded-lg" alt="Fort Mason" />
                </div>

                <Link href="https://infrastackai.notion.site/Careers-at-InfraStack-AI-2f07b3b32b0740c9b16aafa09d7bd864" target="_blank" className="text-indigo-500 mt-8 mb-12 text-lg">We are hiring! Check out our open roles <ArrowUpRightFromSquare className="inline h-5" /></Link>
            </div>

        </div>
    )
}