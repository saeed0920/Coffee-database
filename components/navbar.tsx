"use client"
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import {
  Logo,
} from "@/components/icons";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter , usePathname} from 'next/navigation'


export const Navbar = () => {

  let token : any  = "";
  if (typeof window !== 'undefined')  token = localStorage?.getItem("token")

  const [isLogin , setIsLogin ] = useState(token?.length > 0 ? true : false);
  const router = useRouter()
  const pathName = usePathname()


  useEffect(() => {
    setIsLogin(token?.length > 0 ? true : false)
  },[pathName])

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className=" flex justify-between">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <h1 className="font-bold text-inherit">Coffee</h1>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      { !isLogin ? <div className="flex gap-4">
        <Button  color="success" variant="light">
        <Link  color="success" href="/signin">
        SignIn
        </Link>
      </Button>
        <Button  color="success" variant="light">
        <Link color="success" href="/signup">SignUp</Link> 
      </Button>
        </div>
      : <Button onPress={
        () => { 
          if (typeof window !== 'undefined')
          localStorage.clear()

          setIsLogin(false)
          router.push("/")
        }
      } isIconOnly aria-label="Like" size="md" color="default">
        <Image width={25} alt="logout"  height={25} src="https://api.iconify.design/solar:logout-2-outline.svg" />
      </Button>
      }
    </HeroUINavbar>
  );
};
