import { useSelector } from "react-redux";

const Home = () => {
  const {user} = useSelector((store=>({...store})))
  console.log(user);
  return <div className="container-fluid h1 p-5 text-center"><span>{JSON.stringify(user)}</span>Home Page</div>;
};

export default Home;
