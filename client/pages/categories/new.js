import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import {
  SectionHeader,
  Button,
  Layout,
  ErrorAlert,
  Field,
  SectionBody,
  Form,
} from "/components";

const AddCategoryPage = () => {
  const router = useRouter();

  // Control Form input values
  // with React's useState Hooks
  const [name, setName] = useState("");

  // Add Category Mutation

  const postCategory = async () => {
    const formData = {
      category: {
        name: name,
      },
    };
    const res = await fetch(`/api/categories`, {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: "Add Category",
    mutationFn: postCategory,
    onSuccess: (d) => {
      if (!d.error) {
        router.push("/categories");
      }
    },
  });



  return (
    <Layout title="Categories">
      <SectionHeader title="Add Category">
        <Button label="Cancel" href="/categories" />
        <Button label="Save" onClick={mutate} disabled={isLoading} />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={data} />
        <Form onSubmit={mutate}>
          <Field name="Name">
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              disabled={isLoading}
              className="twInput"
            />
          </Field>
        </Form>
      </SectionBody>
    </Layout>
  );
};

export default AddCategoryPage;
