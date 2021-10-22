import "./App.css"
import {
	Button,
	Container,
	LinearProgress,
	Typography,
} from "@material-ui/core"
import Grid from "@material-ui/core/Grid/Grid"
import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "./state/store"
import { getUsersTC, removeUserAC } from "./state/users-reducer"
import { UsersList } from "./components/UsersList/usersList"
import { UserResponseType } from "./types/users"

function App() {
	const users = useSelector<AppRootStateType, UserResponseType[]>(
		(state) => state.users.users
	)
	const status = useSelector<AppRootStateType, boolean>(
		(state) => state.app.status
	)
	const dispath = useDispatch()

	const [filter, setFilter] = useState("")

	useEffect(() => {
		dispath(getUsersTC())
	}, [])

	const removeUser = useCallback(
		(id: number) => {
			dispath(removeUserAC(id))
		},
		[removeUserAC]
	)

	if (status || !users.length) {
		return <LinearProgress color='secondary' />
	}

	// search - filter

	const filteredUser = users.filter((user) => {
		const matchValue = filter.toLowerCase()
		const { name, username, email } = user
		if (name.toString().includes(matchValue)) return true
		if (username.toLowerCase().includes(matchValue)) return true
		if (email.toLowerCase().includes(matchValue)) return true
		return false
	})

	const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.currentTarget.value)
	}

	// button reset
	const resetHandler = () => {
		setFilter("")
		dispath(getUsersTC())
	}

	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant='h3' component='h1' align='center'>
						-Users-
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<div className='search'>
						<input
							type='text'
							value={filter}
							onChange={searchHandler}
							placeholder='Search'
						/>

						<Button onClick={resetHandler} variant='outlined' color='secondary'>
							RESET
						</Button>
					</div>
					<UsersList
						users={filteredUser}
						removeUser={removeUser}
						filter={filter}
					/>
				</Grid>
			</Grid>
		</Container>
	)
}

export default App
