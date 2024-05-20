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
                    We aim to make observability limitless and easy for every developer.
                </p>
                <p className="mt-12 text-lg text-zinc-400">
                    <span className="font-semibold text-left text-zinc-300">About InfraStack AI</span>
                    <br></br>Our journey began through firsthand experience with the challenges of managing development teams, compounded by the lack of sophisticated tools necessary to effectively identify and address the complexities inherent in modern cloud-native systems. This journey has shaped our mission: to pioneer a new epoch in observability.

                    <br></br>
                    <br></br>
                    Our vision is to replace antiquated monitoring systems with a next-generation observability copilot. This innovative copilot is designed to empower developers with unparalleled insights, enabling them to swiftly diagnose and resolve issues, foster rapid innovation, and bolster system robustness. At the core of this transformation is artificial intelligence, driving the evolution towards a more resilient, efficient, and forward-thinking digital infrastructure.
                </p>
                <h1 className="font-semibold text-lg text-left text-zinc-300 mt-12">Meet our team</h1>
                <div className="flex flex-col space-y-2 text-zinc-400">
                    <div className="mt-2"><Link href="https://www.linkedin.com/in/aykutgk/" target="_blank" className="text-indigo-500">Aykut Gedik</Link> - Founder</div>
                    <div><Link href="https://www.linkedin.com/in/frank-kuehnel-74a191/" target="_blank" className="text-indigo-500">Frank Kuehnel</Link> - Data Science</div>
                    <div><Link href="https://www.linkedin.com/in/keremkocer/" target="_blank" className="text-indigo-500">Kerem Kocer</Link> - Head of Product</div>
                    <div><Link href="https://www.linkedin.com/in/receperdg/" target="_blank" className="text-indigo-500">Recep Erdogan</Link> - Infrastructure Engineer</div>
                    <div><Link href="https://www.linkedin.com/in/buketalkan/" target="_blank" className="text-indigo-500">Buket Alkan</Link> - Software Engineer Intern</div> 
                    <div><Link href="https://www.linkedin.com/in/leon-krick-2170a1302/" target="_blank" className="text-indigo-500">Leon Krick</Link> - Data Science Intern</div> 
                    <div><Link href="https://www.linkedin.com/in/emre-kocer/" target="_blank" className="text-indigo-500">Emre Kocer</Link> - Data Science Intern</div>
                    <div><Link href="https://www.linkedin.com/in/caglakirdar/" target="_blank" className="text-indigo-500">Cagla Kırdar</Link> - Data Science Intern</div>
                    <div><Link href="https://www.linkedin.com/in/mso96/" target="_blank" className="text-indigo-500">Sefa Oruc</Link> - Marketing & Sales Engineer</div>
                    <div><Link href="https://www.linkedin.com/in/aliuygarkucukemre/" target="_blank" className="text-indigo-500">Ali Uygar Kucukemre</Link> - Solutions Architect</div>
                    <div><Link href="https://www.linkedin.com/in/delly-tamer/" target="_blank" className="text-indigo-500">Delly Tamer</Link> - Operations Advisor</div>
                </div>

                <h1 className="font-semibold text-lg text-left text-zinc-300 mt-12">Where we work from</h1>
                <div className="flex flex-col space-y-2 text-zinc-400 mb-4">
                    <p className="mt-2 mb-4">We are located in Fort Mason, a stone’s throw from San Francisco’s Golden Gate Bridge.
                    </p>
                    <Image src={fortMason} className="object-fit rounded-lg" alt="Fort Mason" />
                </div>

                <Link href="https://www.linkedin.com/company/infrastack-ai" target="_blank" className="text-indigo-500 mt-8 mb-12 text-lg">We are hiring! Check out our open roles <ArrowUpRightFromSquare className="inline h-5" /></Link>
            </div>

        </div>
    )
}