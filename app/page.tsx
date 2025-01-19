"use client"

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Image from 'next/image'
import {Card, CardBody, CardFooter, CardHeader, Skeleton} from "@heroui/react";
import { loadEnvConfig } from '@next/env'
 
type Repo = {
  name: string
  stargazers_count: number
}
 
export default function App() {

//getServerSideProps().then((res) => {
  //const data = JSON.parse(res)
  //console.log(data)
//})

const  list = [{
    "name": "kos",
    "description": "50%kosbica, 50%arabkos",
    "price": 100,
    "dateTime": "2025-01-01T15:30:00.000Z" 
}]

  if (!list.length) return (
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
 ) 
 else 
  return (
<main>
<div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
     {list.map((item : any, index : any) => (
        /* eslint-disable no-console */
      <Card key={index} className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{item.name}</p>
        <small className="text-default-500">{item.description}</small>
        <h4 className="font-bold text-large">{item.price}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://api.iconify.design/tabler:coffee.svg"
          width={270}
          height={100}
        />
      </CardBody>
    </Card>
      ))}
    </div>
</main>
  );}



 const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch(`${process.env.localHost}/events`)
  const repo = await res.json()
  console.log(repo)
  return  repo ;
}) 
 
export function Test(
  repo : any
){
  console.log(repo)
  return (
    <div>
    </div>
  )
}