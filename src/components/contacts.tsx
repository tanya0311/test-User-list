import { Container, LinearProgress, Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid/Grid"
import Paper from "@material-ui/core/Paper/Paper"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../state/store"
import { getUsersTC, removeUserAC } from "../state/users-reducer"
import { UserResponseType } from "../types/users"
import { ContactsTable } from "./ContactsTable/contactsTable"

type ContactsType = {}

export const Contacts: React.FC<ContactsType> = (props) => {
	const users = useSelector<AppRootStateType, UserResponseType[]>(
		(state) => state.users.users
	)
	const status = useSelector<AppRootStateType, boolean>(
		(state) => state.app.status
	)
	const dispath = useDispatch()

	useEffect(() => {
		dispath(getUsersTC())
	}, [])

	const removeUser=(id:number)=>{
		dispath(removeUserAC(id))
	}

	if (status || !users.length) {
		return <LinearProgress color='secondary' />
	}

	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper>
						<Typography variant='h3' component='h1'>
							Contacts
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<ContactsTable users={users} removeUser={removeUser} />
					
				</Grid>
			</Grid>
		</Container>
	)
}
