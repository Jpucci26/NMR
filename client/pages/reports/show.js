import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Layout, SectionHeader, Button, SectionBody } from "/components";


const ReportDetails = ({ report }) => {
    return (
      <div className="mt-2 mb-2 bg-gray-50 text-gray-800 text-sm p-2">
        <p>Title: {report.title}</p>
        <p>Description: {report.description}</p>
        <p>Status: {report.status}</p>
      </div>
    );
  };



const ShowReportsPage = () => {
  const router = useRouter();
  const reportId = router.query.id;

  const getReport = async () => {
    const res = await fetch(`/api/reports/${reportId}`);
    return res.json();
  };
  const { data, error, isSuccess } = useQuery(
    `reports/${reportId}`,
    getReport
  );

  if (!isSuccess) return <Layout title="Reports" />;

  return (
    <Layout title="Reports">
      <SectionHeader title={data.title}>
        <Button label="Back" href="/reports" />
        <Button label="Edit" href={`/reports/edit?id=${reportId}`} />
        <Button label="Delete" href={`/reports/delete?id=${reportId}`} />
      </SectionHeader>
      <SectionBody>
        <ReportDetails report={data} />
      </SectionBody>
    </Layout>
  );
};

export default ShowReportsPage;