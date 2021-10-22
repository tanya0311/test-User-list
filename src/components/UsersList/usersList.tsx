import Paper from "@material-ui/core/Paper/Paper"
import Table from "@material-ui/core/Table/Table"
import TableBody from "@material-ui/core/TableBody/TableBody"
import TableCell from "@material-ui/core/TableCell/TableCell"
import TableContainer from "@material-ui/core/TableContainer/TableContainer"
import TableHead from "@material-ui/core/TableHead/TableHead"
import TableRow from "@material-ui/core/TableRow/TableRow"
import React, { useCallback, useState } from "react"
import { UserResponseType } from "../../types/users"
import { Hightlight } from "../Hightlight/Hightlight"
import Button from "@material-ui/core/Button"
import { Modal } from "../Modal/modal"
import { Delete } from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton/IconButton"
import style from "./UsersList.module.css"

type ContactsTableType = {
	users: UserResponseType[]
	removeUser: (id: number) => void
	filter: string
}

export const UsersList: React.FC<ContactsTableType> = (props) => {
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
				<Table data-label='contacts table' className={style.table}>
					<TableHead className={style.tableHead}>
						<TableRow>
							<TableCell >Name</TableCell>
							<TableCell >Username</TableCell>
							<TableCell >Email</TableCell>
							<TableCell ></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{users.map((row: UserResponseType) => {
							return (
								<>
									{row.id === open && (
										<Modal
											show={true}
											title={row.name}
											content={
												<div>
													<div className={style.adressBlock}>
														<strong>Adress:</strong>
														<div className={style.adress}>
															<p>
																{row.address.street}, {row.address.suite}
															</p>
															<p>{row.address.city}</p>
															<p>{row.address.zipcode}</p>
														</div>
													</div>
													<div className={style.companyBlock}>
														<strong>Company:</strong> <p>{row.company.name}</p>
													</div>
												</div>
											}
											footer={<Button onClick={() => setOpen(0)}>Close</Button>}
											onClose={() => setOpen(0)}
										/>
									)}

									<TableRow key={row.id}>
										<TableCell data-label="Name" align="left" onClick={() => setOpen(row.id)} className={style.name} >
											{light(row.name)}
										</TableCell>
										<TableCell data-label="Username" align="left" className={style.username}>{light(row.username)} </TableCell>
										<TableCell data-label="Email" align="left" className={style.email}>{light(row.email)}</TableCell>

										<TableCell align="left">
											<IconButton
												data-label='delete'
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
