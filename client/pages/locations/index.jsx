import Link from "next/link";
import { useQuery } from "react-query";
import { Layout, SectionHeader, Button, SectionBody } from "/components";

const LocationsPage = () => {
  const getLocations = async () => {
    const res = await fetch("/api/locations");
    return res.json();
  };
  const { data } = useQuery("locations", getLocations);

  if (!data || data.error) return <Layout title="Locations" />;

  return (
    <Layout title="Locations">
      <SectionHeader title="Locations">
        <Button label="Add Location" href="/locations/new" />
      </SectionHeader>
      <SectionBody>
        {data.map((location) => {
          return (
            <Link
              key={location.id}
              href={`/locations/show?id=${location.id}`}
              className="block p-1 underline text-indigo-600"
            >
              {location.name}
            </Link>
          );
        })}
      </SectionBody>
    </Layout>
  );
};

export default LocationsPage;
