import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableContainer from "@material-ui/core/TableContainer/TableContainer"
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import React from "react"
import { UserResponseType } from "../../types/users";
import { Hightlight } from "../search/Hightlight";


type ContactsTableType = {
  users:UserResponseType[]
  removeUser:(id:number)=>void
  filter:string
}


export const ContactsTable: React.FC<ContactsTableType> =(props)=>{
   const {users, removeUser, filter}=props



   const removeUserHandler=(id:number)=>{
      removeUser(id)
   }
   
   const light = (str:string) => {
		return <Hightlight filter={filter} str={str} />
	 }
   return <div>
   <TableContainer component={Paper}>
     <Table aria-label="contacts table">
       <TableHead>
         <TableRow>
           <TableCell align="center">Name</TableCell>
           <TableCell align="center">Username</TableCell>
           <TableCell align="center">Email</TableCell>
           <TableCell align="center"></TableCell>
         </TableRow>
       </TableHead>
       
       <TableBody>
         {users.map((row:UserResponseType) => (

           <TableRow
           key={row.id}
           >
             <TableCell align="center"> 
               {row.id} 
             </TableCell>
             <TableCell align="center"> 
               { light(row.name)} 
             </TableCell>
             <TableCell align="center">
              {light(row.username)}
             </TableCell>
             <TableCell align="center">
                {light(row.email)}
                </TableCell>
         
             <TableCell align="center">
                <button onClick={()=>{removeUserHandler(row.id)}}>delete</button>
                </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
   
 </div>
}


