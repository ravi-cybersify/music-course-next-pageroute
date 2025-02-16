import Form from "@/components/Form";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-evenly items-center pt-12 ">
      <div className="rounded-3xl w-96 bg-gray-200 px-12 pt-5 pb-8 ml-20">
        <h1 className="text-2xl font-bold pb-7 text-center">Login</h1>
        <Form />
      </div>
      <div className="rounded">
        <Image
          src="/Image/login.avif"
          width={600}
          height={300}
          priority
          alt="security"
          className="rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Login;
