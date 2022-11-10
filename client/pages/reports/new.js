import Link from "next/link";
import Navbar from "../../components/navbar";
import { useQuery, useMutation } from "react-query";
import { useRouter } from "next/router";
import { successToastAtom } from "../../atoms/successToastAtom";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  Layout,
  SectionHeader,
  SectionBody,
  ErrorAlert,
  Button,
  Form,
  Field
} from "/components";

const NewReportPage = () => {
  const router = useRouter();
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const postReport = async () => {
    const formData = {
      report: {
        title: title,
        description: description,
        location_id: location_id,
        category_id: category_id,
      },
    };
    const res = await fetch("/api/reports", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: "Post Report",
    mutationFn: postReport,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Report created successfully");
        router.push("/");
      }
    },
  });

  return (
    <Layout title="Submit Report">
      <SectionHeader title="Report">
        <Button label="Cancel" href="/" />
        <Button label="Save" onClick={mutate} disable={isLoading} />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={data} />

        <div className="md:flex bg-pink-500">
          <div className="md:grow bg-orange-500">1</div>
          <div className="md:w-64 lg:w-80 bg-blue-500">2</div>
        </div>
      </SectionBody>
    </Layout>
  );
};

export default NewReportPage;