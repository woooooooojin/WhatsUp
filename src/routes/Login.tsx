import { useState } from "react"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/AuthCommon"



export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {target: {name, value}} =e;
    if(name === 'email'){
      setEmail(value)
    }else if(name === 'password'){
      setPassword(value)
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setError("")
    if(loading  || email === "" || password === "") return; //로딩중이거나 이름 이메일 비번이 비었을경우 함수종료
    try{
     setLoading(true)
     await signInWithEmailAndPassword(auth, email, password)
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
        <Title>Log into What's Up</Title>
        <Form onSubmit={onSubmit}>


          <Input onChange={onChange} name="email" value={email} placeholder="email" type="email" required/>

          <Input onChange={onChange} name="password" value={password} placeholder="password" type="password" required/>

          <Input type="submit" value={loading ? 'loading' : '로그인'} />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}
        <Switcher>
          계정이 없으신가요? <Link to='/create-account'>계정 만들기</Link>
        </Switcher>
      </Wrapper>
    </>
  )
}

