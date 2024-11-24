import UserProfile from "@/components/UserProfile";
import FoodCard from "@/components/Card"; // Pastikan path benar

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    recipesPosted: 45,
    description: "I love cooking and sharing recipes with others.",
    profileImage: "", // Tambahkan URL gambar jika ada
  };

  return (
  <>
    <div>
      <UserProfile
        userName={user.name}
        recipesPosted={user.recipesPosted}
        description={user.description}
        profileImage={user.profileImage}
      />
    </div>
    
    <div>

    </div>
  </>
  );
}
