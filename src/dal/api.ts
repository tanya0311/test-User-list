import axios from "axios"
import { UserResponseType } from "../types/users";




export const usersAPI = {
	getUsers() {
      const promise= axios.get<UserResponseType[]>("https://jsonplaceholder.typicode.com/users").then((res) => {
         return res.data
      }) 
		return promise
     
      
	},
	
}