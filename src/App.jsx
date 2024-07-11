import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [num, setNum] = useState(false)
  const [char, setChar] = useState(false)
  const [password,setPassword] = useState("")
  
  const passwordref = useRef(null)

  const CopyPasswordToClipBoard = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGen = useCallback(()=>{
    let pass = ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (num) {
      str += "0123456789"
    }
    if (char) {
       str += "!@#$%^&*(){}~"
    }

     for ( let i=0;i<=length;i++){
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
     }
     setPassword(pass)

  },[length,char,num,setPassword])

  useEffect(()=>{
  passwordGen()
   },[length,char,num,passwordGen])


  
  return (
    <>
   
     <div className='w-full max-w-md mx-auto shadow-2xl rounded-lg p-4 m-8 text-green-500 bg-slate-200 pb-4'>
      <h1 className='text-3xl text-center p-2' >Password Generator</h1>
      <div className='flex shadow-xl rounded-lg overflow-hidden mb-4'>
        <input
        type="text"
        value={password}
        className='outline-none w-full shadow-2xl py-1 px-3 bg-white'
        placeholder='password'
        readOnly
        ref={passwordref}>
        </input>
        <button 
        className='outline-none bg-black p-2'
         onClick={CopyPasswordToClipBoard}>copy</button>

      </div>
      <div className='flex justify-around flex-col md:flex-row  text-sm gap-3 p-2'>
      <div className='flex flex-col items-center gap-x-1  bg-black shadow-2xl rounded-md p-2'>
          <input
          type="range"
          min={6}
          max={20}
          value={length}
          className='cursor-pointer flex-grow'
          onChange={(e)=>{setLength(e.target.value)}}/>
          <label className='min-w-16'>Length:{length}</label>
        </div>
        <div className='flex flex-col items-center gap-x-1 bg-black rounded-md p-2'>
          <input 
          type="checkbox"
          defaultChecked={char}
          id='charinput'
          onChange={()=>{setChar((prev)=>!prev)}}/>
          <label>Characters</label>

        </div>
        <div className='flex flex-col items-center gap-x-1 bg-black rounded-md p-2'>
          <input 
          type="checkbox"
          defaultChecked={num}
          id='numinput'
          onChange={()=>{setNum((prev)=>!prev)}}/> 
          <label>Number</label>

        </div>
      </div>
     </div>
    </>
  )
}

export default App
