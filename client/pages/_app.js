import '../styles/globals.css'
import { useEffect, useState } from 'react'
import  {currentUserAtom}  from '../atoms/currentUseratom';
import { atom, useAtom } from 'jotai'



export default function App({ Component, pageProps }) {

  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

  useEffect(() => {
    fetch("/authorized_user")
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => 
        setCurrentUser(user));
      }
    });
  }, []);
  
  console.log(currentUser)


  return <Component {...pageProps} />
}
