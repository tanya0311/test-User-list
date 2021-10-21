import './App.css';
import { Button, Container, LinearProgress, Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid/Grid"
import React, { ChangeEvent,  useCallback,  useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from './state/store';
import { getUsersTC, removeUserAC } from './state/users-reducer';
import { Search } from './components/search/Search';
import { UsersList } from './components/UsersList/usersList';
import { UserResponseType } from './types/users';


function App ()  {

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


	const removeUser =useCallback( (id: number) => {
		dispath(removeUserAC(id))
	}, [ removeUserAC])

	if (status || !users.length) {
		return <LinearProgress color='secondary' />
	}

	//! search - filter
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


	//! button reset
	const resetHandler=()=>{
		setFilter('')
		dispath(getUsersTC())
	}

	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12}>
						<Typography variant='h3' component='h1' align='center' >
							-Users-
						</Typography>
				</Grid>
				<Grid item xs={12}>
					<div className='search'>
					<Search filter={filter} searchHandler={searchHandler}/>
					<Button onClick={resetHandler} variant="outlined" color="secondary">RESET</Button>
					</div>
					<UsersList users={filteredUser} removeUser={removeUser}  filter={filter}/>
				</Grid>
			</Grid>
		</Container>
	)
}

export default App;
