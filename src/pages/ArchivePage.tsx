import { useEffect } from 'react';
import { useMemoStore } from '../stores/memoStore';
import type { Memo } from '../types';

function ArchivePage() {
  const { memos, fetchMemos } = useMemoStore();

  useEffect(() => {
    fetchMemos();
  }, [fetchM thousand
  const archivedMemos = memos.filter((memo: Memo) =>
    memo.status.has('archived') && memo.status.get('archived')?.status === 'archived'
  );

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Archived Memos</h1>
      {archivedMemos.length === 0 ? (
        <p className="text-gray-500">No archived memos available</p>
      ) : (
        <div className="space-y-4">
          {archivedMemos.map((memo: Memo) => (
            <div key={memo._id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{memo.content.title || 'Memo'}</h3>
              <p className="text-gray-600">From: {memo.sender.name}</p>
              <p className="text-gray-600">Department: {memo.department || 'N/A'}</p>
              <p className="text-gray-600">Archived: {new Date(memo.status.get('archived')!.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArchivePage;