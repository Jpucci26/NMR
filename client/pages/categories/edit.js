import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from "react";
import {
  Layout,
  SectionHeader,
  Button,
  Field,
  SectionBody,
  Form,
  ErrorAlert,
} from "/components";
import { successToastAtom } from "../../atoms/successToastAtom";
import { useAtom } from "jotai";

const SelectUserField = ({ setUserId, userId }) => {
  const getUsers = async () => {
    const res = await fetch(`/api/users`);
    return res.json();
  };

  const { data, isSuccess } = useQuery({
    queryKey: `/users`,
    queryFn: getUsers,
  });
  console.log({ data });

  if (!isSuccess || data?.error) {
    return (
      <>
        <ErrorAlert data={data} />
      </>
    );
  } else {
    return (
      <>
        <Field name="Category Lead">
          <select
            id="Users"
            name="Users"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="twInput"
            // disabled={isLoading}
          >
            {data.map((user) => (
              <option value={user.id}>{user.username}</option>
            ))}
          </select>
        </Field>
      </>
    );
  }
};

const EditCategoryPage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();
  const categoryId = router.query.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");

  // get category details

  const getCategory = async () => {
    const res = await fetch(`/api/categories/${categoryId}`);
    return res.json();
  };

  const { isSuccess } = useQuery({
    queryKey: `categories/${categoryId}`,
    queryFn: getCategory,
    enabled: categoryId !== undefined,
    onSuccess: (d) => {
      setName(d.name);
      setDescription(d.description);
      setStatus(d.status);
      setUserId(d.user_id);
    },
  });

  // update category mutation

  const updateCategory = async () => {
    const formData = {
      category: {
        name: name,
        description: description,
        status: status,
        user_id: userId,
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
        setSuccessToast("Category updated successfully");
        router.push(`/categories/show?id=${categoryId}`);
      }
    },
  });

  if (!isSuccess) {
    return <Layout title="Categories">{status}</Layout>;
  }

  return (
    <Layout title="Categories">
      <SectionHeader title="Edit Category">
        <Button label="Cancel" href={`/categories/show?id=${categoryId}`} />
        <Button label="Save" disabled={isLoading} onClick={mutate} />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={data} />
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
          <Field name="Description">
            <textarea
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="twInput"
              disabled={isLoading}
            />
          </Field>
          <Field name="Status">
            <select
              id="Status"
              name="Status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="twInput"
              disabled={isLoading}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </Field>
          <SelectUserField userId={userId} setUserId={setUserId} />
        </Form>
      </SectionBody>
    </Layout>
  );
};

export default EditCategoryPage;
