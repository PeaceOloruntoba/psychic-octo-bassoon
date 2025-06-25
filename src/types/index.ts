export interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Staff" | "Student";
  department?: string;
  token?: string;
}

export interface MemoField {
  _id: string;
  name: string;
  type: "text" | "date" | "select" | "file";
  required: boolean;
  options?: string[];
  createdBy: string;
  createdAt: string;
}

export interface Memo {
  _id: string;
  sender: { _id: string; name: string; email: string };
  recipients: string[];
  department?: string;
  content: { [key: string]: string | File };
  status: Map<
    string,
    {
      status: "sent" | "delivered" | "read" | "acknowledged" | "archived";
      timestamp: string;
    }
  >;
  createdAt: string;
  updatedAt: string;
}
