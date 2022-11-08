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

const DeleteLocationPage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();
  const locationId = router.query.id;

  const [name, setName] = useState("");

  // Get Location Query

  const getLocation = async () => {
    const res = await fetch(`/api/locations/${locationId}`);
    return res.json();
  };

  const { data, isSuccess, status } = useQuery({
    queryKey: `locations/${locationId}`,
    queryFn: getLocation,
    enabled: locationId !== undefined,
    onSuccess: (d) => {
      setName(d.name);
    },
  });

  // Delete Location Mutation

  const deleteLocation = async () => {
    const res = await fetch(`/api/locations/${locationId}`, {
      method: "delete",
    });
    return res.json();
  };

  const {
    mutate,
    data: updatedData,
    isLoading,
  } = useMutation({
    mutationKey: "Delete Location",
    mutationFn: deleteLocation,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Location deleted successfully");
        router.push("/locations");
      }
    },
  });

  if (!isSuccess) {
    return <Layout title="Delete Locations">{status}</Layout>;
  }

  return (
    <Layout title="Locations">
      <SectionHeader title={`Delete: ${data.name}`}>
        <Button label="Cancel" href={`/locations/show?id=${locationId}`} />
        <Button label="Delete" disabled={isLoading} onClick={mutate} />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={updatedData} />
      </SectionBody>
    </Layout>
  );
};

export default DeleteLocationPage;
