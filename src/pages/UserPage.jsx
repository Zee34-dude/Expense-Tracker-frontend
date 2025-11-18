import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Edit2, Save, User, Mail, Phone } from "lucide-react";

export default function UserProfile() {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDocId, setUserDocId] = useState(null);
  const [saving, setSaving] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const usersRef = collection(db, "user");
        const q = query(usersRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setUserDocId(querySnapshot.docs[0].id);
          setFormData(docData);
        } else {
          setFormData({ userId: currentUser.uid, name: "", phone: "", role: "" });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!userDocId) return alert("User document not found!");

      // Update Firestore
      await updateDoc(doc(db, "user", userDocId), formData);

      // Update Firebase Auth displayName
      await updateProfile(auth.currentUser, {
        displayName: formData.name || "",
      });

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
    } finally {
      setSaving(false);
    }
  };

  // BEAUTIFUL LOADER
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Profile</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-blue-600"
          >
            <Edit2 size={16} />
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 text-blue-600"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save size={16} />
            )}
            Save
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="flex items-center gap-4">
          <User className="text-gray-400" />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p className="text-gray-800">{formData.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <Mail className="text-gray-400" />
          <p className="text-gray-800">{auth.currentUser?.email}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4">
          <Phone className="text-gray-400" />
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p className="text-gray-800">{formData.phone}</p>
          )}
        </div>

        {/* Role */}
        <div className="flex items-center gap-4">
          <User className="text-gray-400" />
          {isEditing ? (
            <input
              type="text"
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p className="text-gray-800">{formData.role}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
