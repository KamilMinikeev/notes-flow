import Header from "./components/Header";

import { NotesProvider } from "../providers/NotesProvider";
import { NoteContentProvider } from "../providers/NoteContentProvider";
import { DraftModalProvider } from "../providers/DraftModalProvider";
import { DeleteModalProvider } from "../providers/DeleteModalProvider";
import { EditorProvider } from "../providers/EditorProvider";

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
            <EditorProvider>
              <NotesProvider>
                <NoteContentProvider>{children}</NoteContentProvider>
              </NotesProvider>
            </EditorProvider>
          </DeleteModalProvider>
        </DraftModalProvider>
      </main>
    </div>
  );
}
