import { styled } from "styled-components"
import { auth, storage } from "../firebase"
import React, { useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {  updateProfile } from "firebase/auth"


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

export default function Profile() {
  const user = auth.currentUser
  const [avatar, setAvatar] = useState(user?.photoURL)

  const onAvatarChange = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {files} = e.target

    if(!user) return;

    if(files && files.length ===1){
      const file = files[0]
      const locationRef = ref(storage,`avatars/${user?.uid}`)
      const result = await uploadBytes(locationRef,file)
      const avatarUrl =  await getDownloadURL(result.ref)
      setAvatar(avatarUrl)
      await updateProfile( user , {
        photoURL : avatarUrl,
      })
    }

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
        <Name>
          {user?.displayName ? user.displayName : 'anonymous'}
        </Name>
      </Wrapper>
    </>
  )
}
