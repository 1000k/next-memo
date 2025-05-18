import React from 'react';

export default function Memo() {
  return (
    <div className="flex flex-col h-screen">
      <form action="">
        <input
          id="memo"
          type="text"
          placeholder="Input your memo here..."
          className="border-2 border-gray-300 rounded-md p-2 mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
        >
          add
        </button>
      </form>
      <ul>
        {Array.from({ length: 10 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center justify-between mb-2"
          >
            <span className="text-left">memo</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-yellow-700 rounded hover:bg-yellow-500">
                edit
              </button>
              <button className="px-2 py-1 bg-red-700 rounded hover:bg-red-500">
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
