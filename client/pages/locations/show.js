import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Layout, SectionHeader, Button, SectionBody } from "/components";






const ShowLocationsPage = () => {
  const router = useRouter();
  const locationId = router.query.id;

  const getLocation = async () => {
    const res = await fetch(`/api/locations/${locationId}`);
    return res.json();
  };
  const { data, error, isSuccess } = useQuery(
    `locations/${locationId}`,
    getLocation
  );

  if (!isSuccess) return <Layout title="Locations" />;

  return (
    <Layout title="Locations">
      <SectionHeader title={data.name}>
        <Button label="Back" href="/locations" />
        <Button label="Edit" href={`/locations/edit?id=${locationId}`} />
        <Button label="Delete" href={`/locations/delete?id=${locationId}`} />
      </SectionHeader>
      <SectionBody></SectionBody>
    </Layout>
  );
};

export default ShowLocationsPage;
