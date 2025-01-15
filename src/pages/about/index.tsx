import Image from "next/image";
import React from "react";
import meetup from '../../../public/Image/colugehand.jpg'

const FirstAbout = () => {
  return (
    <div className="flex justify-evenly items-center mx-12 my-28 ">
      <div className="w-[570px] text-left flex flex-col gap-7">
        <p className="text-4xl font-semibold">Our Story</p>
        <p>
          Cybersecurity is a major endeavor in the IT industry. There are a
          number of professional certifications given for cybersecurity training
          and expertise.[1] Although billions of dollars are spent annually on
          cybersecurity, no computer or network is immune from attacks or can be
          considered completely secure. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Beatae maxime debitis voluptatibus.
        </p>
        <p>
          The single most expensive loss due to a cybersecurity exploit was the
          ILOVEYOU or Love Bug email worm of 2000, which cost an estimated 10
          billion dollars Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Esse commodi quaerat pariatur omnis culpa enim sint quia
          accusamus maxime placeat!
        </p>
      </div>
      <div className="rounded">
        <Image
          src={meetup}
          alt={"Course Image"}
          priority
          width={500}
          height={500}
          className="rounded"
        />
      </div>
    </div>
  );
};

export default FirstAbout;
