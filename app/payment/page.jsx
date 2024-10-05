"use client";
import { SelectedCarAmountContext } from "../../context/SelectedCarAmount";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useSearchParams } from "next/navigation";

function Payment() {
  const searchParam = useSearchParams();
  const amount = searchParam.get("amount");

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const options = {
    mode: "payment",
    amount: amount * 100,
    currency: "npr",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}

export default Payment;
