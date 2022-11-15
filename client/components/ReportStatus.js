

 export const ReportStatus = ({ report }) => {
    let c = "";
  
    if (report.status === "pending_final_action") {
      c = "bg-yellow-100 rounded-full px-2 text-red-800";
    }
  
    if (report.status === "pending_corrective_action") {
      c = "bg-red-200 rounded-full px-2 text-red-800";
    }
  
    if (report.status === "closed") {
      c = "bg-green-100 rounded-full px-2 text-green-800";
    }
  
    return <span className={c}>{report.status}</span>;
  }