import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router';
import  {currentUserAtom}  from '../../atoms/currentUseratom';
import { useAtom } from 'jotai';
import { redirectAtom } from '../../atoms/redirectAtom';


export default function LoginPage() {


    const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
    const [redirect, setRedirect] = useAtom(redirectAtom)
    const router = useRouter()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('');



    function handleSubmit(e){
        e.preventDefault()
        console.log(name,password)
        fetch(`/api/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
            username: name,
            password,
          })
        }).then((r) => {
        if (r.ok){
            r.json().then(data => {
                // console.log(data)
                setCurrentUser(data)
                router.push(redirect)
            })
            }else {
                r.json().then(json => setErrors(json.error))
            
            }
        })
    }




  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                create a safer world today.
              </span>
            </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="Username"
                  name="username"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  // autoComplete="Username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  // autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
            {errors ? <h1 className="text-sm text-red-500">{errors}</h1> : null}
          </form>
        </div>
      </div>
    </>
  )
}
