"use client"
import {Tabs, Tab, Card, CardBody, Skeleton, CardHeader, Divider,  useDisclosure , Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  Input,
  DatePicker,
  Popover, PopoverTrigger, PopoverContent,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Register from "../signup/page"

const Admin =  () => { 

    // R == Result  ,I == Items ,P == Personles
    const [RU , setRU] = useState([])
    const [RP , setRP] = useState([])
    const [RI , setRI] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen : isOpenD, onOpen  : onOpenD, onOpenChange : onOpenChangeD }  = useDisclosure();
    const {isOpen : isOpenC, onOpen  : onOpenC, onOpenChange : onOpenChangeC }  = useDisclosure();
    const [modelData , setModelData] : any = useState(null)
    const [editBtnIsLoading , setEditBtnIsLoding] = useState(false)
    const [fetchData , setFetchData] = useState(true)

    
    const usersApi = fetch(`${process.env.localHost}/users`);
    const personelsApi = fetch(`${process.env.localHost}/personel`);
    const itemsApi = fetch(`${process.env.localHost}/events`);

    useEffect(() =>{ 
      if (!fetchData) return
        setIsLoading(true)
     Promise.all([usersApi, personelsApi, itemsApi]).then( async (values) => { 
        const users = await values[0].json()
        const personels = await values[1].json()
        const items = await values[2].json()
            setRU(users)
            setRP(personels)
            setRI(items)
            setIsLoading(false)
            setFetchData(false)
     })
},[fetchData])

if (isLoading) return <Skeleton className="rounded-lg min-w-full min-h-[50%]"><div></div></Skeleton>

return (
 <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="users" className="grid gap-4 grid-cols-4 text-center" title="Users">
            {RU.map((user :any) => 
           <Card className="max-w-[300px]" key={user.ID}>
      <CardHeader className="flex gap-3">
             <div className="flex items-start flex-col gap-4">
          <p className="text-md">{user.Email}</p>
          <p className="text-md">{user.Name}</p>
          <p className="text-small text-default-500 flex items-center justify-center gap-2"><Image src="https://api.iconify.design/mdi:map-marker-multiple.svg" width={20} height={20} alt="location"/>{user.Address}</p>
          <p className="text-small text-default-500 flex items-center justify-center gap-2"><Image src="https://api.iconify.design/material-symbols:call.svg" width={20} height={20} alt="location"/>{user.PhoneNumber}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex- -center">
        <p className="flex gap-4 justify-start"><Image src="https://api.iconify.design/material-symbols:calendar-month-sharp.svg" width={20} height={20} alt="date" />{user.BirthYear}</p>
      </CardBody>
    </Card>)}
       </Tab>
        <Tab key="personels"   className="grid gap-4 grid-cols-4 text-center"  title="Personel">
          <Button onPress={onOpenD} color="default" className="h-full">
            <Image width={50} height={50} alt="create" src="https://api.iconify.design/material-symbols-light:add-2-rounded.svg" />
            </Button>
          {RP.map((pers :any) => 
           <Card className="max-w-[300px]" key={pers.ID}>
      <CardHeader className="flex gap-3 w-full">
        
          <div className="flex items-start flex-col gap-4 w-full">
        <div className="flex gap-2 justify-between w-full">
          <Popover placement="right">
      <PopoverTrigger>
        <Button color="danger" size="sm">Delete</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
       <Button isLoading={editBtnIsLoading} size="sm" color="warning" onPress={() => {
              fetch(`${process.env.localHost}/personel/${pers.ID}`, {
      method: 'DELETE',
       headers: {
        Authorization: `${localStorage.getItem("token")}`}
})
  .then(res => {
     setEditBtnIsLoding(false)
     // fetch tables
      setFetchData(true)
  })
          }}>Are you sure?</Button>
        </div>
      </PopoverContent>
    </Popover>
          <Button size="sm" color="primary" onPress={() => {
            setModelData(pers)
            onOpen()
            }}>Edit</Button>
          
          </div>
          <div className="flex justify-between items-center w-full">
          <p className="text-md">{pers.Email}</p>
         
            </div> 
          <p className="text-md">Personel Code : {pers.Code}</p>
          <p className="text-md">Job Rule : {pers.Description}</p>
            </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex- -center">
        <p className="flex gap-4 justify-start"><Image src="https://api.iconify.design/material-symbols:calendar-month-sharp.svg" width={20} height={20} alt="date" />{pers.BirthYear}</p>
      </CardBody>
    </Card>)}
        </Tab>
        <Tab key="items" title="Coffees" className="grid gap-4 grid-cols-4 text-center" >
          <Button onPress={() => {
            setModelData(null)
            onOpenC()
            }} color="default" className="h-full">
            <Image width={50} height={50} alt="create" src="https://api.iconify.design/material-symbols-light:add-2-rounded.svg" />
            </Button>
          {RI.map((item :any) => 
           <Card className="max-w-[300px]" key={item.ID}>
      <CardHeader className="flex gap-3 w-full">
        
          <div className="flex items-start flex-col gap-4 w-full">
        <div className="flex gap-2 justify-between w-full">
          <Popover placement="right">
      <PopoverTrigger>
        <Button color="danger" size="sm">Delete</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
       <Button isLoading={editBtnIsLoading} size="sm" color="warning" onPress={() => {
              fetch(`${process.env.localHost}/events/${item.ID}`, {
      method: 'DELETE',
       headers: {
        Authorization: `${localStorage.getItem("token")}`}
})
  .then(res => {
     setEditBtnIsLoding(false)
     // fetch tables
      setFetchData(true)
  })
          }}>Are you sure?</Button>
        </div>
      </PopoverContent>
    </Popover>
          <Button size="sm" color="primary" onPress={() => {
            setModelData(item)
            onOpenC()
            }}>Edit</Button>
          
          </div>
          <div className="flex justify-between items-center w-full">
            
          <p className="text-md flex items-center justify-center gap-2"><Image src="https://api.iconify.design/catppuccin:coffeescript.svg" width={20} height={20} alt="coffee" />{item.Name}</p>
            </div> 
          <p className="text-md">{item.Description}</p>
          <p className="text-md">{item.Price}$</p>
            </div>
      </CardHeader>
    </Card>)}
        </Tab>
      </Tabs>
      {/* model and drawer for personel */}
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Personel Form</ModalHeader>
              <ModalBody>
              <Form
      className="w-full mx-auto max-w-xs flex flex-col gap-2"
      validationBehavior="native"
      onSubmit={(e) => {
     setEditBtnIsLoding(true)
    e.preventDefault();
    let data : any = Object.fromEntries(new FormData(e.currentTarget));
    data.birthYear = Number(data.birthYear.slice(0,4))
    data.code = Number(data.code)

    fetch(`${process.env.localHost}/personel/${modelData.ID}`, {
      method: 'PUT',
       headers: {
        Authorization: `${localStorage.getItem("token")}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(res => {
     setEditBtnIsLoding(false)
     onClose()
     // fetch tables
      setFetchData(true)
  })
      }}
    >
      <div className="flex flex-col gap-4 w-[18rem]">
        <Input
          isRequired
          label="Personel Code"
          labelPlacement="outside"
          type="number"
          name="code"
          placeholder={modelData.Code}
        /> 
        <Input
          isRequired
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder={modelData.Email}
          type="email"
        />
        
        <DatePicker isRequired name="birthYear"  className="max-w-[284px]" label="Birth Date" />
        <Input
          isRequired
          label="Job Rule"
          labelPlacement="outside"
          name="Description"
          placeholder={modelData.Description}
        /> 
        
        <div className="flex gap-4">
            <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
<Button isLoading={isLoading} className="w-full" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
        <Drawer isOpen={isOpenD} onOpenChange={onOpenChangeD}>
        <DrawerContent>
          {(onCloseD) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
              <DrawerBody>
              <Register onCloseD={() => {

              onCloseD()
              setFetchData(true)
              }} />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onCloseD}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* model for events or coffee */}
         <Modal isOpen={isOpenC} onOpenChange={onOpenChangeC}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Coffee Form {modelData?.Price ? "Edit" : "Create"}</ModalHeader>
              <ModalBody>
              <Form
      className="w-full mx-auto max-w-xs flex flex-col gap-2"
      validationBehavior="native"
      onSubmit={(e) => {
     setEditBtnIsLoding(true)
    e.preventDefault();
    let data : any = Object.fromEntries(new FormData(e.currentTarget));
    data.price = Number(data.price)
    fetch(`${process.env.localHost}/events${modelData?.Price ?  "/" + modelData.ID : ""}`, {
      method: modelData?.Price ? "PUT" :  "POST" ,
       headers: {
        Authorization: `${localStorage.getItem("token")}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ DateTime : new Date() ,...data}),
})
  .then(res => {
     setEditBtnIsLoding(false)
     onClose()
     // fetch tables
      setFetchData(true)
  })
      }}
    >
      <div className="flex flex-col gap-4 w-[18rem]">
         <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder={modelData?.Name || "Enter the Name"}
        /> 
        <Input
          isRequired
          label="Description"
          labelPlacement="outside"
          name="description"
          placeholder={modelData?.Description || "Enter the Description of Coffee"}
        /> 
        <Input
          isRequired
          label="Price"
          labelPlacement="outside"
          type="number"
          name="price"
          placeholder={modelData?.Price || "Enter the Price of Coffee"}
        /> 
        <div className="flex gap-4">
            <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
<Button isLoading={isLoading} className="w-full" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

     </div>
)
}


export default Admin;