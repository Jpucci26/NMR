import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import {Layout} from "/components";

const EditCategoryPage = () => {

  // We can pull the categoryId from the URL params
  // with the useRouter library provided by Next.js
  // URL params are the items after the ? in the URL.
  // WARNING: categoryId depends on user interaction
  // (like which category the user navigated) so it 
  // won't be defined at build time. 

  const router = useRouter();
  const categoryId = router.query.id;

  // We control our Form's input values 
  // using React's useState hooks.  We would like to
  // default the current values from the database
  // but we won't have that value until our Query
  // returns data.  For now let's set it to empty
  // string.

  const [name, setName] = useState("");

  // This useQuery Depends on categoryId being defined
  // which we know will be undefined during build.
  // To prevent useQuery from firing when categoryId is
  // undefined we can make it a condition of being enabled.
  // https://tanstack.com/query/v4/docs/guides/dependent-queries

  const getCategory = async () => {
    const res = await fetch(`/api/categories/${categoryId}`);
    return res.json();
  };

  const { data, isSuccess, status } = useQuery({
    queryKey: `categories/${categoryId}`,
    queryFn: getCategory,
    enabled: categoryId!==undefined,
    onSuccess: (d)=> {
      setName(d.name)
    }
  });

  // useQuery can return a variety of status.  To ensure
  // our main content which depends on data from useQuery
  // only renders onSuccess we want to return this shell 
  // on anything besides isSuccess

  if (!isSuccess) {
    return <Layout title="Categories">{status}</Layout>;
  }

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
            <Link href="/categories"><button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditCategoryPage;
