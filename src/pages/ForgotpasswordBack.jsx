import React from "react";
import { Check } from "lucide-react";

const ForgotPasswordBack = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="bg-blue-600 text-white flex flex-col md:justify-start md:items-start md:pt-35 lg:ml-20 md:ml-10 p-10 md:w-3/4 leading-[3rem]">
        <h1 className="text-4xl font-bold mb-4 text-center lg:text-left lg:pt-10">
          Forgot your <br /> password.
        </h1>
        <p className="text-lg mb-8 text-center lg:text-left">
          Don't worry, we'll help you get back in.
        </p>

        <div className="flex justify-center items-center">
          <img src="/image1.png" alt="Forgot Password Illustration" className="w-64 md:w-70 lg:w-96"/>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center">
          <div className="grid place-items-center w-12 h-12 bg-blue-600 text-white rounded-md mb-6">
            <Check className="w-6 h-6" strokeWidth={3} />
          </div>
          <p className="text-gray-700 text-center">
            We have sent you an email with the instructions
          </p>
        </div>
    </div>
    </div>
  );
};

export default ForgotPasswordBack;