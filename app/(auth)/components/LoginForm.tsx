"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 w-full">
      <div className="mb-6">
        <h4 className="mb-1.5 font-bold">Вход в систему</h4>
        <p className="text-[#717185]">Введите ваши данные для входа</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="your@email.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            className="bg-[#f3f3f5] rounded-md py-1 px-3 placeholder-[#717182] text-sm transition-[color,box-shadow] outline-none file:inline-flex "
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm" htmlFor="login-password">
            Пароль
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="Введите ваш пароль"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            className="bg-[#f3f3f5] rounded-md py-1 px-3 placeholder-[#717182] text-sm transition-[color,box-shadow] outline-none file:inline-flex "
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 text-white text-center font-bold text-sm w-full rounded-md bg-[#030213] hover:bg-[color-mix(in_oklab,_#030213_90%,_transparent)]"
        >
          Войти
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
