import Link from 'next/link'
import Navbar from '../components/navbar'
import {useQuery} from 'react-query'
import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'



const Dashboard = () => {

  const getReports = async () => {
		const res = await fetch('/api/reports');
		return res.json();
	};
	const {data, error, isLoading} = useQuery('reports', getReports);
  console.log( {data: data} )



  return (
    <div className="p-3">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="h-2"></div>
      <Navbar />
      {data !== undefined ?

    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {data.map((report) => (
          <li key={report.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                  <p className="truncate text-sm font-medium text-indigo-600">{report.title}</p>
                  <p className='text-sm'>{report.description}</p>
                  </div>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex text-xs font-semibold leading-5">
                      {StatusPill(report)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      {report.category.name}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      {report.location.name}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    {report.created_at_fmt}
                    {/* <p>
                      <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                    </p> */}
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
    : <></>}
    </div>
        
  )
}

export default Dashboard

function StatusPill(report) {

let c = ""

if(report.status === "pending_final_action"){
  c = "bg-yellow-100 rounded-full px-2 text-red-800"
}

if(report.status === "pending_corrective_action"){
  c = "bg-red-200 rounded-full px-2 text-red-800"
}

if(report.status === "closed"){
  c = "bg-green-100 rounded-full px-2 text-green-800"
}





  return <span className = {c}>
    {report.status}
  </span>
}
