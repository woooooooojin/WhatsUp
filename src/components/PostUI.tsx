import { styled } from "styled-components";
import { IPost } from "./Timeline";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 0fr;
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 15px;
    margin-bottom: 30px;
`
const Column = styled.div``
const Username = styled.span`
    font-weight: 600;
    font-size: 18px;
`
const Message = styled.p`
    margin: 10px 0;
    font-size: 16px;
`
const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 20px;
`

const Container = styled.div`
    padding: 0 30px;
`

export default function PostUI({username, photo, post}:IPost) {
  return (
    <>
        <Container>

            <Wrapper>
                <Column>
                <Username>{username}</Username>
                <Message>{post}</Message>
                </Column>
                
                <Column>
                    { photo ?  <Photo src={photo}/>: null}
                </Column> 
            </Wrapper>
        </Container>

    </>
  )
}
