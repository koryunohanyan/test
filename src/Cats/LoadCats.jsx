import React, { useState, useEffect } from "react"
import {Image,
        Select,
        Container,
        SimpleGrid,
        Drawer,
        DrawerBody,
        DrawerFooter,
        DrawerHeader,
        DrawerOverlay,
        DrawerContent,
        DrawerCloseButton,
        useDisclosure,
         Button} from "@chakra-ui/react"


const LoadCats = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cats, setCats] = useState() 
    const [category, setCategory]= useState()
    const [button, setButton] =useState(1)
    const [limit, setLimit] =useState(10)
    let count=10

    const dataLoader = async (id, limit) =>{
        fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=1&category_ids=${id}`)
        .then(response => response.json())
        .then(response => setCats(response))
    } 

    const categoryLoader = async () =>{
        fetch("https://api.thecatapi.com/v1/categories")
        .then(response => response.json())
        .then(response => setCategory(response))
    } 
   

    useEffect(()=>{
        dataLoader(button, limit)
      
    }, [button, limit])
    
    useEffect(()=>{
        
        categoryLoader()
    }, [])

   

    return(
       
        <Container  maxW="8xl" >
         <>
          <Button
           mt="2rem"
           onClick={onOpen}
           > sidebar
         </Button>
      
      <Drawer onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
         
           <DrawerBody>
             <Select onChange={(e)=>setButton(e.target.value)}>
               {
                   category?.map(opt=>(
                       <option value={opt.id} >{opt.name}</option>
                   ))
                  
               }
             </Select>
           </DrawerBody>
         </DrawerContent>
      </Drawer>
    </>


           <SimpleGrid columns={{base:"1", sm:"2", md:"5"}} spacing={3} mt="3rem" mb="3rem" px="auto">
               {
                   cats?.map(item=>(
                   <Image src={item.url} w="150px" h="150px" />
                   ))
               }
           </SimpleGrid>

           <Button onClick={()=>setLimit(limit+10)}>load more 10</Button>
        </Container>
      
       
     
    
    )
}
export default LoadCats