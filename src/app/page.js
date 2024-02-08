"use client"

import { useState } from "react";
import { PhotoIcon } from '@heroicons/react/24/solid'
import './pages.css'
function Home(){
   
   const[image,setimage] = useState(null)
   const[message,setmessage] = useState("")
   const[isloading, setloading] = useState(false)
   const submithandler = async()=>{
       console.log(image);
       const formdata = new FormData();
       formdata.append('photo',image);
       setloading(true)
       const response = await fetch(`http://127.0.0.1:8080/predict`,{
           method: 'POST',
           cache: 'no-store',
           body: formdata,
       })
    if(!response.ok){
    console.log(response);
    setloading(false)
    }    
    else{
     const result = await response.json()
     console.log(result) 
     setloading(false)
     setmessage(result)
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
 if(isloading){
    return (
        <>
         <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Loading</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Photo is Processing</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
           
           
          </div>
        </div>
      </main>
        </>
    )
 }
 return(
    <>
    <label htmlFor="cover-photo" className="text-center block text-sm font-medium leading-6 text-gray-900">
                Upload Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handlechange}/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <div className="sp mx-auto">
                <button
                  type="submit"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={submithandler}
                >
                  Upload
                </button>
                </div>
                <label htmlFor="cover-photo" className="text-center mt-100 block text-sm font-medium leading-6 text-gray-900">
                Output
              </label>
        <div className="text-center w-1/2 mx-auto shadow-xl bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {message}
        </div>
            
    </>
 )
}
export default Home;