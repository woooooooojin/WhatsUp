import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/AuthCommon"


export default function CreateAccount() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {target: {name, value}} =e;
    if(name === 'name'){
      setName(value)
    }else if(name === 'email'){
      setEmail(value)
    }else if(name === 'password'){
      setPassword(value)
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setError("")
    if(loading || name === "" || email === "" || password === "") return; //로딩중이거나 이름 이메일 비번이 비었을경우 함수종료
    try{
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(credential.user)
      await updateProfile(credential.user,{
        displayName : name,
      })
      navigate('/')
    }catch(e){
      if(e instanceof FirebaseError){
        setError(e.message)
      }
    }finally{
      setLoading(false)
    }

  }

  return (
    <>
      <Wrapper>
        <Title>Join What's Up</Title>
        <Form onSubmit={onSubmit}>

          <Input onChange={onChange} name="name" value={name} placeholder="name" type="text" required/>

          <Input onChange={onChange} name="email" value={email} placeholder="email" type="email" required/>

          <Input onChange={onChange} name="password" value={password} placeholder="password" type="password" required/>

          <Input type="submit" value={loading ? 'loading' : '계정생성'} />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}

        <Switcher>
          이미 계정이 있으신가요? <Link to='/login'>로그인 하기</Link>
        </Switcher>

      </Wrapper>
    </>
  )
}
