import { useEffect } from "react";
import MemoForm from "../components/memo/MemoForm";
import MemoList from "../components/memo/MemoList";
import { useMemoStore } from "../stores/memoStore";

function MemoPage() {
  const { fetchMemos } = useMemoStore();

  useEffect(() => {
    fetchMemos();
  }, [fetchMemos]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Memos</h1>
      <MemoForm />
      <MemoList />
    </div>
  );
}

export default MemoPage;
