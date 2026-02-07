import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Home} from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Login from './Admin/AdminLogin';
import DetailOfRooms from './pages/DetailofRooms';
import Host from './pages/Host';
import Admin from './Admin/admin';
import HostLogin from './Host/HostLogin';
import HostSignup from './Host/HostSignup';
import HostDashboard from './Host/HostDashboard';
import ProtectedRoute from './Admin/ProtectedRoute';
const App = () => {
  const router =createBrowserRouter([{
    path:"/",
    element:<MainLayout></MainLayout>,
    children:[{
      path:"/",
      element:<Home></Home>
    },



{
  path:"/city/:cityName/id/:id",

  element:<DetailOfRooms></DetailOfRooms>
}



],

  },
{
  path:"/host",
  element:<Host></Host>
},

{
  path:"/hostLogin",
  element:<HostLogin></HostLogin>
},

{
  path:"/hostSignup",
  element:<HostSignup></HostSignup>
},
{
  path:"admin",
  element:<ProtectedRoute><Admin></Admin></ProtectedRoute>
},

{
  path:"hostDashboard",
  element:<HostDashboard></HostDashboard>
}
,  {
    path:"/adminLogin",
    element:<Login></Login>
  },])
  return (
 <RouterProvider router={router}></RouterProvider>
  )
}

export default App