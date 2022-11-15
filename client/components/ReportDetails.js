import { ReportStatus } from "/components";

export const ReportDetails = ({ report }) => {
    if (!report) return <></>;
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