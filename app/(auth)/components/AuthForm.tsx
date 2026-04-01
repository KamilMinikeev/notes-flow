"use client";

import { useState } from "react";

import { StickyNote } from "lucide-react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Tab = "login" | "register";

const AuthForm = () => {
  const tabs: { label: string; value: Tab }[] = [
    {
      value: "login",
      label: "Вход",
    },
    {
      value: "register",
      label: "Регистрация",
    },
  ];
  const [activeTab, setActivetab] = useState<Tab>("login");

  const openForm = function (value: Tab) {
    setActivetab(value);
  };

  const tabComponents: Record<Tab, React.ReactNode> = {
    login: <LoginForm />,
    register: <RegisterForm />,
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-12 h-12 bg-linear-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg">
          <StickyNote className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-semibold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
          NotesFlow
        </h1>
      </div>

      <div className="grid w-full grid-cols-2 p-0.75 bg-[#ececf0] text-sm font-medium rounded-2xl mb-2">
        {tabs.map((tab) => (
          <button
            onClick={() => openForm(tab.value)}
            key={tab.value}
            className={`py-1 px-2 flex justify-center items-center text-center rounded-2xl ${activeTab === tab.value && "bg-white"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabComponents[activeTab]}
    </div>
  );
};

export default AuthForm;
