import { styled } from "styled-components"

export const Wrapper =styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`
export const Form = styled.form`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 0 30px;
  margin-bottom: 10px;
`
export const Input = styled.input`
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
export const Title = styled.h1`
  font-size: 42px;
  
`
export const Error = styled.span`
  color: tomato;
  font-size: 12px;
`

export const Switcher = styled.span`
  margin-top: 20px;
  font-size: 14px;
  a{
    color: steelblue;
  }

`