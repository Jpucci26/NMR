import Link from "next/link";
import { useQuery } from "react-query";
import { Layout, SectionHeader, Button, SectionBody } from "/components";

const CategoriesPage = () => {
  const getCategories = async () => {
    const res = await fetch("/api/categories");
    return res.json();
  };
  const { data } = useQuery("categories", getCategories);

  if (!data || data.error) return <Layout title="Categories" />;

  return (
    <Layout title="Categories">
      <SectionHeader title="Categories">
        <Button label="Add Category" href="/categories/new" />
      </SectionHeader>
      <SectionBody>
        {data.map((category) => {
          return (
            <Link
              key={category.id}
              href={`/categories/show?id=${category.id}`}
              className="block p-1 underline text-indigo-600"
            >
              {category.name}
            </Link>
          );
        })}
      </SectionBody>
    </Layout>
  );
};

export default CategoriesPage;
