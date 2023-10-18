import { styled } from "styled-components";
import { IPost } from "./Timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";

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
    width: 120px;
    height: 120px;
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
    cursor: pointer;
    margin-right: 10px;
`
const EditBtn = styled.button`
    background-color: tomato;
    color: #fff;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 7px;
    border-radius: 10px;
    cursor: pointer;

   
`

const TextArea = styled.textarea`
    width: 170px;
    resize: none;
    margin: 10px 0;
    font-size: 16px;
    display: block;
    background-color: black;
    border: 1px solid #fff;
    outline: none;
    color: #fff;
`

const EditPhotoBtn = styled.label`
    display: block;
    text-align: center;
    background-color: tomato;
    color: #fff;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 7px;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    margin: 5px 0;
`
const EditPhotoInput = styled.input`
    display: none;
`
const BtnBox = styled.div`
    display: flex;
    flex-direction: column;


`
const SubmitBtn = styled.label`
    width: 100%;
    padding: 5px 7px;
    display: block;
    text-align: center;
    background-color: steelblue;
    color: #fff;
    outline: none;
    border: 0;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
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


    //포스트 수정
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState<string>('');

    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setValue(e.target.value)
    }

    const onEdit = async ()=>{
        if(user?.uid !== userId) return;
        try{
            setEdit(true)
            await updateDoc(doc(db,'posts',id),{post: value})
            
        }catch(e){
            console.log(e)
        }finally{
            setEdit(!edit)
            setValue('')
        }
    }

    //사진 수정
    const [file, setFile] = useState<File | null>(null)
    const [editFile, setEditFile] = useState(false)
   
    
    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        
        
            const {files} = e.target

            if(files && files.length === 1 && files[0].size < 1024 * 1024){
                setFile(files[0])
            }
           

    }
    
    const onClickFile = async ()=>{
        // setEditFile((prev) => !prev)
        // if(!editFile) return;


        try{
            if(file !== null){
                // const photoLocation = ref(storage, `posts/${user?.uid}/${id}`)
                // await deleteObject(photoLocation)

                const newRef = ref(storage, `posts/${user?.uid}/${id}`)
                const result = await uploadBytes(newRef, file)
                const url = await getDownloadURL(result.ref) 
                
                await updateDoc(doc(db,'posts',id),{
                    photo: url,
                })
            }
           
        }catch(e){
            console.log(e)
        }finally{
            setFile(null)
            setEditFile(!editFile)
        }

    }


  return (
    <>
        <Container>

            <Wrapper>
                <Column>
                <Username>{username}</Username>

                {edit ? (<TextArea onChange={onChange} rows={2} maxLength={150} value={value}></TextArea>) : (<Message>{post}</Message>)}

                {user?.uid === userId ? <DeleteBtn onClick={onDelete}>삭제</DeleteBtn> : null }
                {user?.uid === userId && edit === false ? <EditBtn  onClick={onEdit}>수정</EditBtn> : <EditBtn  onClick={onEdit}>수정완료</EditBtn>} 
                {/* 작성한 유저와 로그인된 유저가 동일하면 버튼이 보임 */}
                </Column>
                
                <Column>
                    {photo ?  <Photo src={photo}/>: null}
                     <EditPhotoInput onChange={onFileChange}  type="file" id="input_file" accept="image/*" />
                     
                     <BtnBox>
                        {user?.uid === userId ? <EditPhotoBtn  htmlFor="input_file">사진선택</EditPhotoBtn> : null }
                        <SubmitBtn  onClick={onClickFile}>저장하기</SubmitBtn>
                     </BtnBox>

                </Column> 
            </Wrapper>
        </Container>

    </>
  )
}
