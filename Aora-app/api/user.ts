import axios from "axios";

const baseUrl = "https://3a38-105-71-134-24.ngrok-free.app"

export const createUser = async (username:string, email:string, password:string) => {
    const URL = baseUrl+'/api/addUser'
    axios.post(URL,{
        username,
        email,
        password
    })
    .then(response => {
        console.log(response.status);
    })
    .catch(error => {
        console.log(error);
    })
}

