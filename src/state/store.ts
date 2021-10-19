import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { appReducer } from "./app-reducer"
import { usersReducer } from "./users-reducer"

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
	users: usersReducer,
	app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
