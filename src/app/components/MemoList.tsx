'use client';
import { update } from '@/actions/actions';
import { useState } from 'react';
import { deleteMemo } from '@/actions/actions';

type Memo = {
  id: number;
  title: string;
};

export default function MemoList({ memos }: { memos: Memo[] }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const startEditing = (memo: Memo) => {
    setEditingId(memo.id);
    setEditingTitle(memo.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return (
    <ul>
      {memos.map((memo) => (
        <li
          key={memo.id}
          className="flex items-center justify-between mb-2"
        >
          {editingId === memo.id ? (
            <form
              action={update}
              className="flex w-full"
              onSubmit={() => setEditingId(null)}
            >
              <input
                type="hidden"
                name="id"
                value={memo.id}
              />
              <input
                type="text"
                name="title"
                className="border border-gray-300 rounded px-2 py-1 w-full mr-4"
                value={editingTitle}
                onChange={(e) => {
                  setEditingTitle(e.target.value);
                }}
              />
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-yellow-700 rounded hover:bg-yellow-500"
                  type="submit"
                >
                  save
                </button>
                <button
                  className="px-2 py-1 bg-red-700 rounded hover:bg-red-500"
                  onClick={() => {
                    cancelEditing();
                  }}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <span className="text-left">{memo.title}</span>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-yellow-700 rounded hover:bg-yellow-500"
                  onClick={() => {
                    startEditing(memo);
                  }}
                >
                  edit
                </button>
                <button
                  className="px-2 py-1 bg-red-700 rounded hover:bg-red-500"
                  onClick={() => {
                    deleteMemo(memo.id);
                  }}
                >
                  delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
