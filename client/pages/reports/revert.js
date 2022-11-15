import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import { successToastAtom } from "../../atoms/successToastAtom";
import { useAtom } from "jotai";
import {
  Layout,
  SectionHeader,
  Button,
  SectionBody,
  ErrorAlert,
  ReportDetails
} from "/components";


 




const RevertPage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();
  const reportId = router.query.id;

  // get report details

  const getReport = async () => {
    const res = await fetch(`/api/reports/${reportId}`);
    return res.json();
  };

  const { data:report, isSuccess } = useQuery({
    queryKey: `reports/${reportId}`,
    queryFn: getReport,
    enabled: reportId !== undefined,
  });

  // update report mutation

  const revertReport = async () => {
    const res = await fetch(`/api/reports/${reportId}/revert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: `Revert_report ${reportId}`,
    mutationFn: revertReport,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Report Reverted successfully");
        router.push(`/reports/show?id=${reportId}`);
      }
    },
  });

  if (!isSuccess) {
    return <Layout title="Reports"></Layout>;
  }

  return (
    <Layout title="Reports">
      <SectionHeader title="Revert">
        
        <Button label="Cancel" href={`/reports/show?id=${reportId}`} />
        <Button
          label="Revert"
          disabled={isLoading}
          onClick={mutate}
        />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={data} />
        <ReportDetails report={report} />
      </SectionBody>
    </Layout>
  );
};

export default RevertPage;