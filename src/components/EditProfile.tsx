import React, { useState } from "react";
import styles from "./EditProfile.module.css";

interface EditProfileProps {
  userName: string;
  description: string;
  profileImage?: string;
  onSave: (updatedData: { userName: string; description: string; profileImage?: string }) => void;
}

export default function EditProfile({
  userName,
  description,
  profileImage,
  onSave,
}: EditProfileProps) {
  const [name, setName] = useState(userName);
  const [desc, setDesc] = useState(description);
  const [image, setImage] = useState(profileImage || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file)); // Menggunakan URL lokal sebagai contoh
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ userName: name, description: desc, profileImage: image });
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={styles.textarea}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="profileImage">Profile Image</label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.fileInput}
        />
        {image && <img src={image} alt="Preview" className={styles.imagePreview} />}
      </div>
      <button type="submit" className={styles.saveButton}>
        Save Changes
      </button>
    </form>
  );
}
