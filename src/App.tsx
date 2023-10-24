import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./routes/Home"
import Profile from "./routes/Profile"
import Login from "./routes/Login"
import CreateAccount from "./routes/CreateAccount"
import { createGlobalStyle, styled } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/LoadingScreen"
import ProtectedRoute from "./components/ProtectedRoute"
import { auth } from "./firebase"

const Globalstyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  body{
    background-color: #222831;
    color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
`
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`

const router = createBrowserRouter([
  {
    path:'/',
    element:<ProtectedRoute><Layout/></ProtectedRoute>,
    children:[
      {
        path:"",
        element:<Home/>,
      },
      {
        path:'profile',
        element:<Profile/>,
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

  const [loading, setLoding] = useState(true)
  const init = async() => {
    await auth.authStateReady()
    setLoding(false)
  }
  useEffect(()=>{init()},[])

  return (
    <>
      <Wrapper>
        <Globalstyles/>
        
        { loading ? <LoadingScreen/> :  <RouterProvider router={router}/> }
      </Wrapper>
    </>
  )
}

export default App
