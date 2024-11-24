import styles from "./UserProfile.module.css";

interface UserProfileProps {
  userName: string;
  recipesPosted: number;
  description: string;
  profileImage?: string;
}

export default function UserProfile({
  userName,
  recipesPosted,
  description,
  profileImage,
}: UserProfileProps) {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" className={styles.profileImage} />
          ) : (
            <div className={styles.emptyProfileImage}></div>
          )}
        </div>
        <div className={styles.userInfo}>
          <h2>Hello, {userName}</h2>
          <p>Posted {recipesPosted} Recipes</p>
          <p>{description}</p>
        </div>
      </div>
      <hr className={styles.separator} />
    </div>
  );
}
