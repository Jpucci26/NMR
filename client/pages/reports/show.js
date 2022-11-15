import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Layout, SectionHeader, Button, ReportStatus, SectionBody } from "/components";

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

const NoteList = ({ report }) => {

  const getNotes = async () => {
    const res = await fetch(`/api/reports/${report.id}/notes`);
    return res.json();
  };

  const { data } = useQuery({
    queryKey: `reports/${report.id}/notes`,
    queryFn: getNotes,
    enabled: report.id !== undefined,
  });

  if (!data || data.error) return <>surpirse</>;

  return(
    <div>
      <h3 className="mt-3 mb-3 text-lg">Notes</h3>
      <div className="text-gray-700 text-sm">
        {data.map((note) => (
          <div key={note.id}>
            <p>{note.task}</p>
            <p>{note.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}




const ReportDetails = ({ report }) => {
  return (
    <div className="mt-2 mb-2 bg-gray-50 p-2">
      <h3 className="mt-3 mb-3 text-lg ">Report Details</h3>
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
          <Button label="Back" href="/" />
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
      </SectionHeader>
      <SectionBody>
        <div className="flex">
          <div className="grow mr-4">
          <ReportDetails report={data} />
          <NoteList report={data} />
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
