import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-52 justify-center">
      <h1>Home Page</h1>
      <Button><Link href={'/user-management'}>Go to user management</Link></Button>
    </div>
  );
}
