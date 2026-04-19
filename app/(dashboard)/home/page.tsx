import Header from "../components/Header";
import Aside from "./components/Aside";
import LastNotes from "./components/LastNotes";
import CreateNote from "./components/CreateNote";

const Page = () => {
  return (
    <div className="grid grid-cols-[230px_300px_1fr] w-full">
      <Aside />
      <LastNotes />
      <CreateNote />
    </div>
  );
};

export default Page;
