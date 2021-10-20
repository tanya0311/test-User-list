import Paper from "@material-ui/core/Paper/Paper"
import Table from "@material-ui/core/Table/Table"
import TableBody from "@material-ui/core/TableBody/TableBody"
import TableCell from "@material-ui/core/TableCell/TableCell"
import TableContainer from "@material-ui/core/TableContainer/TableContainer"
import TableHead from "@material-ui/core/TableHead/TableHead"
import TableRow from "@material-ui/core/TableRow/TableRow"
import React, { useCallback, useState } from "react"
import { UserResponseType } from "../../types/users"
import { Hightlight } from "../search/Hightlight"
import Button from "@material-ui/core/Button"
import { Modal } from "../Modal/modal"
import { Delete } from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton/IconButton"

type ContactsTableType = {
	users: UserResponseType[]
	removeUser: (id: number) => void
	filter: string
}

export const ContactsTable: React.FC<ContactsTableType> = (props) => {
	const { users, removeUser, filter } = props

	//modal
	const [open, setOpen] = useState<number>(0)

	// remove
	const removeUserHandler = useCallback(
		(id: number) => {
			removeUser(id)
		},
		[removeUser]
	)

	// light
	const light = useCallback(
		(str: string) => {
			return <Hightlight filter={filter} str={str} />
		},
		[filter]
	)

	return (
		<div>
			<TableContainer component={Paper}>
				<Table aria-label='contacts table'>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Name</TableCell>
							<TableCell align='center'>Username</TableCell>
							<TableCell align='center'>Email</TableCell>
							<TableCell align='center'></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{users.map((row: UserResponseType) => {
							return (
								<>
									{row.id === open && (
										<Modal
											show={true}
											title={"Information"}
											content={
												<div>
													<div><strong>Adress:</strong> <div> <p>{row.address.street}, {row.address.suite}</p> 
                                       <p>{row.address.city}</p>
                                       <p>{row.address.zipcode}</p>
                                       </div>
                                       </div>
													<p><strong>Company:</strong> {row.company.name} </p>
												</div>
											}
											footer={<Button onClick={() => setOpen(0)}>Close</Button>}
											onClose={() => setOpen(0)}
										/>
									)}

									<TableRow key={row.id}>
										<TableCell align='center' onClick={() => setOpen(row.id)}>
											{light(row.name)}
										</TableCell>
										<TableCell align='center'>{light(row.username)}</TableCell>
										<TableCell align='center'>{light(row.email)}</TableCell>

										<TableCell align='center'>
											<IconButton
												aria-label='delete'
												// size='small'
												color='secondary'
												onClick={() => {
													removeUserHandler(row.id)
												}}
											>
												<Delete fontSize='inherit' />
											</IconButton>
										</TableCell>
									</TableRow>
								</>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}
