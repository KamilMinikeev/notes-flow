import { useState } from "react";

export const useEditorKey = () => {
  const [editorKey, setEditorKey] = useState(0);
  const [tagsModalKey, setTagsModalKey] = useState(0);

  const resetKey = () => {
    setEditorKey((prev) => prev + 1);
    setTagsModalKey((prev) => prev + 1);
  };

  return {
    editorKey,
    setEditorKey,
    tagsModalKey,
    resetKey,
  };
};
