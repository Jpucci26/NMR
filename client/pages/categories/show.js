import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "react-query";
import {
  Layout,
  SectionHeader,
  Button,
  SectionBody,
  ErrorAlert,
} from "/components";
//
const UserDetail = ({ user }) => {
  if (!user) {
    return <></>;
  } else {
    return (
      <>
        <h3 className="mt-3 mb-3 text-md">Category Lead</h3>
        <div className="text-gray-700 text-sm">
          <p>{user.username}</p>
          <p>{user.title}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      </>
    );
  }
};
//
const CategoryDetails = ({ category }) => {
  return (
    <div className="mt-2 mb-2 bg-gray-50 text-gray-800 text-sm p-2">
      <p>Name: {category.name}</p>
      <p>Description: {category.description}</p>
      <p>Status: {category.status}</p>
    </div>
  );
};
//
const ListReports = ({ categoryId }) => {
  const getReports = async () => {
    const res = await fetch(`/api/categories/${categoryId}/reports`);
    return res.json();
  };
  const { data, isSuccess } = useQuery(
    `/categories/${categoryId}/reports`,
    getReports
  );

  if (!isSuccess || data?.error) {
    return (
      <>
        <ErrorAlert data={data} />
      </>
    );
  } else {
    return (
      <>
        <h3 className="mt-3 mb-3 text-md">Reports</h3>
        <div className="text-gray-700 text-sm">
          {data.map((report) => (
            <Link
              href={`/reports/show?id=${report.id}`}
              className="block p-1 underline text-indigo-600"
            >
              <p>{report.title}</p>
            </Link>
          ))}
        </div>
      </>
    );
  }
};

const ShowCategoryPage = () => {
  const router = useRouter();
  const categoryId = router.query.id;
  // console.log({ categoryId });

  const getCategory = async () => {
    const res = await fetch(`/api/categories/${categoryId}`);
    return res.json();
  };

  const { data, isSuccess } = useQuery({
    queryKey: `categories/${categoryId}`,
    queryFn: getCategory,
    enabled: categoryId !== undefined,
  });

  if (!isSuccess) return <Layout title="Categories" />;

  return (
    <Layout title="Categories">
      <SectionHeader title={data.name}>
        <Button label="Back" href={`/categories`} />
        <Button label="Edit" href={`/categories/edit?id=${categoryId}`} />
        <Button label="Delete" href={`/categories/delete?id=${categoryId}`} />
      </SectionHeader>
      <SectionBody>
        <CategoryDetails category={data} />
        <div className="flex">
          <div className="grow">
            <ListReports categoryId={categoryId} />
          </div>
          <div className="w-40">
            <UserDetail user={data.user} />
          </div>
        </div>
      </SectionBody>
    </Layout>
  );
};

export default ShowCategoryPage;
