"use client";

import { useFolders } from "@/app/providers/FoldersProvider";

const Aside = () => {
  const { folders } = useFolders();
  return (
    <div className="border-gray-400 border-r bg-[#f8fafc] py-4 px-3.5">
      <p>Папки</p>
      <ul>
        {folders.map((folder) => (
          <li className="flex items-center gap-1">
            <div> {folder.icon}</div>
            <span> {folder.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Aside;
