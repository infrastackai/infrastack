'use client'

import { Application, SPEObject } from '@splinetool/runtime';
import React, { Suspense, useEffect, useRef } from 'react';
// @ts-ignore-start
import anime from 'animejs';
// @ts-ignore-end


const Spline = React.lazy(() => import('@splinetool/react-spline'));




export function InfraStackLogo3D({scale = 2}) {
    const ref = useRef<SPEObject>();
    const [loaded, setLoaded] = React.useState(false);
    const [add, setAdd] = React.useState(false);


    function onMouseHover(splineEvent: any) {
        splineEvent.target
    }

    function onLoad(spline: Application) {
        const obj = spline.findObjectById('706932b3-b7db-4feb-8ddd-d0ff6bc8f321');

        ref.current = obj;
        if (!ref.current) {
            return;
        }
        if (ref.current && ref.current.position) {
            const newPosition = { ...ref.current.position };
            // newPosition.x += 10;
            // newPosition.y += 10;
            // newPosition.z += 30;
            // ref.current.position.x = 30;
            // ref.current.position.y = 35;
            // ref.current.position.z = 0;
            ref.current.scale.x = ref.current.scale.x / scale
            ref.current.scale.y = ref.current.scale.y / scale
            ref.current.scale.z = ref.current.scale.z / scale
            console.log(ref.current)
            setLoaded(true);
            // anime({
            //     targets: ref.current.position,
            //     ...newPosition,
            //     duration: 3000,
            // });
        }
        // spline.setZoom(150);
    }

    useEffect(() => {
        const timeoutId = setInterval(() => {
            if (!ref.current) {
                return;
            }
            const newPosition = { ...ref.current.position};
            const newScale = { ...ref.current.scale};

            if (!add) {
                // newPosition.x += 1;
                newPosition.y += 1;
                newScale.z += 1000
                // newPosition.z += 100;
            } else {
                // newPosition.x -= 1;
                newPosition.y -= 1;
                newScale.z -= 1000
                // newPosition.z -= 100;
            }

            //  anime({
            //     targets: ref.current.position,
            //     y: function() {
            //         return anime.random(0, 4);
            //     },
            //     duration: 1000,
            //     loop: true,
            //     // elasticity: 10,
            //     direction: 'alternate',
            //     // easing: 'spring(10, 80, 100, 2)'
            //     easing: 'easeInOutQuad',
            //     autoplay: true
            // });
            // anime({
            //     targets: ref.current.rotation,
            //     x: function() {
            //         return anime.random(0, 8);
            //     },
            //     duration: 10000,
            //     loop: true,
            //     elasticity: 10,
            //     direction: 'alternate',
            //     easing: 'spring(10, 80, 100, 4)',
            //     // easing: 'easeInOutQuad',
            //     autoplay: true
            // });
            // anime({
            //     targets: ref.current.scale,
            //     x: function() {
            //         return anime.random(100, 400);
            //     },
            //     y: function() {
            //         return anime.random(100, 400);
            //     },
            //     z: function() {
            //         return anime.random(100, 400);
            //     },
            //     duration: 4000,
            //     loop: true,
            //     // elasticity: 10,
            //     direction: 'alternate',
            //     easing: 'spring(10, 80, 100, 4)',
            //     // easing: 'easeInOutQuad',
            //     autoplay: true
            // });
            anime({
                targets: ref.current.position,
                x: function() {
                    return anime.random(-1, 1);
                },
                y: function() {
                    return anime.random(-2, 2);
                },
                duration: 2000,
                // loop: true,
                // elasticity: 10,
                direction: 'alternate',
                // easing: 'spring(10, 80, 100, 10)',
                easing: 'linear',
                autoplay: true
            });
            anime({
                targets: ref.current.rotation,

                y: function() {
                    return anime.random(-1, 1);
                },
                duration: 6000,
                // loop: true,
                // elasticity: 10,
                direction: 'alternate',
                // easing: 'spring(10, 80, 100, 10)',
                easing: 'linear',
                autoplay: true
            });
            // anime({
            //     targets: ref.current.scale,

            //     x: function() {
            //         return anime.random(200, 300);
            //     },
            //     y: function() {
            //         return anime.random(200, 300);
            //     },
            //     z: function() {
            //         return anime.random(200, 300);
            //     },
            //     duration: 6000,
            //     // loop: true,
            //     // elasticity: 10,
            //     direction: 'alternate',
            //     // easing: 'spring(10, 80, 100, 10)',
            //     easing: 'linear',
            //     autoplay: true
            // });
            // anime({
            //     targets: ref.current.scale,
            //     ...newScale,
            //     duration: 100,
            //     // loop: true,
     
            //     elasticity: 100,
            //     direction: 'alternate',
            //     easing: 'spring(300, 80, 100, 20)'
            // });
            // setAdd(!add);

        }, 2000);
        return () => clearTimeout(timeoutId);
    }, []);


    return (
        <>
            {/* <Suspense fallback={<div>Loading...</div>}> */}

            <Spline scene="https://prod.spline.design/5y-fuynlIOIyog1p/scene.splinecode"
                onLoad={onLoad}
                // onMouseDown={onMouseHover}
                className={`z-[51] ${!loaded ? 'opacity-0' : ''}`}
            />
            {/* </Suspense> */}
        </>
    )
}