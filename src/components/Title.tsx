import { styled } from "styled-components"


const HeadTitle = styled.h1`    
    text-align: center;
    font-size: 45px;
    margin-bottom: 50px;
    text-shadow: 5px 5px 0 steelblue;
    letter-spacing: 5px;
`

export default function Title() {
  return (
    <>
     <HeadTitle>What's Up ?</HeadTitle>
    </>
  )
}
