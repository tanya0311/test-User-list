import React, { ChangeEvent } from "react"

type SearchType = {
	filter: string
	searchHandler: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Search: React.FC<SearchType> = (props) => {
	const { filter, searchHandler } = props

	return (
		<input
			type='text'
			value={filter}
			onChange={searchHandler}
			placeholder='Search'
		/>
	)
}
