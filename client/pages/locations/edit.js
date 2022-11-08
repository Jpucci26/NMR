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

const EditLocationPage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();
  const locationId = router.query.id;

  const [name, setName] = useState("");

  // get location details

  const getLocation = async () => {
    const res = await fetch(`/api/locations/${locationId}`);
    return res.json();
  };

  const { isSuccess, status } = useQuery({
    queryKey: `locations/${locationId}`,
    queryFn: getLocation,
    enabled: locationId !== undefined,
    onSuccess: (d) => {
      setName(d.name);
    },
  });

  // update location mutation

  const updateLocation = async () => {
    const formData = {
      location: {
        name: name,
      },
    };
    const res = await fetch(`/api/locations/${locationId}`, {
      method: "put",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: "Update location",
    mutationFn: updateLocation,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Location updated successfully");
        router.push("/locations");
      }
    },
  });

  if (!isSuccess) {
    return <Layout title="Locations">{status}</Layout>;
  }

  return (
    <Layout title="Locations">
      <SectionHeader title="Edit location">
        <Button label="Cancel" href="/locations" />
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
        </Form>
      </SectionBody>
    </Layout>
  );
};

export default EditLocationPage;
