"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          window.alert(`User ${name} created successfully!`);
        },
        onError: () => {
          window.alert("Error creating user. Please try again.");
        },
      },
    );
  };
  return (
    <div className="flex flex-col gap-y-4 p-6">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="" onClick={onSubmit}>
        Create Account
      </Button>
    </div>
  );
}
