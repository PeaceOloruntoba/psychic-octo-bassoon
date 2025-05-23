import { useMemoStore } from "../../stores/memoStore";
import type { Memo } from "../../types";

function MemoList() {
  const { memos, updateMemoStatus } = useMemoStore();

  const handleStatusChange = (memoId: string, status: string) => {
    updateMemoStatus(memoId, status);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Memos</h2>
      {memos.length === 0 ? (
        <p className="text-gray-500">No memos available</p>
      ) : (
        <div className="space-y-4">
          {memos.map((memo: Memo) => (
            <div key={memo._id} className="p-4 bg-white rounded-lg shadow-md">
              {/* <h3 className="text-lg font-semibold">
                {memo.content.title || "Memo"}
              </h3> */}
              <p className="text-gray-600">From: {memo.sender.name}</p>
              <p className="text-gray-600">
                Department: {memo.department || "N/A"}
              </p>
              <p className="text-gray-600">
                Status:{" "}
                {memo.status.get(memo.sender._id.toString())?.status || "Sent"}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleStatusChange(memo._id, "read")}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => handleStatusChange(memo._id, "acknowledged")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MemoList;
