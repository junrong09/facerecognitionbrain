import React from 'react';

const Rank = ({name, entries}) => {
	// const {name, entries} = user;
	// console.log(user, "122");
	// console.log(user.name);
	return (
		<div className='ma4 mt0'>
			<div className='white f3'>
				{`${name}, your current entry count is...`}
			</div>
			<div className='white f3'>
				{entries}
			</div>
		</div>
		);
}

export default Rank;