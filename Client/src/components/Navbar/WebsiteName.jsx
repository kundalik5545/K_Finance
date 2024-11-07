import React from "react";
import { HandCoins, IndianRupee } from "lucide-react";
const websiteName = import.meta.env.VITE_WEBSITE_NAME;
const websiteURL = import.meta.env.VITE_WEBSITE_URL;
function WebsiteName() {
  return (
    <div>
      <a
        href={websiteURL}
        className="flex items-center space-x-1 rtl:space-x-reverse"
      >
        <IndianRupee size={40} />
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
          {websiteName}
        </span>
      </a>
    </div>
  );
}

export default WebsiteName;
