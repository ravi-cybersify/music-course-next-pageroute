import React from 'react';
// import gsap from 'gsap';
// import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';


// Register the scrambleText plugin
// gsap.registerPlugin(ScrambleTextPlugin);

const FirstHome = () => {
  // useEffect(() => {
  //   const tl = gsap.timeline({ defaults: { duration: 2, ease: "none" } });

  //   tl.to("#scramble", {
  //     duration: 3,
  //     scrambleText: {
  //       text: "E - comm Web for Music Production Fundamentals.", // Text to animate
  //       chars: "lowerCase", // Restrict to lowercase letters
  //       revealDelay: 0.5, // Delay before revealing the next character
  //       tweenLength: false, // Disable length-based tweening
  //     },
  //   });
  // }, []);

  return (
    <div className="flex flex-col text-black bg-black text-white pb-20 items-center justify-center mx-auto gap-9">
      <div id="scramble" className="text-5xl font-bold pt-32">
      E - comm Web for Music Production Fundamentals.
        {/* Initial empty div for the animation */}
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
          className="border px-12 py-3 rounded-2xl font-semibold bg-black text-white"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default FirstHome;
