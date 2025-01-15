import React, { useState } from "react";
// import Button from "../../lib/Button";
// import Card from "../../lib/Card";
import { IoIosMail } from "react-icons/io";
import { LuPhone } from "react-icons/lu";
import { CiTimer } from "react-icons/ci";
import Icons from "@/components/Icons";
// import { Button } from "@nextui-org/react";

const SecondContact = () => {
  const [user, setUser] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-evenly items-center my-12">
      <div className="rounded  w-[600px] ml-20">
        <h1 className="text-3xl font-semibold mb-8">How to Reach Us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          nulla doloremque, maxime enim iste, ullam iure quam accusamus
          explicabo illum praesentium recusandae, aliquid porro atque laboriosam
          asperiores odio ipsam vel!
        </p>
        <div className="my-8">
          <hr />
          <div className="py-4 flex gap-4 items-center text-left">
            <p className="w-12 h-12 rounded-full border border-[#00aeef] bg-gray-100 flex justify-center items-center">
              <Icons icon={LuPhone} />
            </p>
            <div className="">
              <p className="text-lg py-1">+(800)311-5990</p>
              <p className="">Call Now and Get a free Consultation</p>
            </div>
          </div>
          <hr />
          <div className="py-4 flex gap-4 items-center text-left">
            <p className="w-12 h-12 rounded-full border border-[#00aeef] bg-gray-100 flex justify-center items-center">
              <Icons icon={IoIosMail} />
            </p>
            <div className="">
              <p className="text-lg py-1">Info@secure365.com</p>
            </div>
          </div>
          <hr />
          <div className="py-4 flex gap-4 items-center text-left">
            <p className="w-12 h-12 rounded-full border border-[#00aeef] bg-gray-100 flex justify-center items-center">
              <Icons icon={CiTimer} />
            </p>
            <div className="">
              <p className="text-lg py-1">Monday - Friday, 9:00 AM - 5:00 PM CST</p>
            </div>
          </div>
        </div>
        
      </div>

      <div className="rounded-3xl w-[600px] px-12 pt-5 pb-8 mt-4">
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
          <input
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Name..."
            className="px-3 py-1 rounded-3xl w-full bg-gray-100"
          />
          <input
            type="text"
            value={user.companyName}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                companyName: e.target.value,
              }))
            }
            placeholder="Company Name..."
            className="px-3 py-1 rounded-3xl w-full bg-gray-100"
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="Email..."
            className="px-3 py-1 rounded-3xl w-full bg-gray-100"
          />
          <input
            type="tel"
            value={user.phone}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            placeholder="Phone number..."
            className="px-3 py-1 rounded-3xl w-full bg-gray-100"
          />
          <input
            type="text"
            value={user.subject}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                subject: e.target.value,
              }))
            }
            placeholder="subject..."
            className="px-3 py-1 rounded-3xl w-full bg-gray-100"
          />
          <textarea
            id="textarea"
            value={user.message}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                message: e.target.value,
              }))
            }
            placeholder="Your message..."
            className="px-3 py-2 rounded-3xl w-full h-20 bg-gray-100"
          />
          <div className="flex gap-1 ml-2">
            <input type="checkbox" name="" id="" />
            <span>I agree to the term & conditions | privacy policy</span>
          </div>
          <button
            type="submit"
            className="bg-[#00aeef] text-white w-32 text-md font-semibold px-2 py-1 rounded-3xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecondContact;
