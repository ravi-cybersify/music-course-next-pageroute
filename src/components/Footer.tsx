import React from "react";
import { FaInstagram, FaGithub, FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-black py-5">
      <div className="flex justify-around text-white px-5 py-5">
        <div className="w-96 text-left flex flex-col gap-4">
          <div className="text-white">
            {/* <img src="./images/logor.png" alt="logo" className="w-40 h-18" /> */}
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum porro
            optio vero amet inventore quidem pariatur labore est provident
            neque, accusamus.
          </p>
          <div className="flex gap-4 my-2">
            <p className="bg-white text-black px-1 rounded-full py-1 cursor-pointer">
              <FaXTwitter />
            </p>
            <p className="bg-white text-black px-1 rounded-full py-1 cursor-pointer">
              <FaFacebook />
            </p>
            <p className="bg-white text-black px-1 rounded-full py-1 cursor-pointer">
              <FaInstagram />
            </p>
            <p className="bg-white text-black px-1 rounded-full py-1 cursor-pointer">
              <FaGithub />
            </p>
          </div>
        </div>
        <div className="text-left flex flex-col justify-evenly">
          <h1 className="text-lg font-semibold">Company</h1>
          <p className="cursor-pointer">About</p>
          <p className="cursor-pointer">Office</p>
          <p className="cursor-pointer">License verification</p>
          <p className="cursor-pointer">Nature</p>
        </div>
        <div className="text-left flex flex-col justify-evenly">
          <h1 className="text-lg font-semibold">Help</h1>
          <p className="cursor-pointer">Customer Support</p>
          <p className="cursor-pointer">Delivery Details</p>
          <p className="cursor-pointer">Terms & Conditions</p>
          <p className="cursor-pointer">Privacy Policy</p>
        </div>
        <div className="text-left flex flex-col justify-evenly">
          <h1 className="text-lg font-semibold">Resources</h1>
          <p className="cursor-pointer">Free eBooks</p>
          <p className="cursor-pointer">Tutorial</p>
          <p className="cursor-pointer">How to- Blog</p>
          <p className="cursor-pointer">Youtube Playlist</p>
        </div>
      </div>

      <div className="border border-white w-[90%] mx-20"></div>
      <div className="text-white text-center pb-2">
        <p>@ Copyright 2022, All rights reserved by <b>Music Course</b></p>
      </div>
    </div>
  );
};

export default Footer;
