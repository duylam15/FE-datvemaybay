import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import Post from "../pages/Post";
import FlightResults from "../pages/Flight/FlightResults";
import FlightDetails from "../pages/Flight/FlightDetails";
import Checkout from "../pages/Flight/Checkout";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutDefault />, 
		errorElement: <Error />, 
		children: [
			{ index: true, element: <Home /> },
			{
				path: "post/:id?",
				element: <Post />
			},
			{
				path: "post/:postId?/:userId?",
				element: <Post />,
			},
			{
				path: "flightResult",
				element: <FlightResults />
			},
			{
				path: "flightDetails",
				element: <FlightDetails />
			},
			{
				path: "checkout",
				element: <Checkout />
			},
		],
	},
	{
		path: "/login",
		element: <Login />, // Route login, hiển thị Login
	},
	{
		path: "/register",
		element: <Register />, // Route register, hiển thị Register
	},
]);
