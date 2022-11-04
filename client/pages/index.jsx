import Link from 'next/link'
import Navbar from '../components/navbar'
import {useQuery} from 'react-query'


const Dashboard = () => {



  // function fetchReports(){
  //   fetch('/api/reports')
  //   .then(r => r.json)
  //   .then(r => console.log(r))
  // }


  const getReports = async () => {
		const res = await fetch('/api/reports');
		return res.json();
	};
	// Using the hook
	const {data, error, isLoading} = useQuery('reports', getReports);



  return (
    <div className="p-3">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="h-2"></div>
      <Navbar />
      <pre>{ JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Dashboard