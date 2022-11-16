import { XCircleIcon } from "@heroicons/react/20/solid";

export const ErrorAlert = ({ data }) => {
  if (data?.error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{data.error}</h3>
            {data?.errors ? (
              <ul role="list" className="list-disc space-y-1 pl-5">
                {Object.keys(data.errors).map((key) => {
                  return (
                    <li key={key}>
                      {key}: {data.errors[key]}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};