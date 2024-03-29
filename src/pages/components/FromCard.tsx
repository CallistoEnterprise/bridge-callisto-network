import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Spacer from 'components/Spacer';
import { Networks } from 'constants/strings';
import { Theme } from 'constants/theme';
import styled from 'styled-components';
import { FaAngleDown, FaCheck } from 'react-icons/fa';
import { SpacerH } from './ToCard';

export const Container = styled.div`
    width: calc(100% - 80px);
    position: relative;
`;

export const Title = styled.p`
    font-size: 16px;
    font-family: ${Theme.fonts.medium};
    line-height: 30px;
    color: ${Theme.colors.secondary};
`;

export const CardCon = styled.div`
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // width: 40%;
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1), 0 5px 10px 0 rgba(0, 0, 0, 0.1);
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const Img = styled.img`
    height: 70px;
`;

export const ConnectionDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;
export const NetImg = styled.img`
    width: 20px;
`;

export const TextCon = styled.div`
    padding: 3px;
    border-radius: 10px;
    background-color: rgba(0, 255, 0, .16);
`;

export const SmallText = styled.p<{color: string}>`
    font-size: 12px;
    font-family: ${Theme.fonts.text};
    color: ${({color}) => color};
`;

export const StyledText = styled.p`
    font-size: 14px;
    font-family: ${Theme.fonts.text};
    line-height: 18px;
    color: ${Theme.colors.secondary};
`;

export const StyledText2 = styled.p`
    font-size: 12px;
    font-family: ${Theme.fonts.text};
    line-height: 15px;
    color: ${Theme.colors.secondary};
`;

export const DropCon = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d9dbde;
    border-radius: 3px;
    :hover {
        background-color: #929394;
    }
`;

export const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid grey;
`;

export const Menu = styled.div`
    position: absolute;
    top: 160px;
    left: 30%;
    border-radius: 10px;
    background-color: #FFF;
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1), 0 5px 10px 0 rgba(0, 0, 0, 0.1);
`;
export const ItemContainer = styled.div`
    :hover {
        cursor: pointer;
        background-color: rgba(220, 220, 220, .2);
    }
`;
export const ItemCon = styled.div`
    width: 100%;
    padding: 5px 10px;
`;

const FromCard = ({curNet, changeNetwork}) => {
    const { account } = useWeb3React()
    const [showMenu, setShowMenu] = useState(false);

    function handleMenu() {
        setShowMenu(!showMenu);
    }
    function handleItem(index) {
        changeNetwork(index);
        setShowMenu(false);
    }

    return (
        <Container>
            <Title>From</Title>
            <CardCon>
                <Row>
                    <Img src={curNet.img} alt="image" />
                    {account ? <ConnectionDiv>
                        <NetImg src="https://dex-bin.bnbstatic.com/static/images/metamask.svg" alt="net_image" />
                        <Spacer height="5px" />
                        <TextCon>
                            <SmallText color={Theme.colors.primary}>Connected</SmallText>
                        </TextCon>
                    </ConnectionDiv>:
                    <SmallText color='#f70556'>Not Connected</SmallText>
                    }
                </Row>
                <Spacer height="10px" />
                <Row>
                    <div>
                        <StyledText>{curNet.name}</StyledText>
                        {/* <StyledText2>{curNet.devNet}</StyledText2> */}
                    </div>
                    <DropCon onClick={handleMenu}>
                        <FaAngleDown size={18} color={Theme.colors.secondary} />
                    </DropCon>
                </Row>
            </CardCon>
            {showMenu && <Menu >
                {
                    Networks.map((item, index) => {
                        return (
                            <ItemContainer key={item.name}>
                                <ItemCon onClick={() =>handleItem(index)}>
                                    <Row>
                                        <StyledText>{item.name}</StyledText>
                                        <SpacerH width="10px" />
                                        {
                                            curNet.symbol === item.symbol && <FaCheck size = {14} color={Theme.colors.primary}/>
                                        }
                                    </Row>
                                </ItemCon>
                                {index < (Networks.length - 1) && <Line />}
                            </ItemContainer>
                        )
                    })
                }
            </Menu>}
        </Container>
    )
}

export default FromCard;
