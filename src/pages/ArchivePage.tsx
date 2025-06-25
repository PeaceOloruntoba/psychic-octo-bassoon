import { useEffect, useState } from "react";
import { useMemoStore } from "../stores/memoStore";
import { toast } from "sonner";
import type { Memo } from "../types";
import Loader from "../components/ui/Loader";

function ArchivePage() {
  const { memos, fetchMemos } = useMemoStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMemos = async () => {
      try {
        setLoading(true);
        await fetchMemos();
        setLoading(false);
      } catch (err) {
        setError("Failed to load archived memos");
        toast.error("Failed to load archived memos");
        setLoading(false);
      }
    };
    loadMemos();
  }, [fetchMemos]);

  const archivedMemos = memos.filter(
    (memo: Memo) =>
      memo.status.has("archived") &&
      memo.status.get("archived")?.status === "archived"
  );

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Archived Memos</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : archivedMemos.length === 0 ? (
        <p className="text-gray-500">No archived memos available</p>
      ) : (
        <div className="space-y-4">
          {archivedMemos.map((memo: Memo) => (
            <div key={memo._id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">
                {memo.content.title || "Memo"}
              </h3>
              <p className="text-gray-600">From: {memo.sender.name}</p>
              <p className="text-gray-600">
                Department: {memo.department || "N/A"}
              </p>
              <p className="text-gray-600">
                Archived:{" "}
                {new Date(
                  memo.status.get("archived")!.timestamp
                ).toLocaleString()}
              </p>
              <div className="mt-2">
                <h4 className="text-sm font-medium">Content:</h4>
                {Object.entries(memo.content).map(([key, value]) => (
                  <p key={key} className="text-gray-600">
                    {key}: {typeof value === "string" ? value : value.name}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArchivePage;
