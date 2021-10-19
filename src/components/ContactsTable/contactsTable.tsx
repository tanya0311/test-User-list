import Paper from "@material-ui/core/Paper/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableContainer from "@material-ui/core/TableContainer/TableContainer"
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Typography from "@material-ui/core/Typography/Typography";
import { PinDropSharp } from "@material-ui/icons"
import createStyles from "@material-ui/styles/createStyles/createStyles";
import React, { useEffect, useState } from "react"
import { UserResponseType } from "../../types/users";

type ContactsTableType = {
  users:UserResponseType[]
  removeUser:(id:number)=>void
}

// const useStyles = makeStyles((theme) =>

// );

export const ContactsTable: React.FC<ContactsTableType> =(props)=>{
   const {users, removeUser}=props

   // const classes = useStyles();

   // const removeUserHandler=(id:number)=>{
   //    removeUser(row.id)
   // }
   
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
               {row.name} 
             </TableCell>
             <TableCell align="center">
              {row.username}
             </TableCell>
             <TableCell align="center">
                {row.email}
                </TableCell>
         
             <TableCell align="center">
                <button onClick={()=>{removeUser(row.id)}}>delete</button>
                </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
   
 </div>
}