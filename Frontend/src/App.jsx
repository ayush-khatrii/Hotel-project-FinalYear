import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import RoomSection from "./components/RoomSection";
import ContactSection from "./components/ContactSection ";
import Scrolltotop from "./components/Scrolltotop";

const App = () => {
  return (
    <>
      <Home />
      <RoomSection />
      <ContactSection />
      <Scrolltotop />
    </>
  );
};

export default App;
