'use client';

import { create } from '@/actions/actions';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { EditIcon } from '@/components/icons';
import { useRef } from 'react';

const initialState = {
  message: '',
};

export default function MemoAdd() {
  const [state, , isPending] = useActionState(create, initialState);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const notifyMemoAdded = () => {
    const event = new CustomEvent('memo-added', { bubbles: true });
    document.dispatchEvent(event);
  };

  // Server Action wrapper
  async function handleSubmit(formData: FormData) {
    await create(initialState, formData);
    resetForm();
    router.refresh();
    notifyMemoAdded();
  }

  return (
    <form
      ref={formRef}
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
