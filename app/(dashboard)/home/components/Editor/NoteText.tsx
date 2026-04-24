"use client";

import { forwardRef } from "react";

type Props = {
  noteText: string;
  onChangeText: (value: string) => void;
};

const NoteText = forwardRef<HTMLTextAreaElement, Props>(
  ({ noteText, onChangeText }, ref) => {
    return (
      <textarea
        ref={ref}
        value={noteText}
        onChange={(e) => onChangeText(e.target.value)}
        className={`h-full font-bold mb-1.5 placeholder-red-500 focus:border-blue-500 focus:outline-none w-full`}
      />
    );
  },
);

export default NoteText;
