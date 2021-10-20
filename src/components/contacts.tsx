import { Container, LinearProgress, Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid/Grid"
import Paper from "@material-ui/core/Paper/Paper"
import React, { ChangeEvent,  useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../state/store"
import { getUsersTC, removeUserAC } from "../state/users-reducer"
import { UserResponseType } from "../types/users"
import { ContactsTable } from "./ContactsTable/contactsTable"
import { Search } from "./search/Search"

type ContactsType = {}

export const Contacts: React.FC<ContactsType> = (props) => {

	const users = useSelector<AppRootStateType, UserResponseType[]>(
		(state) => state.users.users
	)
	const status = useSelector<AppRootStateType, boolean>(
		(state) => state.app.status
	)
	const dispath = useDispatch()
	const [filter, setFilter] = useState('')

	useEffect(() => {
		dispath(getUsersTC())
	}, [])


	const removeUser = (id: number) => {
		dispath(removeUserAC(id))
	}

	if (status || !users.length) {
		return <LinearProgress color='secondary' />
	}

	//search - filter
	const filteredUser = users.filter((user) => {
		const matchValue = filter.toLowerCase()
		return user.name.toLocaleLowerCase().includes(matchValue) || user.username.toLocaleLowerCase().includes(matchValue) || user.email.toLocaleLowerCase().includes(matchValue)
	})

	const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.currentTarget.value)
	}

	// const light = (str:string) => {
	// 	return <Hightlight filter={filter} str={str} />
	//  }

	// button reset
	const resetHandler=()=>{
		setFilter('')
		dispath(getUsersTC())
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
					<Search filter={filter} searchHandler={searchHandler}/>
					<button onClick={resetHandler}>RESET</button>
					<ContactsTable users={filteredUser} removeUser={removeUser}  filter={filter}/>
				</Grid>
			</Grid>
		</Container>
	)
}


