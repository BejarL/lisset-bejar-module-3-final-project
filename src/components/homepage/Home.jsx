import BestSellers from "./BestSellers";
import Carousel from "./Carousel";
import Tournaments from "./Tournaments";

function Home() {
  return (
    <div className="bg-teal-900">
      <Carousel />
      <BestSellers />
      <Tournaments />
    </div>
  );
}

export default Home;
