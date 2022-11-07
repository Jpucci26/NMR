import Link from "next/link";
import { useRouter } from 'next/router'
import { useQuery } from "react-query";
import {Layout, SectionHeader} from "/components";

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
   <SectionHeader title="Category Details">
            <Link href={`/categories/edit?id=${categoryId}`}>
              <button
                type="button"
                className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Edit
              </button>
            </Link>
        </SectionHeader>
      <div className="px-4 py-5 sm:px-6">

      </div>
    </Layout>
  );
};

export default ShowCategoryPage;