import { useState, useEffect } from 'react';
import { useMemoStore } from '../../stores/memoStore';
import type { MemoField } from '../../types';

interface FormData {
  [key: string]: string | File;
}

function MemoForm() {
  const { fields, fetchFields, createMemo } = useMemoStore();
  const [formData, setFormData] = useState<FormData>({});
  const [recipients, setRecipients] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  const handleInputChange = (name: string, value: string | File) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMemo({
        recipients: recipients ? recipients.split(',').map((id) => id.trim()) : undefined,
        department: department || undefined,
        content: formData,
      });
      setFormData({});
      setRecipients('');
      setDepartment('');
    } catch (error) {
      // Error handled by Sonner in memoStore
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Memo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field: MemoField) => (
          <div key={field._id}>
            <label className="block text-sm font-medium">{field.name}</label>
            {field.type === 'text' && (
              <input
                type="text"
                value={(formData[field.name] as string) || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full p-2 border rounded-md"
                required={field.required}
              />
            )}
            {field.type === 'date' && (
              <input
                type="date"
                value={(formData[field.name] as string) || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full p-2 border rounded-md"
                required={field.required}
              />
            )}
            {field.type === 'select' && (
              <select
                value={(formData[field.name] as string) || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full p-2 border rounded-md"
                required={field.required}
              >
                <option value="">Select an option</option>
                {field.options?.map((options: any) => (
                  <option key={options} value={options}>
                    {options}
                  </option>
                ))}
              </select>
            )}
            {field.type === 'file' && (
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleInputChange(field.name, e.target.files[0]);
                  }
                }}
                className="w-full p-2 border rounded-md"
                required={field.required}
              />
            )}
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium">Recipients (comma-separated IDs)</label>
          <input
            type="text"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Send Memo
        </button>
      </form>
    </div>
  );
}

export default MemoForm;