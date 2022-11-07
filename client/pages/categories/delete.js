import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from "react";
import { Layout, SectionHeader, Button, Field, SectionBody, Form, ErrorAlert } from "/components";
import { successToastAtom } from "../../atoms/successToastAtom";
import { useAtom } from "jotai";

const DeleteCategoryPage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();
  const categoryId = router.query.id;

  const [name, setName] = useState("");

  // Get Category Query
  
  const getCategory = async () => {
    const res = await fetch(`/api/categories/${categoryId}`);
    return res.json();
  };

  const { data, isSuccess, status } = useQuery({
    queryKey: `categories/${categoryId}`,
    queryFn: getCategory,
    enabled: categoryId !== undefined,
    onSuccess: (d) => {
      setName(d.name);
    },
  });

  // Delete Eategory Mutation 

  const deleteCategory = async () => {
    const res = await fetch(`/api/categories/${categoryId}`, {
      method: "delete",
    });
    return res.json();
  };

  const { mutate, data: updatedData,  isLoading } = useMutation({
    mutationKey: "Delete Category",
    mutationFn: deleteCategory,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Category deleted successfully");
        router.push("/categories");
      }
    },
  });

  if (!isSuccess) {
    return <Layout title="Delete Category">{status}</Layout>;
  }

  return (
    <Layout title="Categories">
      <SectionHeader title={`Delete: ${data.name}`}>
        <Button label="Cancel" href={`/categories/show?id=${categoryId}`} />
        <Button label="Delete" disabled={isLoading} onClick={mutate} />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={updatedData}/>
      </SectionBody>
    </Layout>
  );
};

export default DeleteCategoryPage;