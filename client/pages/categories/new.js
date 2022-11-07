import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { SectionHeader, Button, Layout, ErrorAlert } from "/components";

const AddCategoryPage = () => {
  const router = useRouter();

  // Control Form input values
  // with React's useState Hooks
  const [name, setName] = useState("");

  const postCategory = async () => {
    const formData = {
      category: {
        name: name,
      },
    };
    const res = await fetch(`/api/categories`, {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { mutate, data, isLoading } = useMutation({
    mutationKey: "Add Category",
    mutationFn: postCategory,
    onSuccess: (d) => {
      if (!d.error) {
        router.push("/categories");
      }
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate();
  }

  return (
    <Layout title="Categories">
      <SectionHeader title="Add Category">
        <Button label="Cancel" href="/categories" />
        <Button label="Save" onClick={mutate} disabled={isLoading} />
      </SectionHeader>
      <div className="px-4 py-5 sm:px-6">
        <ErrorAlert data={data} />

        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      disabled={isLoading}
                      className={`${
                        isLoading ? "bg-gray-200" : null
                      } block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddCategoryPage;
