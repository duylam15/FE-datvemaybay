import { useNavigate } from 'react-router-dom';
import React from 'react'
import "./Home.scss"
import Portlet from './Portlet';
import News from './News';
import BannerExplore from './BannerExplore';
import Service from './Service';
import HomeHeader from './HomeHeader';
import BonusService from './BonusService';
import Experience from './Experience';
import Popular from './Popular';
import Promotion from './Promotion';
import HotFlight from './HotFlight';
const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<HomeHeader navigate={navigate} />

			<Service navigate={navigate} />

			<BannerExplore navigate={navigate} />

			<News />

			<Portlet navigate={navigate} />

			<BonusService />

			<Experience />

			<Popular />

			<HotFlight />

			<Promotion />

		</>
	);
};


export default Home