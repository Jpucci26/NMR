import Link from "next/link";
import { useQuery } from "react-query";
import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  TagIcon,
} from "@heroicons/react/20/solid";
import { Layout, ErrorAlert } from "/components";
import { useState } from "react";

const SelectStatus = ({ selectedStatuses, setSelectedStatuses }) => {
  // toggle array reducer
  const toggleReducer = (arr, item) => {
    if (arr.includes(item)) {
      return arr.filter((i) => i !== item);
    }
    return [...arr, item];
  };

  return (
    <>
      <h3 className="mb-2 text-lg">Status</h3>
      <div className="space-y-1">
        {["pending_corrective_action", "pending_final_action", "closed"].map(
          (status) => {
            return (
              <div className="relative flex">
                <div className="flex h-5 items-center">
                  <input
                    id={status}
                    onClick={() =>
                      setSelectedStatuses(
                        toggleReducer(selectedStatuses, status)
                      )
                    }
                    aria-describedby="report-status"
                    name={status}
                    checked={selectedStatuses.includes(status)}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={status} className="font-medium text-gray-700">
                    {status.replaceAll("_", " ")}
                  </label>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

const SelectCategories = ({ selectedCategoryIds, setSelectedCategoryIds }) => {
  const getCategories = async () => {
    const res = await fetch("/api/categories");
    return res.json();
  };
  const { data } = useQuery("categories", getCategories);

  // toggle array reducer
  const toggleReducer = (arr, item) => {
    if (arr.includes(item)) {
      return arr.filter((i) => i !== item);
    }
    return [...arr, item];
  };

  if (!data || data?.error) {
    return <ErrorAlert data={data} />;
  }
  return (
    <>
      <h3 className="mb-2 text-lg">Category</h3>
      <div className="space-y-1">
        {data.map((category) => {
          return (
            <div className="relative flex">
              <div className="flex h-5 items-center">
                <input
                  id={category}
                  onClick={() =>
                    setSelectedCategoryIds(
                      toggleReducer(selectedCategoryIds, category.id)
                    )
                  }
                  aria-describedby="report-category"
                  name={category}
                  checked={selectedCategoryIds.includes(category.id)}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={category} className="font-medium text-gray-700">
                  {category.name}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Dashboard = () => {
  const [selectedStatuses, setSelectedStatuses] = useState([
    "pending_corrective_action",
  ]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const getReports = async () => {
    const res = await fetch("/api/reports");
    return res.json();
  };
  let { data } = useQuery("reports", getReports);

  if (data?.error || data === undefined) {
    return <ErrorAlert data={data} />;
  } else {
    if (selectedStatuses.length > 0) {
      data = data.filter((report) => selectedStatuses.includes(report.status));
    }
    if (selectedCategoryIds.length > 0) {
      data = data.filter((report) =>
        selectedCategoryIds.includes(report.category.id)
      );
    }

    return (
      <Layout title="Dashboard">
        <div className="flex flex-row">
          <div className="w-64 p-2">
            <SelectStatus
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
            />
            <SelectCategories
              selectedCategoryIds={selectedCategoryIds}
              setSelectedCategoryIds={setSelectedCategoryIds}
            />
          </div>
          <div className="grow shadow sm:rounded-md">
            <ul
              role="list"
              className="divide-y divide-gray-200"
            >
              {data.map((report) => (
                <li key={report.id}>
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="truncate text-sm font-medium text-indigo-600">
                            {report.title}
                          </p>
                          <p className="text-sm">{report.description}</p>
                        </div>
                        <div className="ml-2 flex flex-shrink-0">
                          <p className="inline-flex text-xs font-semibold leading-5">
                            {StatusPill(report)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <TagIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            {report.category.name}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <UserIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            {report.user.username}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <MapPinIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            {report.location.name}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CalendarIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {report.created_at_fmt}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
};

export default Dashboard;

function StatusPill(report) {
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
