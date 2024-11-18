import React, { useState, useEffect } from 'react';

function Chat() {
	const [noiDung, setNoiDung] = useState('');
	const [message, setMessage] = useState('');
	const [ws, setWs] = useState(null);

	// Kết nối WebSocket khi component mount
	useEffect(() => {
		const socket = new WebSocket('ws://localhost:8080/ws/danhgia');

		socket.onopen = () => {
			console.log("Connected to WebSocket server.");
		};

		socket.onmessage = (event) => {
			// Nhận thông điệp từ server
			setMessage(event.data);
		};

		socket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		setWs(socket);

		// Dọn dẹp khi component unmount
		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, []);

	// Xử lý sự kiện gửi đánh giá
	const handleSubmit = (e) => {
		e.preventDefault();

		if (ws && noiDung) {
			ws.send(noiDung);
			setNoiDung('');
		}
	};

	return (
		<div>
			<h2>Đánh giá chuyến bay</h2>
			<form onSubmit={handleSubmit}>
				<textarea
					value={noiDung}
					onChange={(e) => setNoiDung(e.target.value)}
					placeholder="Nhập đánh giá của bạn"
				/>
				<button type="submit">Gửi đánh giá</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default Chat;
