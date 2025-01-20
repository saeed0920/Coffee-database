"use client";
import { useRouter } from 'next/navigation'
import { Form, Input, Button , DatePicker } from "@heroui/react";
import { useState } from "react";
import { usePathname } from 'next/navigation';


export default function Register({onCloseD} : any) {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [yearDate, setYearDate]  = useState("");
  const [address, setAddress] = useState("");
  const [name, setName]  = useState("");
  const [submitted, setSubmitted] : any = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading , setIsloading] = useState(false)
  const router = useRouter()
  const pathname = usePathname();
  const isSignUp = pathname === "/signup";

  const onSubmit = (e : any) => {
    setIsloading(true)
    e.preventDefault();
    let data : any = Object.fromEntries(new FormData(e.currentTarget));
    data.birthYear = Number(data.birthYear.slice(0,4))
    isSignUp ? null : data.code = Number(data.code)
    const headers : any = {
    'Content-Type': 'application/json',
    }
    !isSignUp ? headers.Authorization = `${typeof window !== "undefined" ? localStorage.getItem("token") : ""}` : null;

    fetch(`${process.env.localHost}${isSignUp ? "/signup" : "/personel"}`, {
      method: 'POST',
      headers,
  body: JSON.stringify(data),
})
  .then(res => {
    if (isSignUp) 
    router.push('/signin')
  else {
  onCloseD()
  }
  })
     // Clear errors and submit
    setErrors({});
  };

  return (
    <Form
      className="w-full mx-auto max-w-xs flex flex-col gap-2"
      validationBehavior="native"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 w-[18rem]">

       { isSignUp ?
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your Name"
        /> : ""} 

        {  pathname === "/signup" ? ""  :
        <Input
          isRequired
          label="Code"
          labelPlacement="outside"
          type="number"
          name="code"
          placeholder="Enter your Code"
        /> 
        }

        <Input
          isRequired
           label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

{isSignUp ?
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onValueChange={setPassword}
        /> : ""} 

{ isSignUp ? 
        <Input
          isRequired
          label="Phone Number"
          labelPlacement="outside"
          name="PhoneNumber"
          placeholder="Enter your Phone Number"
          type="number"
          value={phoneNumber}
          onValueChange={setPhoneNumber}
        /> : ""} 

        <DatePicker name="birthYear"  className="max-w-[284px]" label="Birth date" />

{ isSignUp ? 
        <Input
          isRequired
          label="Address"
          labelPlacement="outside"
          name="address"
          placeholder="Enter your Address"
          value={address}
          onValueChange={setAddress}
        /> : ""} 

{ isSignUp ? "" : 
        <Input
          isRequired
          label="Job Rule"
          labelPlacement="outside"
          name="Description"
          placeholder="Enter your Job Role"
        />} 



        <div className="flex gap-4">
          <Button isLoading={isLoading} className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}
