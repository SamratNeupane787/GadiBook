import React, { useContext, useState } from "react";
import cardlist from "./Paymentlogo"; // Make sure this path is correct
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmount";

function PaymentMethod() {
  const [activeIndex, setActiveIndex] = useState(false);
  const { carAmount } = useContext(SelectedCarAmountContext); // Extract carAmount from context

  const router = useRouter();

  // Assuming carAmount is an object, use the correct property to display
  const amount = carAmount?.total || carAmount; // Adjust according to your structure

  return (
    <div className="p-4">
      <h1 className="text-left font-semibold text-lg mb-4">Payment Methods</h1>

      <div className="flex flex-wrap justify-center gap-4">
        {cardlist?.map((item, index) => (
          <div
            key={index}
            className={`w-[50px] h-[50px] border  border-gray-300 rounded flex items-center justify-center shadow hover:shadow-md transition cursor-pointer ${
              activeIndex === index ? "border-yellow-400 border-[2px]" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={item.src} height={32} width={32} alt={item.alt} />
          </div>
        ))}
      </div>

      {/* Display the car amount if available */}

      <div className="mx-4 pt-6">
        <button
          className={`w-full py-2 px-4 rounded font-bold text-white transition ${
            amount
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-200 cursor-not-allowed"
          }`}
          onClick={() => router.push("/payment?amount=" + amount)}
          disabled={!amount}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default PaymentMethod;
