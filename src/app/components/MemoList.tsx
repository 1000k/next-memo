'use client';

import { useState, useEffect } from 'react';
import MemoItem from './MemoItem';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { updateMemoOrder } from '@/actions/actions';

type Memo = {
  id: number;
  title: string;
  order: number;
};

function SortableMemoItem({ memo }: { memo: Memo }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: memo.id,
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center justify-between mb-2 border border-gray-700 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-100 hover:shadow-gray-700 cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center w-full">
        <div className="mr-2 text-gray-500 touch-none" {...listeners}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <MemoItem memo={memo} />
      </div>
    </li>
  );
}

export default function MemoList({ memos }: { memos: Memo[] }) {
  const [items, setItems] = useState(memos);
  
  useEffect(() => {
    setItems(memos);
  }, [memos]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update order in database
        const updatedIds = newItems.map((item, index) => ({
          id: item.id,
          order: index,
        }));
        
        updateMemoOrder(updatedIds);
        
        return newItems;
      });
    }
  };

  return items.length === 0 ? (
    <div className="text-center text-gray-500 justify-center items-center flex flex-col h-96">
      No memos available. Please add a memo.
    </div>
  ) : (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(memo => memo.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul>
          {items.map((memo) => (
            <SortableMemoItem key={memo.id} memo={memo} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
