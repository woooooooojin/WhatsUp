import { styled } from "styled-components";
import { IPost } from "./Timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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

const DeleteBtn = styled.button`
    background-color: tomato;
    color: #fff;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 7px;
    border-radius: 10px;
`

export default function PostUI({username, photo, post, userId, id}:IPost) {
    const user = auth.currentUser
    const onDelete = async ()=>{
        const ok = confirm('정말 삭제하시겠습니까?')
        if(!ok || user?.uid !== userId) return; //컨펌 취소 또는 로그인된 유저와 적성한 유저가 다르면 함수종료

        try{
            await deleteDoc(doc(db,'posts',id)) 
            if(photo){
                const photoRef = ref(storage, `posts/${user.uid}/${id}`) //스토리지 안의 사진 경로
                await deleteObject(photoRef)
            } //사진 삭제
        }catch(e){
            console.log(e)
        }finally{

        }
    } //포스트 삭제


  return (
    <>
        <Container>

            <Wrapper>
                <Column>
                <Username>{username}</Username>
                <Message>{post}</Message>
                {user?.uid === userId ? <DeleteBtn onClick={onDelete}>delete</DeleteBtn> : null } 
                {/* 작성한 유저와 로그인된 유저가 동일하면 버튼이 보임 */}
                </Column>
                
                <Column>
                    { photo ?  <Photo src={photo}/>: null}
                </Column> 
            </Wrapper>
        </Container>

    </>
  )
}
