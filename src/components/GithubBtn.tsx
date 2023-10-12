import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { styled } from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

const Button = styled.span`
    width: calc(100% - 60px);
    background-color: #fff;
    font-weight: 500;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    color: black;
    margin-top: 20px;
    padding: 10px 20px;
    cursor: pointer;
`
const Logo = styled.img`
    height: 25px;
`

export default function GithubBtn() {
    const navigate = useNavigate()
    const onClick = async ()=>{
       
        try{
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth,provider)
            navigate('/')
        }catch(e){
            console.log(e)
        }
    }

  return (
    <>
        <Button onClick={onClick}>
            <Logo src='./github-logo.svg' />
            continue with github
        </Button>

    </>
  )
}
