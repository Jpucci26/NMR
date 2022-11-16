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
} from "/components";


 

const SelectCategoryField = ({ setCategoryId, categoryId  }) => {
  const getCategories = async () => {
    const res = await fetch(`/api/categories`);
    return res.json();
  };

  const { data, isSuccess } = useQuery({
    queryKey: `/categories`,
    queryFn: getCategories,
  });

  if (!isSuccess || data?.error) {
    return (
      <>
        <ErrorAlert data={data} />
      </>
    );
  } else {
    return (
      <>
        <Field name="Category">
          <select
            id="Categories"
            name="Categories"
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="twInput"
            // disabled={isLoading}
          >
            {data.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </Field>
      </>
    );
  }
};

const SelectLocationField = ({ setLocationId, locationId  }) => {
  const getLocations = async () => {
    const res = await fetch(`/api/locations`);
    return res.json();
  };

  const { data, isSuccess } = useQuery({
    queryKey: `/locations`,
    queryFn: getLocations,
  });

  if (!isSuccess || data?.error) {
    return (
      <>
        <ErrorAlert data={data} />
      </>
    );
  } else {
    return (
      <>
        <Field name="Location">
          <select
            id="Locations"
            name="Locations"
            type="text"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="twInput"
            // disabled={isLoading}
          >
            {data.map((location) => (
              <option value={location.id}>{location.name}</option>
            ))}
          </select>
        </Field>
      </>
    );
  }
};



const ClarifyReportPage = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();
  const reportId = router.query.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("")
  const [locationId, setLocationId] = useState("")
  // get report details

  const getReport = async () => {
    const res = await fetch(`/api/reports/${reportId}`);
    return res.json();
  };

  const { data:report, isSuccess } = useQuery({
    queryKey: `reports/${reportId}`,
    queryFn: getReport,
    enabled: reportId !== undefined,
    onSuccess: (d) => {
      setTitle(d.title);
      setDescription(d.description);
      setCategoryId(d.category.id);
      setLocationId(d.location.id);
    },
  });

  // update report mutation

  const clarifyReport = async () => {
    const formData = {
      report: {
        title: title,
        description: description,
        category_id: categoryId,
        location_id: locationId,
      },
    };
    const res = await fetch(`/api/reports/${reportId}/clarify`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: `Clarify Report ${reportId}`,
    mutationFn: clarifyReport,
    onSuccess: (d) => {
      if (!d.error) {
        setSuccessToast("Report Clarified successfully");
        router.push(`/reports/show?id=${reportId}`);
      }
    },
  });

  if (!isSuccess) {
    return <Layout title="Reports">{title}</Layout>;
  }

  return (
    <Layout title="Reports">
      <SectionHeader title="Clarify">
        <Button label="Cancel" href={`/reports/show?id=${reportId}`} />
        <Button
          label="Clarify"
          disabled={isLoading}
          onClick={mutate}
        />
      </SectionHeader>
      <SectionBody>
        <ErrorAlert data={data} />
        <Form onSubmit={mutate}>
          <Field name="Title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="twInput"
              disabled={isLoading}
            />
          </Field>
          <Field name="Description">
            <textarea
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="twInput"
              disabled={isLoading}
            />
          </Field>
          <SelectLocationField setLocationId={setLocationId} locationId={locationId} />
          <SelectCategoryField setCategoryId={setCategoryId} categoryId={categoryId} />
        </Form>
      </SectionBody>
    </Layout>
  );
};

export default ClarifyReportPage;
