import { useState } from "react"
import { styled } from "styled-components"

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
        if(files && files.length === 1){
            setFile(files[0])
        }

    } // 파일이 존재하거나 1개만 있을때 state에 저장한다

  return (
    <>
        <Form>
            <TextArea rows={5} maxLength={150} onChange={onChange} value={post} placeholder="What's Up??"/>
            <Flexbox>
                <FileButton htmlFor="file">{file ? 'photo added' : "add photo"}</FileButton>
                <FileInput onChange={onFileChange} type="file" id='file' accept="image/*"></FileInput>
                <SubmitButton type="submit" value={loading ? 'posting...' : 'post'}></SubmitButton>
            </Flexbox>
            
        </Form>
    </>
  )
}
