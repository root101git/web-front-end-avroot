"use client"
import { useState } from 'react'
import './Searchbar.scss'
export default  function Searchbar(){
    const [input,setinput] = useState("");
    const [err , seterr] = useState("");
    const [result , setresult] = useState([]);
    const changeHandler = async (e)=>{
        setinput(e.target.value)
        console.log(input)
    if(input != ""){
        const response = await fetch(`http://localhost:8080/search/${input}`)
        if(!response.ok){
           seterr("server err")
        
        }
        else{
            const res  = await response.json();
            setresult(res);
            console.log(res)
        }
    }
    }
    return (
        <>
        <div className="searchbar">
            <div className="inputbox">
                <input type="text" placeholder="search"  onChange={changeHandler}></input>
              {
                input && (
                    <div className="contentbox">
                
                 {input && <ul>{result.map((val)=>{
                    return <li>{val.name}</li>
                 })}</ul> }
                </div>
                )
              }
              
                
            </div>
           
        </div>
       
        </>
    )
}