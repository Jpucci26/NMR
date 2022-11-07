import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { successToastAtom } from "../atoms/successToastAtom";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { Transition } from "@headlessui/react";

export const SuccessToast = () => {
  const [successToast, setSuccessToast] = useAtom(successToastAtom);

  // *********************************************
  //
  // WARNING!!!
  //
  // SOMETHING ABOUT THIS FILE WRECKS HOT RELOAD
  // YOU MAY NEED TO RESTART NEXT.JS
  //
  // *********************************************

  const clearToast = () => {
    setSuccessToast("");
  };

  const conditionallyClearToastLater = () => {
    if (successToast && successToast !== "") {
      setTimeout(clearToast, 3000);
    }
  };

  useEffect(conditionallyClearToastLater, [successToast]);
  return (
    <Transition
      show={!!successToast && successToast !== ""}
      enter="transform transition ease-in-out duration-1000"
      enterFrom="opacity-0 translate-y-0"
      enterTo="opacity-100 translate-y-0"
      leave="transform transition ease-in-out duration-1000"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-0"
    >
      <div className="rounded-md bg-green-50 p-4 transition-all duration-500 ease-in-out">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">{successToast}</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={clearToast}
                type="button"
                className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
