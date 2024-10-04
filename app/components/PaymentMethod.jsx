"use client";
import React, { useState } from "react";
import cardlist from "./Paymentlogo"; // Make sure this path is correct
import Image from "next/image";

function PaymentMethod() {
  const [activeIndex, setActiveIndex] = useState(false);
  return (
    <div className="p-4">
      <h1 className="text-left font-semibold text-lg mb-4">Payment Methods</h1>

      <div className="flex flex-wrap justify-center gap-4">
        {cardlist?.map((item, index) => (
          <div
            key={index}
            className={`w-[50px] h-[50px] border  border-gray-300 rounded flex items-center justify-center shadow hover:shadow-md transition cursor-pointer ${
              activeIndex === index ? "border-yellow-400 border-[2px]" : ""
            }`} // Added a space before the conditional class
            onClick={() => setActiveIndex(index)}
          >
            <Image src={item.src} height={32} width={32} alt={item.alt} />
          </div>
        ))}
      </div>
      <div className=" mx-4 pt-6">
        <button class="  w-full rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Book
        </button>
      </div>
    </div>
  );
}

export default PaymentMethod;
