import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import routes from "./router.js";
import Footer from "./Components/Footer/Footer.jsx";
import { TabsProvider } from "./utils/TabsContext.jsx";
import "./App.css"; // Импорт глобальных стилей
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNjc2Nzk0LCJpYXQiOjE3NTIwNzE5OTQsImp0aSI6ImQ2NGQ2NzU2M2JhZTRiZmE5ZjZlMzhmOGE3ZDM4ZDg4IiwidXNlcl9pZCI6NH0.MTL-7KqCYDpwUpvbSLiUx-PmKGbsbJID2KV_FQRDITs

const App = () => {
  useEffect(() => {
    sessionStorage.setItem(
      "access_token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNjc2Nzk0LCJpYXQiOjE3NTIwNzE5OTQsImp0aSI6ImQ2NGQ2NzU2M2JhZTRiZmE5ZjZlMzhmOGE3ZDM4ZDg4IiwidXNlcl9pZCI6NH0.MTL-7KqCYDpwUpvbSLiUx-PmKGbsbJID2KV_FQRDITs"
    );
  }, []);
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
