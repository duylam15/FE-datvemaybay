function Register() {
	return (
		<>
			<form >
				<h2>Register</h2>
				<div>
					<input type="text" placeholder="Nhập họ tên" />
				</div>
				<div>
					<input type="text" placeholder="Nhập email" />
				</div>
				<div>
					<input type="password" placeholder="Nhập password" />
				</div>
				<button type="submit">Register</button>
			</form>
		</>
	)
}

export default Register