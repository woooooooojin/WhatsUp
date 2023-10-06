import { styled } from "styled-components"

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Text = styled.span`
    font-size: 24px;
`
const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .wave{
    width: 3px;
    height: 30px;
    background: linear-gradient(45deg, powderblue, #fff);
    margin: 10px;
    animation: wave 1s linear infinite;
    border-radius: 20px;
  }
  .wave:nth-child(2) {
  animation-delay: 0.1s;
  }
  .wave:nth-child(3) {
    animation-delay: 0.2s;
  }
  .wave:nth-child(4) {
    animation-delay: 0.3s;
  }
  .wave:nth-child(5) {
    animation-delay: 0.4s;
  }

    @keyframes wave {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
}
`


export default function LoadingScreen() {
  return (
    <>
        <Wrapper>
          <Text>loading</Text>
          <LoadingWrap>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          
          </LoadingWrap>
        </Wrapper>

    </>
  )
}
