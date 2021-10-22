//types
export type initialStateType = typeof initialState
export type setStatusACType = ReturnType<typeof setStatusAC>
export type ActionsAppType = setStatusACType

//initialState
const initialState = {
	status: false,
}

export const appReducer = (
	state: initialStateType = initialState,
	action: ActionsAppType
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
