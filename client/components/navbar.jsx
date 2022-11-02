import React from "react"
import Link from "next/link"

export default function Navbar(){

    return (
        <nav className="flex space-x-4">
        <Link className="text-blue-500 underline" href="/">Dashboard</Link>
        <Link className="text-blue-500 underline" href="/reports/new">Submit Report</Link>
        <Link className="text-blue-500 underline" href="/locations">Locations</Link>
        <Link className="text-blue-500 underline" href="/categories">Categories</Link>
      </nav>

    )


}

