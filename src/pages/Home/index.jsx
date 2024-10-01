import { useParams } from 'react-router-dom';

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