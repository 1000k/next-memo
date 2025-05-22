'use client';

import { create } from '@/actions/actions';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { EditIcon } from '@/components/icons';

const initialState = {
  message: '',
};

export default function MemoAdd() {
  const [state, , isPending] = useActionState(create, initialState);
  const router = useRouter();

  // Server Actionをラップした関数
  async function handleSubmit(formData: FormData) {
    await create(initialState, formData);

    // フォームをリセット
    const formElement = document.querySelector('form') as HTMLFormElement;
    if (formElement) {
      formElement.reset();
    }

    // ページを再検証して最新のデータを取得
    router.refresh();

    // カスタムイベントを発火して新しいメモが追加されたことを通知
    const event = new CustomEvent('memo-added', { bubbles: true });
    document.dispatchEvent(event);
  }

  return (
    <form
      action={handleSubmit}
      className="flex w-2/3 items-center"
    >
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Input your memo here..."
        className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        required
        disabled={isPending}
      />
      <button
        type="submit"
        className="text-gray-400 transition duration-150 ease-in-out rounded-md p-2 ml-4 hover:bg-gray-700 hover:text-white"
        disabled={isPending}
        aria-disabled={isPending}
      >
        <EditIcon />
      </button>
      <p
        aria-live="polite"
        className="sr-only"
        role="status"
      >
        {state?.message}
      </p>
    </form>
  );
}
