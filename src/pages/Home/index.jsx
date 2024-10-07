import { useNavigate } from 'react-router-dom';
import React from 'react'
import "./Home.scss"
import Portlet from './Portlet';
import News from './News';
import BannerExplore from './BannerExplore';
import Service from './Service';
import HomeHeader from './HomeHeader';
import BonusService from './BonusService';
const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<HomeHeader />

			<Service navigate={navigate} />

			<BannerExplore navigate={navigate} />

			<News />

			<Portlet navigate={navigate} />

			<BonusService />
		</>
	);
};


export default Home