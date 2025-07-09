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
    const user = {
      active_balance: "0.00",
      avatar: null,
      city: "",
      completed_orders: 0,
      currency: "Ruble",
      date_of_birth: null,
      educational_institution: null,
      email: "danilpetrov.1978@gmail.com",
      expert_status: "beginner",
      faculty: "",
      frozen_balance: "0.00",
      id: 4,
      is_active: true,
      is_online: false,
      is_verified: false,
      last_10_arbitrations: 0,
      last_activity: "2025-07-09T17:39:49.797746+03:00",
      positive_reviews: 0,
      role: "customer",
      specialization: "",
      username: "danil"
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("user_id", "4");
    sessionStorage.setItem("role", "customer");
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
