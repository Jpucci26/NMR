import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from "react";
import { Layout, SectionHeader, Button, Field, SectionBody, Form, ErrorAlert } from "/components";

const EditCategoryPage = () => {
  const router = useRouter();
  const categoryId = router.query.id;

  const [name, setName] = useState("");


  // get category details
  
  const getCategory = async () => {
    const res = await fetch(`/api/categories/${categoryId}`);
    return res.json();
  };

  const { isSuccess, status } = useQuery({
    queryKey: `categories/${categoryId}`,
    queryFn: getCategory,
    enabled: categoryId !== undefined,
    onSuccess: (d) => {
      setName(d.name);
    },
  });

  // update category mutation 

  const updateCategory = async () => {
    const formData = {
      category: {
        name: name,
      },
    };
    const res = await fetch(`/api/categories/${categoryId}`, {
      method: "put",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: "Update Category",
    mutationFn: updateCategory,
    onSuccess: (d) => {
      if (!d.error) {
        router.push("/categories");
      }
    },
  });

  



  if (!isSuccess) {
    return <Layout title="Categories">{status}</Layout>;
  }

  return (
    <Layout title="Categories">
      <SectionHeader title="Edit Category">
        <Button label="Cancel" href="/categories" />
        <Button label="Save" disabled={isLoading} onClick={mutate} />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={data}/>
        <Form onSubmit={mutate}>
          <Field name="Name">
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="twInput"
              disabled={isLoading}
              autoFocus
            />
          </Field>
        </Form>
      </SectionBody>
    </Layout>
  );
};

export default EditCategoryPage;
