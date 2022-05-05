import { useSelector } from "react-redux";

const Home = () => {
  const store = useSelector((store=>({...store})))
  console.log("store",store);
  return <div className="container-fluid h1 p-5 text-center"><span>{JSON.stringify(store)}</span>Home Page</div>;
};

export default Home;
