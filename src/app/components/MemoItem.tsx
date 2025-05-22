'use client';

import { useState } from 'react';
import { deleteMemo, update } from '@/actions/actions';

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
              <title>Save</title>
            </svg>
          </button>
          <button
            className="px-2 py-1 rounded-2xl text-gray-400 hover:text-white "
            onClick={cancelEditing}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
              <title>Cancel</title>
            </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            <title>Edit</title>
          </svg>
        </button>
        <button
          className="px-2 py-1 text-gray-500 rounded-2xl hover:text-red-500"
          onClick={() => deleteMemo(memo.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
            <title>Delete</title>
          </svg>
        </button>
      </div>
    </div>
  );
} 