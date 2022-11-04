import React from "react"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useState } from "react"
import  {currentUserAtom}  from '../atoms/currentUseratom';
import { useAtom } from 'jotai';

export default function Navbar(){

  const router = useRouter()
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)


  const handleLogOut = () => {
    console.log("clicked")
    fetch(`/api/logout`, {
      method:"DELETE"
    })
    .then(res =>{
      if(res.ok){
        console.log(res)
        setCurrentUser(null)
        //change /api/login to /api/signup
        router.push('/sessions/login')
      }
    })
  }


    return (
        <nav className="flex space-x-4">
        <Link className="text-blue-500 underline" href="/">Dashboard</Link>
        <Link className="text-blue-500 underline" href="/reports/new">Submit Report</Link>
        <Link className="text-blue-500 underline" href="/locations">Locations</Link>
        <Link className="text-blue-500 underline" href="/categories">Categories</Link>
        <a className="text-blue-500 underline cursor-pointer"  onClick={handleLogOut}>Logout</a>

      </nav>

    )


}

