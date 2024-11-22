import FoodCard from "@/components/Card";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
      <div>
          <Navbar/>
          <div className={"inline-flex content-evenly"}>
              <FoodCard/>
              <FoodCard/>
              <FoodCard/>
              <FoodCard/>
              <FoodCard/>
          </div>
      </div>
        );
}
