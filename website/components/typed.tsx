'use client'

import React, { useEffect, useMemo, useRef, useState } from "react"
import Typed from 'typed.js';


export default function TypedHeader() {
    const ref = useRef(null);

    useEffect(() => {
        const typed = new Typed(ref.current, {
            strings: ['<span class="text-green-400">NextJS</span>', '<span class="text-yellow-400">FastAPI</span>', '<span class="text-indigo-400">Gen-AI</span>'],
            cursorChar: '',
            typeSpeed: 50,
            backDelay: 3000,
            startDelay: 1000,
            loop: true,
            fadeOut: true,
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 100,
        });
        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
          };
    }, [])

    return (
        <span ref={ref}></span>
    )
}