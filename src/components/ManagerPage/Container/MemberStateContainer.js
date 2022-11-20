import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { memberState, websiteState } from '../../../recoil/Recoil';
import MemberTable from '../Table/MemberTable';

const MembertStateBlock=styled.div`
    background: white;
    border: none;   
    border-radius: 5px;
    height: 100%;
    text-align: center;
    align-items: center;

    padding: 10px 20px;
    
`
const MemberLinkBlock=styled.div`
    text-align: right;
    padding: 4px 8px;
    

`
const MemberLink=styled(Link)`
    text-decoration: none; /* 링크의 밑줄 제거 */
    color: inherit;
`

function MemberStateContainer(){
    const tableColumn=['회원아이디','이메일','전화번호','생년월일']

    const [member,setMember]=useRecoilState(memberState);
    const website=useRecoilValue(websiteState);
    
    return(
    <MembertStateBlock>
        <MemberLinkBlock>
            <MemberLink to={`/manager/${website}/member`} >자세히보기</MemberLink>
        </MemberLinkBlock>
        
        <h2>회원</h2>
        <hr/>
        <MemberTable columns={tableColumn} data={member}/>
    </MembertStateBlock>
    )
}
export default MemberStateContainer;