import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Home from './pages/Home/Home';
import Auth from './pages/Login/Auth';
import Profile from './pages/Profile/Profile';
import Blogdetail from './pages/Blogdetail/Blogdetail';

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:<Auth isLogin={true}/>
    },
    {
      path:'/signup',
      element:<Auth isLogin={false}/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/blogDetail/:id?',
      element:<Blogdetail/>
    }
  ])
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
