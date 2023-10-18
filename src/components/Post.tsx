import { addDoc, collection, updateDoc } from "firebase/firestore"
import React, { FormEvent, useState } from "react"
import { styled } from "styled-components"
import { auth, db, storage } from "../firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const Form = styled.form`
    display: flex;
    gap: 10px;
    padding: 0 30px;
`
const TextArea = styled.textarea`
    width: 80%;
    border: 2px solid #fff;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: #fff;
    background-color: black;
    resize: none;
    &::placeholder{
        font-size: 16px;
    }
    &:focus{
        outline: none;
        border: 2px dashed yellow;
    }
`
const FileButton = styled.label`
    padding: 20px 0px;
    color: steelblue;
    text-align: center;
    border: 1px solid steelblue;
    font-size: 14x;
    font-weight: 600;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`
const FileInput = styled.input`
    display: none;
`
const SubmitButton = styled.input`
    background-color: steelblue;
    color: #fff;
    border: none;
    padding: 20px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    transition: .3s;
    &:hover{
        opacity: 0.8;
    }
`

const Flexbox = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
`



export default function Post() {

    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.target.value)
    }
    
    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {files} = e.target;
        if(files && files.length === 1 ){
            
            setFile(files[0])
        }

    } // 파일이 존재하거나 1개만 있을때 state에 저장한다

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const user = auth.currentUser
        if(!user || loading || post === '' || post.length > 150) return; //로그인이 안되어있거나 로딩중이거나 포스트의 글이 공백이거나 길이가 150이상이면 함수종료

        try{
            setLoading(true)
            const doc = await addDoc(collection(db,'posts'),{
                post,
                createdAt : Date.now(),
                username : user.displayName || "anonymous",
                userId: user.uid,
            }) //어떤 컬렉션에 document를 생성하고 싶은지 지정 후 원하는 데이터를 만들어서 넣어줌

            if(file && file.size < 1024 * 1024){//파일이 존재하거나 파일 사이즈가 1메가 이하일경우
                const locationRef =  ref(storage, `posts/${user.uid}/${doc.id}`) // posts / 유저의고유아이디 / 문서의아이디
                const result =  await uploadBytes(locationRef,file)
                const url = await getDownloadURL(result.ref)
                await updateDoc(doc,{
                    photo: url,
                }) // updateDoc은 업데이트할 document에 대한 참조와(doc) 업데이트할 데이터가 필요
            } //업로드된 파일이 저장되는 폴더명과 파일명을 지정 
            setPost('') //post초기화
            setFile(null)//File 초기화
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }

    }




  return (
    <>
        <Form onSubmit={onSubmit}>
            <TextArea required rows={5} maxLength={150} onChange={onChange} value={post} placeholder="What's Up??"/>
            <Flexbox>
                <FileButton htmlFor="file">{file ? 'added photo' : "add photo"}</FileButton>
                <FileInput onChange={onFileChange} type="file" id='file' accept="image/*"></FileInput>
                <SubmitButton type="submit" value={loading ? 'posting...' : 'post'}></SubmitButton>
            </Flexbox>
            
        </Form>
    </>
  )
}
