interface MemoItemContent {
  content: string;
  preview: string;
}

interface MemoItem extends MemoItemContent {
  id: string;
  create_at: string;
  selected: boolean;
}
