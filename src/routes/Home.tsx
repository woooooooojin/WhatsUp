import { styled } from "styled-components"
import Post from "../components/Post"
import Timeline from "../components/Timeline"


const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  /* grid-template-rows: 1fr 5fr; */
`

export default function Home() {


  return (
    <>
    <Wrapper>
     <Post/>
     <Timeline/>
    </Wrapper>
    
    </>
  )
}
