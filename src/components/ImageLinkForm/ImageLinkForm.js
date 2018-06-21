import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
	return (
		<div className='ma4 mt0'>
			<p className='f3'>
				{'This magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center'>
				<div className='center form pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 dib white bg-light-purple' 
					onClick={onSubmit}>Detect</ button>
				</ div>
			</div>
		</div>
		);
}

export default ImageLinkForm;