import UserProfile from "@/components/UserProfile";
import FoodCard from "@/components/Card"; // Pastikan path benar
import Link from "next/link";

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    recipesPosted: 45,
    description: "I love cooking and sharing recipes with others.",
    profileImage: "", // Tambahkan URL gambar jika ada
  };

  return (
    <div>
      <UserProfile
        userName={user.name}
        recipesPosted={user.recipesPosted}
        description={user.description}
        profileImage={user.profileImage}
      />

      <div className={"mt-8"}>
        <h1 className={"font-medium mr-10"}>Your Recipes</h1>
        <hr />
      </div>

      {/* Link ke halaman edit profile */}
      <Link href="/edit-profile">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>
      </Link>
    </div>
  );
}
