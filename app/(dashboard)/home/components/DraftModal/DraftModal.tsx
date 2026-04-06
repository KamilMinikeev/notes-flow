"use client";

type DraftModalProps = {
  isOpen: boolean;
  onSave: () => void;
  onDiscard: () => void;
};

export default function DraftModal({
  isOpen,
  onSave,
  onDiscard,
}: DraftModalProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? "flex" : "hidden"}`}
      >
        {/* overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => onDiscard()}
        />

        {/* modal */}
        <div
          className={`flex flex-col relative bg-white w-full max-w-4xl rounded-2xl p-6 shadow-xl h-full`}
        >
          <h3 className="mb-2">Сохранить ваш черновик?</h3>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => onDiscard()}
              className="px-4 py-2 rounded-lg border border-zinc-500 text-gray-500 hover:text-black"
            >
              Отмена
            </button>

            <button
              onClick={() => onSave()}
              className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
