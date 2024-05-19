import Image from "next/image";
// import { Authors, allAuthors } from "../Authors";

export const BlogHeader = ({
    authors,
    title,
    description,
    date,
    ogImage,
}: {
    authors: [];
    title: string;
    description?: string;
    date?: string;
    ogImage?: string;
}) => (
    <div className="flex flex-col gap-1 items-center my-10 text-center">
        {ogImage &&<div className="mt-4 rounded relative aspect-video overflow-hidden w-full">
         <Image
            src={ogImage}
            className="object-cover transform group-hover:scale-105 transition-transform"
            alt={title}
            fill={true}
            sizes="(min-width: 1024px) 33vw, 100vw"
        />
        </div>}
        <h1 className="font-bold leading-snug text-balance">{title}</h1>
        <p className="text-primary/60 text-xl text-balance">{description}</p>
        <p className="font-semibold">{authors}</p>
        <span className="text-primary/60 text-xs">{date}</span>
        {/* <Authors authors={authors} /> */}
    </div>
);