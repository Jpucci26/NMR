import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Layout, SectionHeader, Button } from "/components";

const ShowCategoryPage = () => {
  const router = useRouter();
  const categoryId = router.query.id;
  const getCategory = async () => {
    const res = await fetch(`/api/categories/${categoryId}`);
    return res.json();
  };
  const { data, error, isLoading } = useQuery(
    `categories/${categoryId}`,
    getCategory
  );

  if (isLoading) return <Layout title="Categories" />;

  return (
    <Layout title="Categories">
      <SectionHeader title="Category Details">
        <Button label="Edit" href={`/categories/edit?id=${categoryId}`} />
      </SectionHeader>
      <div className="px-4 py-5 sm:px-6"></div>
    </Layout>
  );
};

export default ShowCategoryPage;
