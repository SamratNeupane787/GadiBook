import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
export default function Page() {
  return (
    <div className=" grid  place-items-center grid-cols-1 md:grid-cols-2">
      <div>
        <Image src="/banner.png" fill />
      </div>
      <div className=" pt-16 md:pt-24">
        <SignIn />
      </div>
    </div>
  );
}
