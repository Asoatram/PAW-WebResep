// src/components/SideBar.tsx

import Link from "next/link";
import styles from "./SideBar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {/* Discover Section */}
      <div className={styles.section}>
        <h2 className={styles.title}>Discover</h2>

          <Link className={styles.item} href="/home">
            <div>
              <img
                src="/search-svgrepo-com.png"
                alt="Browse Icon"
                className={styles.icon}
              />
              <span>Browse</span>
            </div>
          </Link>


          <Link className={styles.item} href="/saved">
            <div>
              <img
                src="/saved-svgrepo-com.png"
                alt="Saved Icon"
                className={`${styles.icon} ${styles.savedIcon}`}
              />
              <span>Saved</span>
            </div>
          </Link>


          <Link className={styles.item}  href="/your-recipes">
            <div>
              <img
                src="/book-2-svgrepo-com.png"
                alt="Your Recipes Icon"
                className={styles.icon}
              />
              <span>Your Recipes</span>
            </div>
          </Link>

          <Link className={styles.item} href="/profile">
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


      {/* Categories Section */}
      <div className={styles.section}>
        <h2 className={styles.title}>Categories</h2>

          <Link className={styles.item} href="/vegan">
            <div>
              <img
                src="/leaf-svgrepo-com.png"
                alt="Vegan Icon"
                className={styles.icon}
              />
              <span>Vegan</span>
            </div>
          </Link>


          <Link className={styles.item} href="/meat">
            <div>
              <img
                src="/meat-cut-svgrepo-com.png"
                alt="Meat Icon"
                className={styles.icon}
              />
              <span>Meat</span>
            </div>
          </Link>


          <Link className={styles.item} href="/rice">
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
  );
}

