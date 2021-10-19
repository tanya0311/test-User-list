//types
export type initialStateType = typeof initialState
export type setStatusACType = ReturnType<typeof setStatusAC>
type ActionsType = setStatusACType

//initialState
const initialState = {
	status: false,
}

export const appReducer = (
	state: initialStateType = initialState,
	action: ActionsType
): initialStateType => {
	switch (action.type) {
		case "SET-STATUS":
			return {
				...state,
				status: action.status,
			}
		default:
			return state
	}
}

export const setStatusAC = (status: boolean) =>
	({ type: "SET-STATUS", status } as const)
