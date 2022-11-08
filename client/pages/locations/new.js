import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
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

const AddLocationPage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();

  // Control Form input values
  // with React's useState Hooks
  const [name, setName] = useState("");

  // Add Location Mutation

  const postLocation = async () => {
    const formData = {
      location: {
        name: name,
      },
    };
    const res = await fetch(`/api/locations`, {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: "Add Location",
    mutationFn: postLocation,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Location added successfully");
        router.push("/locations");
      }
    },
  });

  return (
    <Layout title="Locations">
      <SectionHeader title="Add Location">
        <Button label="Cancel" href="/locations" />
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

export default AddLocationPage;