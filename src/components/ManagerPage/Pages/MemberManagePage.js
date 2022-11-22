import React,{useEffect, useState} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { memberState, orderState, tokenState, websiteState } from '../../../recoil/Recoil';
import UpdateOrderModal from '../../utils/Modal/UpdateOrderModal';
import Table from '../../utils/Table';
import { getMembers, getOrders } from '../Controller/DashboardController';
import MemberTable from '../Table/MemberTable';
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';

const MemberManageContainer=styled.div`
    height:100vh;
`

const MemberContainer=styled.div`
    display:flex;
    width:100%;
    height:100%;
`

const MemberBlock=styled.div`
    width:80%;
    background: gray;
    padding:10px;
`

const MemberTableBlock=styled.div`
    background: white;
    border: none;   
    border-radius: 5px;
    min-height: 50vh;
    text-align: center;
    align-items: center;
    margin-bottom: 10px;

    padding: 20px;
`

const MemberButtonBlock=styled.div`
    text-align:right;

    margin-right:20px;
    margin-bottom:20px;
`

function MemberManagePage(){
    let website = useRecoilValue(websiteState);
    const accessToken=useRecoilValue(tokenState);

    const tableColumn=['회원아이디','이메일','전화번호','생년월일','수정/변경']
    const [member,setMember]=useRecoilState(memberState);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        getMembers(accessToken,website).then((data)=> setMember(data.data.members));


        setLoading(false)
    })
    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;

    return(
        <>
            <MemberManageContainer>
                <ManagerHeader page_url={"https://google.com"} domain={website}/>

                <MemberContainer>
                    <ManagerSidebar/>
                    <MemberBlock>
                        <MemberTableBlock>
                            <h1>회원 관리</h1>
                            <hr/>
                            <MemberTable columns={tableColumn} data={member} kind={true}/>
                        </MemberTableBlock>
                    </MemberBlock>
                </MemberContainer>
            </MemberManageContainer>

            <UpdateOrderModal/>
        </>
    )
}

export default MemberManagePage;