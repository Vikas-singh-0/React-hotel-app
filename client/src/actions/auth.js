import  axios  from "axios";
const register = async (user)=>{
        await axios({
                url: "http://localhost:8000/api/register",
                method: "POST",
                data:user
              });
}
const login = async (user)=>{
        await axios({
                url: "http://localhost:8000/api/login",
                method: "POST",
                data:user
              });
}
export default register;