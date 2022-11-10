import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import { successToastAtom } from "../../atoms/successToastAtom";
import { useAtom } from "jotai";
import {
  SectionHeader,
  Button,
  Layout,
  ErrorAlert,
  Field,
  SectionBody,
  Form,
} from "/components";

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
          >
            <option selected value>
              {" "}
              -- Select Name --{" "}
            </option>
            {data.map((user) => (
              <option value={user.id}>{user.username}</option>
            ))}
          </select>
        </Field>
      </>
    );
  }
};

const AddCategoryPage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [userId, setUserId] = useState("");

  // Add Category Mutation

  const postCategory = async () => {
    const formData = {
      category: {
        name: name,
        description: description,
        status: status,
        user_id: userId,
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
        setSuccessToast("Category added successfully");
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

export default AddCategoryPage;
