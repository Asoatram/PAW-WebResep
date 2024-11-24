import React from 'react';
import styles from './SideBar.module.css';



export default function Sidebar( ) {
    return (
        <div className={styles.sidebar} >
            {/* Discover Section */}
            <div className={styles.section}>
                <h2 className={styles.title}>Discover</h2>
                <div className={styles.item}>
                    <img src="\search-svgrepo-com.png" alt="Browse Icon" className={styles.icon} />
                    <span>Browse</span>
                </div>
                <div className={styles.item}>
                    <img src="\saved-svgrepo-com.png" alt="Saved Icon" className={`${styles.icon} ${styles.savedIcon}`} />
                    <span>Saved</span>
                </div>
                <div className={styles.item}>
                    <img src="\book-2-svgrepo-com.png" alt="Your Recipes Icon" className={styles.icon} />
                    <span>Your Recipes</span>
                </div>
                <div className={styles.item}>
                    <img src="\profile-1341-svgrepo-com.png" alt="Profile Icon" className={styles.icon} />
                    <span>Profile</span>
                </div>
            </div>

            {/* Categories Section */}
            <div className={styles.section}>
                <h2 className={styles.title}>Categories</h2>
                <div className={styles.item}>
                   <img src="\leaf-svgrepo-com.png" alt="Vegan Icon" className={styles.icon} />
                    <span>Vegan</span>
                </div>
                <div className={styles.item}>
                    <img src="\meat-cut-svgrepo-com.png" alt="Meat Icon" className={styles.icon} />
                    <span>Meat</span>
                </div>
                <div className={styles.item}>
                    <img src="\rice-svgrepo-com.png" alt="Rice Icon" className={styles.icon} />
                    <span>Rice</span>
                </div>
            </div>
        </div>
    );
};
