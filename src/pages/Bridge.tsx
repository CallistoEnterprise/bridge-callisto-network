import React from 'react'
import styled from 'styled-components';
import Header from 'components/Header';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: #f5f5f5;
    padding: 40px 20%;
    justify-conent: center;
    @media screen and (max-width: 1130px){
        padding: 40px 10%;
    }
    @media screen and (max-width: 900px){
        padding: 40px 5%;
    }
    @media screen and (max-width: 768px){
        padding: 40px 20px;
    }
    @media screen and (max-width: 600px){
        flex-direction: column;
        padding: 40px 20px;
    }
`;
const Wrapper = styled.div`
    max-width: 900px;
    display: flex;
    justify-conent: center;
    margin-left: auto;
    margin-right: auto;
`

const Bridge = () => {

    return (
        <>
            <Header/>
            <Container>
                <Wrapper>
                    <LeftPane />
                    <RightPane />
                </Wrapper>
            </Container>
        </>
    )
}

export default Bridge;
