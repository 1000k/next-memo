'use client';

import { useState } from 'react';
import { deleteMemo, update } from '@/actions/actions';
import {
  EditIcon,
  CancelIcon,
  DeleteIcon,
  SaveIcon,
  LoadingSpinner,
} from '@/components/icons';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

type Memo = {
  id: number;
  title: string;
  order?: number;
};

const initialState = {
  message: '',
};

type State = typeof initialState;

// Extract common button styles to reduce duplication
const buttonBaseStyle = 'px-2 py-1 rounded-2xl';
const iconButtonStyle = `${buttonBaseStyle} text-gray-500 hover:text-white`;
const deleteButtonStyle = `${buttonBaseStyle} text-gray-500 hover:text-red-500`;

// EditMode component
function EditMode({
  memo,
  onCancel,
  formAction,
  isUpdatePending,
}: {
  memo: Memo;
  onCancel: () => void;
  formAction: (payload: FormData) => void;
  isUpdatePending: boolean;
}) {
  const [editingTitle, setEditingTitle] = useState(memo.title);

  return (
    <form
      action={formAction}
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
        disabled={isUpdatePending}
        autoFocus
        aria-label="メモのタイトルを編集"
      />
      <div className="flex gap-2">
        <button
          className={iconButtonStyle}
          type="submit"
          disabled={isUpdatePending}
          aria-label="保存"
        >
          {isUpdatePending ? <LoadingSpinner /> : <SaveIcon />}
        </button>
        <button
          className={iconButtonStyle}
          onClick={onCancel}
          type="button"
          disabled={isUpdatePending}
          aria-label="キャンセル"
        >
          <CancelIcon />
        </button>
      </div>
    </form>
  );
}

// DeleteConfirmMode component
function DeleteConfirmMode({
  memo,
  onDelete,
  onCancel,
  isDeleting,
}: {
  memo: Memo;
  onDelete: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-left">「{memo.title}」を削除しますか？</span>
      <div className="flex gap-2 ml-auto">
        <button
          className={iconButtonStyle}
          onClick={onDelete}
          disabled={isDeleting}
          aria-label="削除を確定"
        >
          {isDeleting ? <LoadingSpinner /> : <SaveIcon />}
        </button>
        <button
          className={iconButtonStyle}
          onClick={onCancel}
          disabled={isDeleting}
          aria-label="削除をキャンセル"
        >
          <CancelIcon />
        </button>
      </div>
    </div>
  );
}

// ViewMode component
function ViewMode({
  memo,
  onEdit,
  onDeleteRequest,
  isDeleting,
}: {
  memo: Memo;
  onEdit: () => void;
  onDeleteRequest: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-left">{memo.title}</span>
      <div className="flex gap-2 ml-auto">
        <button
          className={iconButtonStyle}
          onClick={onEdit}
          disabled={isDeleting}
          aria-label="メモを編集"
        >
          <EditIcon />
        </button>
        <button
          className={deleteButtonStyle}
          onClick={onDeleteRequest}
          disabled={isDeleting}
          aria-label="メモを削除"
        >
          {isDeleting ? <LoadingSpinner /> : <DeleteIcon />}
        </button>
      </div>
    </div>
  );
}

// Main component that manages state and renders the appropriate mode
export default function MemoItem({ memo }: { memo: Memo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  // Add useActionState for the update action
  const [state, formAction, isUpdatePending] = useActionState(
    async (prevState: State, formData: FormData) => {
      const result = await update(formData);
      setIsEditing(false);
      return result;
    },
    initialState
  );

  // Handle delete with useState
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMemo(memo.id);
      router.refresh();
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // UI state handlers
  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => setIsEditing(false);
  const confirmDelete = () => setShowDeleteConfirm(true);
  const cancelDelete = () => setShowDeleteConfirm(false);

  // Render the appropriate mode based on current state
  if (isEditing) {
    return (
      <EditMode
        memo={memo}
        onCancel={cancelEditing}
        formAction={formAction}
        isUpdatePending={isUpdatePending}
      />
    );
  }

  if (showDeleteConfirm) {
    return (
      <DeleteConfirmMode
        memo={memo}
        onDelete={handleDelete}
        onCancel={cancelDelete}
        isDeleting={isDeleting}
      />
    );
  }

  return (
    <ViewMode
      memo={memo}
      onEdit={startEditing}
      onDeleteRequest={confirmDelete}
      isDeleting={isDeleting}
    />
  );
}
