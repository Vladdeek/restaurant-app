import React from 'react'
import '../search/search.css'

const Search = ({ value, onChange }) => {
	return (
		<div className='search-con d-flex justify-content-center'>
			<input
				className='search'
				type='search'
				placeholder='Поиск...'
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

export default Search
