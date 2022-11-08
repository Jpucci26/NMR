import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { successToastAtom } from "/atoms/successToastAtom";
import { Transition } from "@headlessui/react";

export const SuccessToast = () => {
  const [show, setShow] = useState(false);
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
    setSuccessToast();
  };

  const hideToast = () => {
    setShow(false);
  };

  const runAnimation = () => {
    if (successToast) {
      setShow(true)
      setTimeout(hideToast, 1500);
      setTimeout(clearToast, 1000);
    }
  };

  useEffect(runAnimation, [successToast]);

  return (
    <div
      id="toast-top-right"
      className="flex absolute -top-16 right-10 w-60"
      role="alert"
    >
      <Transition
        show={show}
        enter="transform transition ease-in-out duration-500"
        enterFrom="opacity-0 translate-y-0"
        enterTo="opacity-100 translate-y-20"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="opacity-100 translate-y-20"
        leaveTo="opacity-0 translate-y-0"
      >
        <div className="rounded-md w-60 bg-green-50 p-4 transition-all duration-500 ease-in-out">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {successToast}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};
