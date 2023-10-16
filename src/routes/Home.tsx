import { styled } from "styled-components"
import Post from "../components/Post"
import { auth } from "../firebase"


const Wrapper = styled.div`
  
`

export default function Home() {


  return (
    <>
    <Wrapper>
     <Post/>
    </Wrapper>
    
    </>
  )
}
