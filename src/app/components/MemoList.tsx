import MemoItem from './MemoItem';

type Memo = {
  id: number;
  title: string;
};

export default function MemoList({ memos }: { memos: Memo[] }) {
  return memos.length === 0 ? (
    <div className="text-center text-gray-500 justify-center items-center flex flex-col h-96">
      No memos available. Please add a memo.
    </div>
  ) : (
    <ul>
      {memos.map((memo) => (
        <li
          key={memo.id}
          className="flex items-center justify-between mb-2 border border-gray-700 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-100 hover:shadow-gray-700"
        >
          <MemoItem memo={memo} />
        </li>
      ))}
    </ul>
  );
}
