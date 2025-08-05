// src/pages/AdminPanel.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <table className="w-full bg-neutral-900 rounded-lg">
        <thead>
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role || "user"}</td>
              <td>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
