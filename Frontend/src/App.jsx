import React from "react";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import RoomSection from "./containers/RoomSection";
import RestaurantSection from "./containers/RestaurantSection";
import ContactSection from "./containers/ContactSection ";
import Footer from "./components/Footer";
import Scrolltotop from "./components/Scrolltotop";
const App = () => {
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
