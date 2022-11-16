import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from "react";
import { successToastAtom } from "../../atoms/successToastAtom";
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

const RCAPage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();
  const reportId = router.query.id;

  const [correctiveAction, setCorrectiveAction] = useState("");
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
      setCorrectiveAction(d.corrective_action || "");
    },
  });

  // update report mutation

  const correctReport = async () => {
    const formData = {
      report: {
        corrective_action: correctiveAction,
      },
    };
    const res = await fetch(
      `/api/reports/${reportId}/record_corrective_action`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: `Record_corrective_action ${reportId}`,
    mutationFn: correctReport,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Corrective Action Recorded successfully");
        router.push(`/reports/show?id=${reportId}`);
      }
    },
  });

  if (!isSuccess) {
    return <Layout title="Reports"></Layout>;
  }

  return (
    <Layout title="Reports">
      <SectionHeader title="Record Corrective Action">
        <Button label="Cancel" href={`/reports/show?id=${reportId}`} />
        <Button
          label="Record Corrective Action"
          disabled={isLoading}
          onClick={mutate}
        />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={data} />
        <ReportDetails report={report} />
        <Form onSubmit={mutate}>
          <Field name="Corrective Action">
            <textarea
              id="corrective_action"
              name="corrective_action"
              type="text"
              value={correctiveAction}
              onChange={(e) => setCorrectiveAction(e.target.value)}
              className="twInput"
              disabled={isLoading}
            />
          </Field>
        </Form>
      </SectionBody>
    </Layout>
  );
};

export default RCAPage;
