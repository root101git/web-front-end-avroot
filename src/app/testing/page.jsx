"use client"

import { useState } from "react";

function Test(){
    const[image,setimage] = useState(null)
    const submithandler = async()=>{
        console.log(image);
        const formdata = new FormData();
        formdata.append('image',image);
        const response = await fetch(`http://127.0.0.1:8000/rohan`,{
            method: 'POST',
            cache: 'no-store',
            body: formdata,
        })
     if(!response.ok){
     console.log(response);
     }    
     else{
       
     }
    }
    const handlechange = (e) =>{
        const file = e.target.files[0];
        if(file){
            if(file.type.startsWith('image/')){
             setimage(file);
            }
        }

     }
    return (
    <>
    <input type='file' name='profileimage' accept="image/*" onChange={handlechange}></input>
    <button onClick={submithandler}>click</button>
    </>
    )
}
export default Test;