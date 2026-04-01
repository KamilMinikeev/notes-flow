import AuthInfo from "./components/AuthInfo";
import AuthForm from "./components/AuthForm";

const Page = () => {
  return (
    <div className="flex items-center justify-center bg-[#f7f4ff] w-full min-h-screen px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        <AuthInfo />
        <AuthForm />
      </div>
    </div>
  );
};

export default Page;
