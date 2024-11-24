// src/components/SideBar.tsx

import Link from "next/link";
import styles from "./SideBar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {/* Discover Section */}
      <div className={styles.section}>
        <h2 className={styles.title}>Discover</h2>
        <div className={styles.item}>
          <Link href="/browse">
            <div>
              <img
                src="/search-svgrepo-com.png"
                alt="Browse Icon"
                className={styles.icon}
              />
              <span>Browse</span>
            </div>
          </Link>
        </div>
        <div className={styles.item}>
          <Link href="/saved">
            <div>
              <img
                src="/saved-svgrepo-com.png"
                alt="Saved Icon"
                className={`${styles.icon} ${styles.savedIcon}`}
              />
              <span>Saved</span>
            </div>
          </Link>
        </div>
        <div className={styles.item}>
          <Link href="/your-recipes">
            <div>
              <img
                src="/book-2-svgrepo-com.png"
                alt="Your Recipes Icon"
                className={styles.icon}
              />
              <span>Your Recipes</span>
            </div>
          </Link>
        </div>
        <div className={styles.item}>
          <Link href="/profile">
            <div>
              <img
                src="/profile-1341-svgrepo-com.png"
                alt="Profile Icon"
                className={styles.icon}
              />
              <span>Profile</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className={styles.section}>
        <h2 className={styles.title}>Categories</h2>
        <div className={styles.item}>
          <Link href="/vegan">
            <div>
              <img
                src="/leaf-svgrepo-com.png"
                alt="Vegan Icon"
                className={styles.icon}
              />
              <span>Vegan</span>
            </div>
          </Link>
        </div>
        <div className={styles.item}>
          <Link href="/meat">
            <div>
              <img
                src="/meat-cut-svgrepo-com.png"
                alt="Meat Icon"
                className={styles.icon}
              />
              <span>Meat</span>
            </div>
          </Link>
        </div>
        <div className={styles.item}>
          <Link href="/rice">
            <div>
              <img
                src="/rice-svgrepo-com.png"
                alt="Rice Icon"
                className={styles.icon}
              />
              <span>Rice</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
