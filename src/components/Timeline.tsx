import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import PostUI from "./PostUI";

export interface IPost {
    photo:string;
    post:string;
    userId:string;
    username:string;
    createdAt:number;
    id:string;
}

const Wrapper = styled.div``

export default function Timeline() {
    const [posts, setPosts] = useState<IPost[]>([])
    const fetchPosts = async ()=>{
        const postsQuery = query(
            collection(db,'posts'),
            orderBy('createdAt','desc')
        );

        const snapshot = await getDocs(postsQuery)
        const posting = snapshot.docs.map((doc)=>{
            const {post, createdAt, userId, username, photo} = doc.data()
            return{
                post, createdAt, userId, username, photo,
                id:doc.id
            }
        })
        setPosts(posting)
    }
    useEffect(()=>{fetchPosts()},[])

  return (
    <>
        <Wrapper>
            {posts.map(post => <PostUI key={post.id} {...post}/>)}
        </Wrapper>
    </>
  )
}
