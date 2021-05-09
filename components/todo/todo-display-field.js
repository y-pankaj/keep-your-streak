import React from "react";

export default function TodoDisplayField() {
  return (
    <div className="flex justify-between py-2 px-4 my-1 border-t-2 border-b-2 border-transparent hover:border-gray-600">
      <div className="space-x-4 flex items-end">
        <div className="">
          <input type="checkbox" value="Bike" className="h-4 w-4" />
        </div>

        <span className="text-lg">This is some random info written here</span>
      </div>
      <button className="w-6 h-6 hover:bg-gray-300 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
