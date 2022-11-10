import Link from "next/link";
import Navbar from "../../components/navbar";
import { useQuery, useMutation } from "react-query";
import { useRouter } from "next/router";
import { successToastAtom } from "../../atoms/successToastAtom";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  Layout,
  SectionHeader,
  SectionBody,
  ErrorAlert,
  Button,
  Form,
  Field,
} from "/components";

const SelectLocationField = ({ locationId, setLocationId }) => {
  const getLocations = async () => {
    const res = await fetch("/api/locations");
    return res.json();
  };

  const { data, isSuccess } = useQuery({
    queryKey: "uniqueLocations",
    queryFn: getLocations,
  });
  // console.log({Location_data: data})

  if (!isSuccess || data?.error) {
    return (
      <>
        <ErrorAlert data={data} />
      </>
    );
  } else {
    return (
      <>
        <Field name="Location">
          <select
            id="Locations"
            name="Locations"
            type="text"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="twInput"
          >
            <option value="">-- Select a Location --</option>
            {data.map((location) => (
              <option value={location.id}>{location.name}</option>
            ))}
          </select>
        </Field>
      </>
    );
  }
};

const SelectCategoryField = ({ categoryId, setCategoryId }) => {
  const getCategories = async () => {
    const res = await fetch("/api/categories");
    return res.json();
  };

  const { data, isSuccess } = useQuery({
    queryKey: "uniqueCategories",
    queryFn: getCategories,
  });
  // console.log({Category_data: data})

  if (!isSuccess || data?.error) {
    return (
      <>
        <ErrorAlert data={data} />
      </>
    );
  } else {
    return (
      <>
        <Field name="Category">
          <select
            id="Categories"
            name="Categories"
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="twInput"
          >
            <option value="">-- Select a Category --</option>
            {data.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </Field>
      </>
    );
  }
};

const SelectUserField = ({ userId, setUserId }) => {
  const getUsers = async () => {
    const res = await fetch("/api/users");
    return res.json();
  };

  const { data, isSuccess } = useQuery({
    queryKey: "uniqueUsers",
    queryFn: getUsers,
  });
  console.log({User_data: data})

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
            <option value="">-- Select Name --</option>
            {data.map((user) => (
              <option value={user.id}>{user.username}</option>
            ))}
          </select>
        </Field>
      </>
    );
  }
};

const NewReportPage = () => {
  const router = useRouter();
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationId, setLocationId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [userId, setUserId] = useState("");

  const postReport = async () => {
    const formData = {
      report: {
        title: title,
        description: description,
        location_id: locationId,
        category_id: categoryId,
        user_id: userId,
      },
    };
    const res = await fetch("/api/reports", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: "Post Report",
    mutationFn: postReport,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Report created successfully");
        router.push("/");
      }
    },
  });

  return (
    <Layout title="Submit Report">
      <SectionHeader title="Please Explain Your Near Miss">
        <Button label="Cancel" href="/" />
        <Button label="Save" onClick={mutate} disable={isLoading} />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={data} />
        <Form onSubmit={mutate}>
          <Field name="Title">
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              disable={isLoading}
              className="twInput"
            />
          </Field>
          <Field name="Description">
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              disable={isLoading}
              className="twInput"
            />
          </Field>
          <SelectLocationField
            locationId={locationId}
            setLocationId={setLocationId}
          />
          <SelectCategoryField
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
          <SelectUserField userId={userId} setUserId={setUserId} />
        </Form>
      </SectionBody>
    </Layout>
  );
};

export default NewReportPage;
