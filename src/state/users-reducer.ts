import { Dispatch } from "redux"
import { usersAPI } from "../dal/api"
import { UserResponseType } from "../types/users"
import { setStatusAC } from "./app-reducer"

//types
export type initialType = typeof initialState
export type GetUsersActionType = ReturnType<typeof getUsersAC>
export type RemoveUserACActionType = ReturnType<typeof removeUserAC>

export type ActionsUsersType = GetUsersActionType | RemoveUserACActionType

//initialState
const initialState = {
	users: [] as UserResponseType[],
	
}

//reducer
export const usersReducer = (
	state: initialType = initialState,
	action: ActionsUsersType
): initialType => {
	switch (action.type) {
		case "GET_USERS": {
			return { users: [...action.users] }
		}
		case "REMOVE-USERS": {
			const newState = state.users.filter(
				(t) => t.id !== action.userId
			)
			return {...state, users: newState}
		}
		default:
			return state
	}
}

//actions
const getUsersAC = (users: UserResponseType[]) =>
	({ type: "GET_USERS", users } as const)

export const removeUserAC = (userId: number) => {
	return {
		type: "REMOVE-USERS",
		userId,
	} as const
}

//thunks
export const getUsersTC = () => (dispatch: Dispatch) => {
	dispatch(setStatusAC(true))
	usersAPI
		.getUsers()
		.then((res) => {
			dispatch(getUsersAC(res))
		})
		.finally(() => dispatch(setStatusAC(false)))
}
