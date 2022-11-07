import Link from "next/link";
import { useRouter } from 'next/router'
import { useQuery } from "react-query";
import Navbar from "../../components/navbar";
import {Layout} from "/components";

const ShowCategoryPage = () => {
  const router = useRouter()
  const categoryId = router.query.id
  const getCategory = async () => {
    const res = await fetch(`/api/categories/${categoryId}`);
    return res.json();
  };
  const { data, error, isLoading } = useQuery(`categories/${categoryId}`, getCategory);

  if (isLoading) return <Layout title="Categories" />;

  return (
    <Layout title="Categories">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {data.name}
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <Link href={`/categories/edit?id=${categoryId}`}>
              <button
                type="button"
                className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6">

      </div>
    </Layout>
  );
};

export default ShowCategoryPage;