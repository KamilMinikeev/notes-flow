export type Tag = {
  id: string;
  name: string;
  color?: string;
};

export type TextBlock = {
  id: string;
  type: "text";
  html: string;
};

// другие блоки...

export type Block = TextBlock;

export type Note = {
  id: string;
  title: string;
  text: string;
  tagsId: string[];
  content: any;
  createdAt: number;
  isDraft?: boolean;
  updatedAt?: number;
  folder?: string;
};
