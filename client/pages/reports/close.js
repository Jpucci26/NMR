import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from "react";
import { successToastAtom } from "../../atoms/successToastAtom";
import { confettiAtom } from "../../atoms/confettiAtom";
import { useAtom } from "jotai";
import {
  Layout,
  SectionHeader,
  Button,
  Field,
  SectionBody,
  Form,
  ErrorAlert,
  ReportDetails,
} from "/components";

const ClosePage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const [confetti, setConfetti] = useAtom(confettiAtom);
  const router = useRouter();
  const reportId = router.query.id;

  const [finalAction, setFinalAction] = useState("");
  // get report details

  const getReport = async () => {
    const res = await fetch(`/api/reports/${reportId}`);
    return res.json();
  };

  const { data: report, isSuccess } = useQuery({
    queryKey: `reports/${reportId}`,
    queryFn: getReport,
    enabled: reportId !== undefined,
    onSuccess: (d) => {
      setFinalAction(d.final_action);
    },
  });

  // update report mutation

  const closeReport = async () => {
    const formData = {
      report: {
        final_action: finalAction,
      },
    };
    const res = await fetch(`/api/reports/${reportId}/close`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: `close ${reportId}`,
    mutationFn: closeReport,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Report Closed successfully");
        setConfetti(true);
        setTimeout(() => setConfetti(false), 10000);
        router.push(`/reports/show?id=${reportId}`);
      }
    },
  });

  if (!isSuccess) {
    return <Layout title="Reports"></Layout>;
  }

  return (
    <Layout title="Reports">
      <SectionHeader title="Close Report">
        <Button label="Cancel" href={`/reports/show?id=${reportId}`} />
        <Button label="Close Report" disabled={isLoading} onClick={mutate} />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={data} />
        <ReportDetails report={report} />
        <Form onSubmit={mutate}>
          <Field name="Final Action">
            <textarea
              id="final_action"
              name="final_action"
              type="text"
              value={finalAction}
              onChange={(e) => setFinalAction(e.target.value)}
              className="twInput"
              disabled={isLoading}
            />
          </Field>
        </Form>
      </SectionBody>
    </Layout>
  );
};

export default ClosePage;
