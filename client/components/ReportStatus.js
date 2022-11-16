

  export const ReportStatus = ({ report }) => {
    let c = "";
    let b = ""
  
    if (report.status === "pending_final_action") {
      c = "bg-yellow-100 rounded-full px-4 py-1 text-red-800";
      b = "Pending Final Action"
    }
  
    if (report.status === "pending_corrective_action") {
      c = "bg-red-200 rounded-full px-4 py-1 text-red-800";
      b = "Pending Corrective Action"
    }
  
    if (report.status === "closed") {
      c = "bg-green-100 rounded-full px-4  py-1 text-green-800";
      b = "Closed"
    }
  
    return <span className={c}>{b}</span>;
  }