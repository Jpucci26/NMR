import React from "react"
import { useState } from "react"


export default function Login(){








    return (
        <div>
        <div className="bg-gradient-to-r from-purple-500 to-cyan-500 flex flex-col content-center">
            <form onSubmit={(e) => handleSubmit(e)} className="max-w-[400px] w-full mx-auto bg-gray-600 p-8 px-8 rounded-lg">
                <h2 className="text-4xl text-white font-bold text-center">LOG IN</h2>
                <div>
                    <label className="flex flex-col text-white py-2">
                        Username
                    </label>
                    <input onChange={(e) => setName(e.target.value)} type="text" name="name" value={name}/>
                </div>
                <div>
                    <label className="flex flex-col text-white py-2">
                        Password
                    </label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" value={password}/>
                </div>
                <button class="bg-cyan-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
                <br/>
                <br/>

                    {errors ? <h1 className="text-sm text-red-500">{errors}</h1> : null}
            </form >
        </div>
    </div>
 )


}