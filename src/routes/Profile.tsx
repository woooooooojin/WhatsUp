import { styled } from "styled-components"
import { auth, db, storage } from "../firebase"
import React, { useEffect, useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {  updateProfile } from "firebase/auth"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { IPost } from "../components/Timeline"
import PostUI from "../components/PostUI"


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

`
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg{
    width: 50px;
  }
`
const AvatarImg = styled.img`
    width: 100%;
`
const AvatarInput = styled.input`
  display: none;
`
const Name = styled.span`
  font-size: 22px;
`
const Posts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const EditName = styled.button`
  background-color: tomato;
  border: 1px solid tomato;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  padding: 3px 7px;
`
const NameWrap= styled.div`

`
const NameInput = styled.input`
  outline: none;
  border-radius: 20px;
  padding: 3px 5px;
 
`
const EditSubmit = styled.button`
  background-color: tomato;
  border: 1px solid tomato;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  padding: 3px 7px;
  margin-left: 10px;
`
export default function Profile() {
  const user = auth.currentUser
  const [avatar, setAvatar] = useState(user?.photoURL)
  const [posts, setPosts] = useState<IPost[]>([])

  const onAvatarChange = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {files} = e.target

    if(!user) return;

    if(files && files.length ===1 && files[0].size < 3 * 1024 * 1024){
      const file = files[0]
      const locationRef = ref(storage,`avatars/${user?.uid}`)
      const result = await uploadBytes(locationRef,file)
      const avatarUrl =  await getDownloadURL(result.ref)
      setAvatar(avatarUrl)
      await updateProfile( user , {
        photoURL : avatarUrl,
      })
      if(files[0].size > 3 * 1024 * 1024){
        alert('3MB 이하의 파일만 업로드 가능합니다.')
      }
    }

  } //profile 사진변경

  const fetchPost = async ()=>{
    const postQuery = query(collection(db,'posts'),
      where('userId','==',user?.uid),
      orderBy('createdAt','desc'),
      limit(25)
    ) //현재 로그인한 유저id와 같은 posts들만 가져온다

    const snapshot = await getDocs(postQuery)
    const posts = snapshot.docs.map(doc=>{
      const {post, createdAt, userId, username, photo} = doc.data()
      return{
        post,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id
      }
    })
    setPosts(posts)
  } //fetch post 
  useEffect(()=>{fetchPost()},[]) 

  const [editName, setEditName] = useState(false)
  const [name, setName]=useState('')

  const changeName = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value)
  }

  const onEditName = async ()=>{
    if(!user) return;
    // setEditName((prev) => !prev);
    if(!editName) return;
    try{
      await updateProfile(user,{
        displayName : name,
      })
    }catch(e){
      console.log(e)
    }finally{
      setEditName(!editName)
    }

  }

  const onEditClick =()=>{
    setEditName(true)
    setName(user?.displayName || "Anonymous");
    
  }
 


  return (
    <>
      <Wrapper>
        <AvatarUpload htmlFor="avatar">
          {avatar ? (<AvatarImg src={avatar}/>) : (<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"></path>
          </svg>)}
        </AvatarUpload>

        <AvatarInput onChange={onAvatarChange} id="avatar" accept='image/*' type='file' />

         
          {editName ?  <NameInput onChange={changeName} value={name} type="text"></NameInput> :  
          <Name>
            {user?.displayName ? user.displayName : 'anonymous'}
          </Name> }


          <NameWrap>
           {editName ? null : <EditName onClick={onEditClick}>이름수정</EditName> }
           {editName ? <EditSubmit onClick={onEditName}>이름저장</EditSubmit> : null}

          </NameWrap>

        


        <Posts>{posts.map(post => <PostUI key={post.id} {...post}/>)}</Posts>

      </Wrapper>
    </>
  )
}
