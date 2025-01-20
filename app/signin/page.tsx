"use client"
import { useRouter } from 'next/navigation'

import React, { useState } from "react";
import {Form, Input, Button, user} from "@heroui/react";

export default function Login() {
  const router = useRouter()
  const [action, setAction] : any = useState(null);
  const [isLoading , setIsLoading] = useState(false)

  return (
    <Form
      className="w-full mx-auto max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        setIsLoading(true)
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        fetch(`${process.env.localHost}/login` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => {
          if (response.ok)  response.json().then((data) => {
          localStorage.setItem("token", `${data.token}`);
          if (data.IsAdmin) {
           router.push("/admin") 
          }else router.push("/")
          })
            else {
          setIsLoading(false)
          }
        })
      }}
    >

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid Password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
      />

      <div className="flex gap-2">
        <Button isLoading={isLoading} color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
}

