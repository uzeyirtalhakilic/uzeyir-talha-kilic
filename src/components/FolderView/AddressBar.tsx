import React from "react";

const AddressBar: React.FC = () => (
  <div className="flex items-center h-6 bg-white border-b border-[#b5cbe9] px-2 text-xs">
    <span className="mr-2 text-[#3a6ea5] font-semibold">Address</span>
    <input
      className="flex-1 px-2 py-0.5 border border-[#b5cbe9] rounded text-xs bg-[#f8fafc]"
      value="C:\\My Computer"
      readOnly
      style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
    />
    <button className="ml-2 px-2 py-0.5 border rounded bg-[#e5eefa] border-[#b5cbe9] font-semibold text-[#3a6ea5] shadow">
      Go
    </button>
  </div>
);

export default AddressBar; 