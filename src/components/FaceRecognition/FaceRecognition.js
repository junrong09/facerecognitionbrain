import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
	return (
		<div className='center mb4'>
			<div className='relative dib'>
				<img alt='Faces' className='' width='500px' height='auto' src={imageUrl} id='inputImage' />
				<div className='bounding-box' 
				style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}
//w-40-l w-60-m w-70 h-auto
export default FaceRecognition;