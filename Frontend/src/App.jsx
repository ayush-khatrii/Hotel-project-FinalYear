import React, { useEffect, useState } from "react";
import Home from "./containers/Home";
import RoomSection from "./containers/RoomSection";
import RestaurantSection from "./containers/RestaurantSection";
import ContactSection from "./containers/ContactSection ";
import Scrolltotop from "./components/Scrolltotop";

const App = () => {
	useEffect(() => {
		
	}, []);

	return (
		<>
			<Home />
			<RoomSection />
			<RestaurantSection />
			<ContactSection />
			<Scrolltotop />
		</>
	);
};

export default App;
