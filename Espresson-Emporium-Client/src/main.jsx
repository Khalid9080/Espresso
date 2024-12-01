import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{
  createBrowserRouter,
  RouterProvider,
}from "react-router-dom";
import AddCoffe from './components/AddCoffe.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App></App>,
    // POST API theke data UI te dekhanor jonno fetch kori
    loader:()=>fetch('http://localhost:5000/coffee')
  },
  {
    path:"addCoffee",
    element: <AddCoffe></AddCoffe>
  },
  {
    path:'updateCoffee/:id',
    element: <UpdateCoffee></UpdateCoffee>,
    loader: ({ params }) => fetch(`http://localhost:5000/coffee/${params.id}`)
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>

  </StrictMode>,
)
