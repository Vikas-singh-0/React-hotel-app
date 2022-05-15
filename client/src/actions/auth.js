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
export const updateUserINLocalStorage = async (user,next)=>{
        if (window.localStorage.getItem('auth')) {
                let auth = JSON.parse(localStorage.getItem('auth'))
                console.log(auth);
                // auth = user
                // localStorage.setItem('auth',JSON.stringify(auth))
                next()
        }
}