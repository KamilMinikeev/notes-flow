import Header from "./components/Header";

import { NotesProvider } from "../providers/NotesProvider";
import { NoteContentProvider } from "../providers/NoteContentProvider";
import { DraftModalProvider } from "../providers/DraftModalProvider";
import { DeleteModalProvider } from "../providers/DeleteModalProvider";
import { DeleteFolderModalProvider } from "../providers/DeleteFolderModalProvider";
import { EditorProvider } from "../providers/EditorProvider";
import { FoldersProvider } from "../providers/FoldersProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex">
        <DraftModalProvider>
          <DeleteModalProvider>
            <DeleteFolderModalProvider>
              <EditorProvider>
                <NotesProvider>
                  <NoteContentProvider>
                    <FoldersProvider>{children}</FoldersProvider>
                  </NoteContentProvider>
                </NotesProvider>
              </EditorProvider>
            </DeleteFolderModalProvider>
          </DeleteModalProvider>
        </DraftModalProvider>
      </main>
    </div>
  );
}
