import  axios  from "axios";
export const  register = async (user)=>{
        await axios({
                url: "http://localhost:8000/api/register",
                method: "POST",
                data:user
              });
}
export const login = async (user)=>{
        await axios({
                url: "http://localhost:8000/api/login",
                method: "POST",
                data:user
              });
}
// export default login,register;