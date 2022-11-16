import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "react-query";
import { Layout, SectionHeader, Button, SectionBody, ErrorAlert } from "/components";






const ShowLocationsPage = () => {
  const router = useRouter();
  const locationId = router.query.id;

  const ListReports = ({ locationId }) => {
    const getReports = async () => {
      const res = await fetch(`/api/locations/${locationId}/reports`);
      return res.json();
    };
    const { data, isSuccess } = useQuery(
      `/locations/${locationId}/reports`,
      getReports
    );
  
    if (!isSuccess || data?.error) {
      return (
        <>
          <ErrorAlert data={data} />
        </>
      );
    } else {
      return (
        <>
          <h3 className="mt-3 mb-3 text-md">Reports</h3>
          <div className="text-gray-700 text-sm">
            {data.map((report) => (
              <Link
                href={`/reports/show?id=${report.id}`}
                className="block p-1 underline text-indigo-600"
              >
                <p>{report.title}</p>
              </Link>
            ))}
          </div>
        </>
      );
    }
  };

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
      <SectionBody>
        <ListReports locationId={locationId} />
      </SectionBody>
    </Layout>
  );
};

export default ShowLocationsPage;
