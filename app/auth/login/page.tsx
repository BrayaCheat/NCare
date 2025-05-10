import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default async function Login() {
  return (
    <div className="md:w-[430px] min-h-screen flex flex-col justify-center w-full mx-auto rounded-2xl">
      <form
        action="/api/auth/login"
        method="POST"
        className="flex flex-col gap-6 p-3"
      >
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo.png"
            width={200}
            height={200}
            alt="Logo"
            priority
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="NCare@example.com" type="email" />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input name="password" placeholder="**********" type="password" />
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
