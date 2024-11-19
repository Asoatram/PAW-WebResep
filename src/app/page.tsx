import FoodCard from "@/components/Card";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <FoodCard
      title="Ayam Goreng Krispi"
      imageSrc={"/ayam_goreng.png"}
      description="Ini adalah resep masakan nusantara"
      author="Rusdi"
      rating={4.5}
      />
    </div>
  );
}
