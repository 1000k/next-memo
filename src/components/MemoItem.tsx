'use client';

import { useState } from 'react';
import { deleteMemo, update } from '@/actions/actions';
import { EditIcon, CancelIcon, DeleteIcon, SaveIcon } from '@/components/icons';

type Memo = {
  id: number;
  title: string;
  order?: number;
};

export default function MemoItem({ memo }: { memo: Memo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(memo.title);

  const startEditing = () => {
    setIsEditing(true);
    setEditingTitle(memo.title);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleUpdate = async (formData: FormData) => {
    await update(formData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        action={handleUpdate}
        className="flex w-full"
      >
        <input
          type="hidden"
          name="id"
          value={memo.id}
        />
        <input
          type="text"
          name="title"
          className="border border-gray-400 rounded px-2 py-1 w-full mr-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          value={editingTitle}
          onChange={(e) => {
            setEditingTitle(e.target.value);
          }}
        />
        <div className="flex gap-2">
          <button
            className="px-2 py-1 rounded-2xl text-gray-400 hover:text-white "
            type="submit"
          >
            <SaveIcon />
          </button>
          <button
            className="px-2 py-1 rounded-2xl text-gray-400 hover:text-white "
            onClick={cancelEditing}
            type="button"
          >
            <CancelIcon />
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-left">{memo.title}</span>
      <div className="flex gap-2 ml-auto">
        <button
          className="px-2 py-1 rounded-2xl text-gray-500 hover:text-white "
          onClick={startEditing}
        >
          <EditIcon />
        </button>
        <button
          className="px-2 py-1 text-gray-500 rounded-2xl hover:text-red-500"
          onClick={() => deleteMemo(memo.id)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
