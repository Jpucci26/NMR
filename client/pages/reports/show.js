import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Layout, SectionHeader, Button, SectionBody, ReportDetails, ReportNotes } from "/components";

const UserDetail = ({ user, header }) => {
  if (!user) {
    return <></>;
  } else {
    return (
      <>
        <h3 className="mt-3 mb-3 text-lg">{header}</h3>
        <div className="text-gray-700 text-sm">
          <p>{user.username}</p>
          <p>{user.title}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      </>
    );
  }
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
      <Button label="Back" href="/" />
        {data.status == "pending_corrective_action" ? (
          <>
            <Button
              label="Record Corrective Action"
              href={`/reports/record_corrective_action?id=${reportId}`}
            />
            <Button label="Clarify" href={`/reports/clarify?id=${reportId}`} />
          </>
        ) : null}
        {data.status == "pending_final_action" ? (
          <>
            <Button
              label="Close Report"
              href={`/reports/close?id=${reportId}`}
            />
            <Button label="Revert" href={`/reports/revert?id=${reportId}`} />
          </>
        ) : null}
      </SectionHeader>
      <SectionBody>
        <div className="flex">
          <div className="grow mr-4">
          <ReportDetails report={data} />
          <ReportNotes report={data} />
          </div>
          <div className="w-64">
            <UserDetail user={data.user} header="Submitted By" />
            <UserDetail user={data.category_lead} header="Category Lead" />
          </div>
        </div>
      </SectionBody>
    </Layout>
  );
};

export default ShowReportsPage;
