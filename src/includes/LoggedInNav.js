import { useState, useEffect } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Rainbow } from "lucide-react";

const navigation = [
  { name: "UserDash", href: "/userdash", current: false },
  { name: "Games", href: "./games", current: false },
  { name: "InteractiveMap", href: "./interactiveMap", current: false },
  { name: "Department", href: "./department", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const handleLogout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  window.location.href = "/login";
};

export default function LoggedInNav() {
  const [userData, setUserData] = useState({ first_name: "", department: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/userdata", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Disclosure as="nav" className="w-64 bg-green-600 p-4 flex flex-col fixed h-full justify-between">
        {({ open }) => (
          <>
            <div>
              <div className="flex items-center justify-between mb-6">
                <Rainbow className="h-8 w-auto text-white" />
                <DisclosureButton className="sm:hidden text-white p-2 focus:outline-none">
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </DisclosureButton>
              </div>

              {/* Display User Info */}
              <div className="text-white mb-6">
                <p className="text-lg font-semibold">Welcome {userData.first_name}!</p>
                <p className="text-sm">You're in: {userData.department}</p>
              </div>

              <div className="hidden sm:block">
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? "bg-gray-900 text-white" : "text-white hover:bg-white hover:text-pink-600",
                        "block px-4 py-2 rounded-md text-lg font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <DisclosurePanel className="sm:hidden mt-4">
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-4 py-2 rounded-md text-lg font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </DisclosurePanel>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-auto bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Logout
            </button>
          </>
        )}
      </Disclosure>
    </div>
  );
}
