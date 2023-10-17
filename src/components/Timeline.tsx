import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import PostUI from "./PostUI";
import { Unsubscribe } from "firebase/auth";

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
    // const fetchPosts = async ()=>{
    //     const postsQuery = query(
    //         collection(db,'posts'),
    //         orderBy('createdAt','desc')
    //     );

    //     // const snapshot = await getDocs(postsQuery)
    //     // const posting = snapshot.docs.map((doc)=>{
    //     //     const {post, createdAt, userId, username, photo} = doc.data()
    //     //     return{
    //     //         post, createdAt, userId, username, photo,
    //     //         id:doc.id
    //     //     }
    //     // })

    //     const unsubscribe = await onSnapshot(postsQuery, (snapshot)=>{
    //         const posting = snapshot.docs.map((doc)=>{
    //             const{post, createdAt, userId, username, photo} = doc.data()
    //             return{
    //                 post,
    //                 createdAt,
    //                 userId,
    //                 username,
    //                 photo,
    //                 id:doc.id
    //             }
    //         });
    //         setPosts(posting)

    //     });

    // }
    useEffect(()=>{
        let unsubscribe : Unsubscribe | null = null
        const fetchPosts = async ()=>{
            const postsQuery = query(
                collection(db,'posts'),
                orderBy('createdAt','desc'),
                limit(25)
            );
    
            unsubscribe = await onSnapshot(postsQuery, (snapshot)=>{ 
                //onSnapshot은 특정문서나 컬렉션 쿼리 이벤트를 감지하여 실시간으로 이벤트콜백 함수를 실행해줄수있다 이를 통해 db에 들어온 쿼리를 새로고침없이 화면에 반영가능 
                //onSnapshot을 사용할때 비용을 지불해야하니 사용자가 다른 화면을 보고 있을때는 작동하지 않게 하는게 좋다 useEffect의 cleanup기능을 이용하여 언마운트될때 onSnapshot이 실행되지 않게 할수있다
                const posting = snapshot.docs.map((doc)=>{
                    const{post, createdAt, userId, username, photo} = doc.data()
                    return{
                        post,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id:doc.id
                    }
                });
                setPosts(posting)
    
            });
    
        }



        fetchPosts()

        return()=>{
            unsubscribe && unsubscribe() //unsubscribe가 null이 아닌경우에 unsubscribe 함수를 호출하여 Firestore 구독을 취소한다 이렇게 함으로써 불필요한 실시간 업데이트를 중지할 수 있다
        }
    
    
    },[])//Firebase Firestore에서 게시물 데이터를 가져와서 실시간 업데이트를 수신하고 컴포넌트가 렌더링될 때 한 번 실행하며 컴포넌트가 언마운트될 때 Firebase Firestore 구독을 정리하여 데이터베이스 리스너를 중지

  return (
    <>
        <Wrapper>
            {posts.map(post => <PostUI key={post.id} {...post}/>)}
        </Wrapper>
    </>
  )
}
