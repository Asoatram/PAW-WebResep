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

        <div>
              <textarea
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className={styles.textarea}
              />

          {image && (
              <img
                  src={image}
                  alt="Preview"
                  className={styles.imagePreview}
              />
          )}
        </div>

      </div>
      <button type="submit" className={styles.saveButton}>
        Save Changes
      </button>
    </form>
  );
}
