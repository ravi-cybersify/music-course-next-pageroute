import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const FirstHome = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const span = spanRef.current;

    if (!button || !span) return; 

    const tl = gsap.timeline({ paused: true });

    tl.to(span, { duration: 0.2, yPercent: -150, ease: "power2.in" });
    tl.set(span, { yPercent: 150 });
    tl.to(span, { duration: 0.2, yPercent: 0 });

    const handleMouseEnter = () => tl.play(0);
    button.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div className="flex flex-col text-black bg-black text-white pb-20 items-center justify-center mx-auto gap-9">
      <div id="scramble" className="text-5xl font-bold pt-32">
      E - comm Web for Music Production Fundamentals.
      </div>
      <div className="flex flex-col items-center justify-center mx-auto gap-3">
        <p className="w-1/2 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint est ex
          ratione alias repudiandae architecto veritatis enim corporis aspernatur
          ea.
        </p>
        <p className="w-1/2 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error at modi
          omnis animi placeat eligendi earum cupiditate accusantium porro harum.
          Eaque ducimus ratione magnam nesciunt error consectetur veniam voluptate
          corrupti.
        </p>
      </div>
      <div className="">
        <button
          type="button"
          ref={buttonRef}
          className="explore-button border px-12 py-3 rounded-2xl font-semibold bg-black text-white"
        >
          <span ref={spanRef}>Explore</span>
        </button>
      </div>
    </div>
  );
};

export default FirstHome;
