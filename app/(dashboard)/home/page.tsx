import Header from "../components/Header";
import Aside from "./components/Aside/Aside";
import LastNotes from "./components/LastNotes";
import CreateNote from "./components/CreateNote";
import FolderModal from "./components/Modals/FolderModal";

const Page = () => {
  return (
    <>
      <div className="grid grid-cols-[230px_300px_1fr] w-full">
        <Aside />
        <LastNotes />
        <CreateNote />
      </div>
      <FolderModal />
    </>
  );
};

export default Page;
