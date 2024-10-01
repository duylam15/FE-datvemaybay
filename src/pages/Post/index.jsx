import { useParams } from 'react-router-dom';

const Post = () => {
	const params = useParams();
	const postId = params.postId || params.id; // Lấy postId nếu có

	return (
		<div>
			{postId ? (
				<h1>Post ID: {postId}</h1>
			) : (
				<h1>No Post ID</h1> // Hoặc hiển thị thông báo khác
			)}
		</div>
	);
};


export default Post