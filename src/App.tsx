import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./routes/Home"
import Profile from "./routes/Profile"
import Login from "./routes/Login"
import CreateAccount from "./routes/CreateAccount"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const Globalstyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  body{
    background-color: black;
    color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
`


const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:'profile',
        element:<Profile/>
      }
    ]
  },
  {
    path:"login",
    element:<Login/>
  },
  {
    path:"create-account",
    element:<CreateAccount/>
  },
])


function App() {

  return (
    <>
      <Globalstyles/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
