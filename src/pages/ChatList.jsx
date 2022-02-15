import { lighten } from 'polished';
import React, {useState} from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Title from '../components/Title';
import { set_detail_chat } from '../modules/chat';
import ChatDetail from './ChatDetail';

const ListBox = styled.div`
    width: 65%;
    margin: 40px auto;
`;
const ChatItem = styled.div`
    font-size: 20px;
    display: flex;
    color: ${props=>props.isRead?'#A0A0A0;':'var(--color-orange)'};
    border-bottom: 1px solid #fff;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    &:before{
        content: "ㅁ";
        color: #fff;
        margin-right: 10px;
    }
    &:hover { 
        background: rgba(255, 255, 255, 0.1);
    }
`;
const FromId = styled.p`
    width: 20%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  

`;
const Content = styled.p`
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  
    margin: 0 26px;
`;
const Date = styled.p`
    width: 20%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  
`;
const PageControl = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ControlBtn = styled.button`
    color: #fff;
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;

    &:hover{
        color: #ddd;
    }
`;
const ChatList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [detailOpen, setDetailOpen] = useState(false);
    const page_num = 5;  //페이지 숫자 개수 ◀ 1 2 3 ▶
    const message_num = 12;  //한페이지에 보여질 쪽지수
    const {allChat} = useSelector(state=>state.chat);
    const page = Math.ceil(allChat.length / message_num);  //총 페이지 수

    useEffect(()=>{
        for(let i=1; i<=page; i++){
            setPages(prev=>prev.concat([i]));
            if(i>=3) return;
        }
    },[]);
    
    const onPageChange = (e) => {
        setCurrentPage(e.target.innerHTML);
    }

    const onPrev = ()=>{
        if(pages[0]===1) return;
        let arr = [];
        let i = pages[pages.length-1]-pages.length;
        while(arr.length<page_num){
            arr.push(i);
            i--;
        }
        setPages(arr.reverse());
    }

    const onNext = ()=>{
        if(pages[pages.length-1]>=page) return;
        let arr = [];
        for(let i=pages[pages.length-1]+1; i<=page; i++){
            if(arr.length<page_num) arr.push(i)
        }
        setPages(arr);
    }

    const onDetailClick = (e) => {
        console.log(e.target.getAttribute('data-from'));
        setDetailOpen(true);
    }

    return (
        <>
            <Title>쪽지함</Title>
            <ListBox>
                {allChat && allChat.map((v, i)=>{
                     if(i+1>(currentPage-1)*message_num && i+1<=(currentPage * message_num)){
                         return(
                            <ChatItem data-from={v.from} isRead={v.isRead} key={i} onClick={onDetailClick}>
                                <FromId>{v.from}</FromId>
                                <Content>{v.content}</Content>
                                <Date>{v.date}</Date>
                            </ChatItem>
                         )
                     }
                    })}
            </ListBox>
            <PageControl>
                <ControlBtn onClick={onPrev}>◀</ControlBtn>
                {pages.map((v, i)=><ControlBtn key={i} onClick={onPageChange}>{v}</ControlBtn>)}
                <ControlBtn onClick={onNext}>▶</ControlBtn>
            </PageControl> 
            {detailOpen&&<ChatDetail detailOpen={detailOpen} setDetailOpen={setDetailOpen} />}
        </>
    );
};

export default ChatList;