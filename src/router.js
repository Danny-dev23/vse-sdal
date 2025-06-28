import Home from './Pages/Home/home.jsx';
import About from './Pages/About/about.jsx';
import Shop from './Pages/Shop/Shop.jsx';
import Contacts from './Pages/Contacts/contacts.jsx';
import Register from './Pages/Register/Register.jsx';
import Login from './Pages/Login/Login.jsx';
import AccountCustomer from './Pages/Account/AccountCustomer/AccountCustomer.jsx';
import AccountExpert from './Pages/Account/AccountExpert/AccountExpert.jsx';
import RegisterExpert from './Pages/Register/RegisterExpert/RegisterExpert.jsx';

const Routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/shop', element: <Shop /> },
  { path: '/contacts', element: <Contacts /> },
  { path: '/login', element: <Login/> },
  { path: '/register', element: <Register /> },
  { path: '/customer/:id', element: <AccountCustomer /> },
  { path: '/expert/:id', element: <AccountExpert /> },
  { path: '/expert/', element: <RegisterExpert /> },
  
];

export default Routes;