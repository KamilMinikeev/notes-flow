"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [registerName, setRegisterName] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 w-full">
      <div className="mb-6">
        <h4 className="mb-1.5 font-bold">Регистрация</h4>
        <p className="text-[#717185]">Создайте новый аккаунт</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm" htmlFor="register-name">
            Имя
          </label>
          <input
            id="register-name"
            type="text"
            placeholder="Ваше имя"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            required
            className="bg-[#f3f3f5] rounded-md py-1 px-3 placeholder-[#717182] text-sm transition-[color,box-shadow] outline-none file:inline-flex "
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="your@email.com"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
            className="bg-[#f3f3f5] rounded-md py-1 px-3 placeholder-[#717182] text-sm transition-[color,box-shadow] outline-none file:inline-flex "
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm" htmlFor="register-password">
            Пароль
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="Введите ваш пароль"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
            className="bg-[#f3f3f5] rounded-md py-1 px-3 placeholder-[#717182] text-sm transition-[color,box-shadow] outline-none file:inline-flex "
          />
        </div>
        <button className="py-2 px-4 text-white text-center font-bold text-sm w-full rounded-md bg-[#030213] hover:bg-[color-mix(in_oklab,_#030213_90%,_transparent)]">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
