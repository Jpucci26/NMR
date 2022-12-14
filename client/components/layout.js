import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { currentUserAtom } from "../atoms/currentUserAtom";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { successToastAtom } from "../atoms/successToastAtom";

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "Submit Report", href: "/reports/new", current: false },
  { name: "Categories", href: "/categories", current: false },
  { name: "Locations", href: "/locations", current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Layout = ({ children, title }) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [successToast, setSuccessToast] = useAtom(successToastAtom);
  const router = useRouter();

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
        setSuccessToast("You have been logged out");
        router.push("/sessions/login");
      }
    });
  };

  // const user = {
  //   name: "Tom Cook",
  //   email: "tom@example.com",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  // };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="flex flex-col min-h-screen">
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "px-3 py-2 rounded-md text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {currentUser !== null ? (
                            <span
                              className="h-8 w-8 rounded-full text-gray-200"
                              alt=""
                            >
                              {currentUser.username}
                              <a
                                onClick={handleLogout}
                                className="cursor-pointer ml-2"
                              >
                                Logout
                              </a>
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    <Disclosure.Button
                      onClick={handleLogout}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Logout
                    </Disclosure.Button>
                  </div>
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5"></div>
                    <div className="mt-3 space-y-1 px-2">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as= {Link}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {title}
              </h1>
            </div>
          </header>
        </div>

        <main className="flex flex-col grow -mt-32 h-full">
          <div className="grow flex flex-col max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="rounded-lg bg-white grow px-5 py-6 h-min-s96 shadow sm:px-6">
              {children}
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};
