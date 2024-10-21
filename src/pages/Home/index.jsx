import { useParams } from 'react-router-dom';
import React from 'react';

const Home = () => {
	const params = useParams();
	const postId = params.postId || params.id; // Lấy postId nếu có

	return (
		<>
			Home
		</>
	);
};


export default Home