import Link from 'next/link'

const CategoriesPage = () => {
  return (
    <div className="p-3">
      <h1 className="text-4xl">Categories</h1>
      <div className="h-2"></div>
      <nav className="flex space-x-4">
        <Link className="text-blue-500 underline" href="/">Dashboard</Link>
        <Link className="text-blue-500 underline" href="/reports/new">Submit Report</Link>
        <Link className="text-blue-500 underline" href="/locations">Locations</Link>
        <Link className="text-blue-500 underline" href="/categories">Categories</Link>
      </nav>
    </div>
  )
}

export default CategoriesPage