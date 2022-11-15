import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Layout, SectionHeader, Button, ReportStatus, SectionBody } from "/components";

const ReportDetails = ({ report }) => {
  return (
    <div className="mt-2 mb-2 bg-gray-50 text-gray-800 text-sm p-2">
      <p>Title: {report.title}</p>
      <p>Description: {report.description}</p>
      <p>Location: {report.location.name}</p>
      <p>Category: {report.category.name}</p>
      <p>Corrective Action: {report.corrective_action}</p>
      <p>Final Action: {report.final_action}</p>
      <p>Reported At: {report.created_at_fmt}</p>
      <p>Reported By: {report.user.username}</p>
      <p>Status: <ReportStatus report={report}/></p>
    </div>
  );
};

const ShowReportsPage = () => {
  const router = useRouter();
  const reportId = router.query.id;
  // console.log({ reportId });

  const getReport = async () => {
    const res = await fetch(`/api/reports/${reportId}`);
    return res.json();
  };

  const { data, isSuccess } = useQuery({
    queryKey: `reports/${reportId}`,
    queryFn: getReport,
    enabled: reportId !== undefined,
  });

  // const { data, isSuccess } = useQuery(
  //   `reports/${reportId}`,
  //   getReport
  // );

  if (!isSuccess) return <Layout title="Reports" />;

  return (
    <Layout title="Reports">
      <SectionHeader title={data.title}>
        {data.status == "pending_corrective_action" ? (
          <>
            <Button
              label="Record Corrective Action"
              href={`/reports/recordcorrectiveaction?id=${reportId}`}
            />
            <Button label="Clarify" href={`/reports/clarify?id=${reportId}`} />
          </>
        ) : null}
        {data.status == "pending_final_action" ? (
          <>
            <Button
              label="Close Report"
              href={`/reports/closereport?id=${reportId}`}
            />
            <Button label="Revert" href={`/reports/revert?id=${reportId}`} />
          </>
        ) : null}
        {/* <Button label="Delete" href={`/reports/delete?id=${reportId}`} /> */}
        {/* <Button label="Delete" href="/" /> */}
      </SectionHeader>
      <SectionBody>
        <ReportDetails report={data} />
      </SectionBody>
    </Layout>
  );
};

export default ShowReportsPage;
