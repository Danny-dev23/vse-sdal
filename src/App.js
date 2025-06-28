import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import routes from "./router.js";
import Footer from "./Components/Footer/Footer.jsx";
import { TabsProvider } from "./utils/TabsContext.jsx";
import "./App.css"; // Импорт глобальных стилей

const App = () => {
  return (
    <Router>
      <TabsProvider>
        <Header />
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
        <Footer />
      </TabsProvider>
    </Router>
  );
};

export default App;
