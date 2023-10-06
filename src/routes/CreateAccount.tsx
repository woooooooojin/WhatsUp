import { useState } from "react"
import { styled } from "styled-components"

const Wrapper =styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  border: 1px solid #fff;
  padding: 50px 0;
  border-radius: 10px;
`
const Form = styled.form`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 0 10px;
`
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  &:focus{
    outline: 2.5px dashed yellow;
    
  }
  &[type='submit']{
    cursor: pointer;
    outline: none;
    transition: .3s;
    &:hover{
      opacity: 0.8;
    }
  }
  
`
const Title = styled.h1`
  font-size: 42px;
  
`
const Error = styled.span`
  color: tomato;
  font-size: 12px;
`

export default function CreateAccount() {
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

  const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{

    }catch(e){

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
      </Wrapper>
    </>
  )
}
