import styled from "styled-components"
import SubscribeMark from "../assets/SubscribeMark";
import {
    faReact,
    faJava,
    faSquareJs,
}from'@fortawesome/free-brands-svg-icons';
import {faNetworkWired,faLightbulb, faDatabase, faLeaf, faFolderTree} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from "react";


const CategoryCard = (props) => {
    const themeState = useSelector((state) => state.themeSlice).theme
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    }
    const handleMouseOut = () => {
        setIsHovering(false)
    }

    let content = null
    switch (props.name){
        case '리액트':
            content = <FontAwesomeIcon icon={faReact} size='2x' />
            break
        case '자바스크립트':
            content = <FontAwesomeIcon icon={faSquareJs} size='2x' />
            break
        case '자바':
            content = <FontAwesomeIcon icon={faJava} size='2x' />
            break
        case '스프링':
                content = <FontAwesomeIcon icon={faLeaf} size='2x' />
                break
        case '자료구조':
                content = <FontAwesomeIcon icon={faFolderTree} size='2x' />
                break
        case '알고리즘':
                content = <FontAwesomeIcon icon={faLightbulb} size='2x' />
                break
        case '데이터베이스':
                content = <FontAwesomeIcon icon={faDatabase} size='2x'/>
                break
        case '네트워크':
                content = <FontAwesomeIcon icon={faNetworkWired} size='2x'/>
                break
    }
    return(
        <>
        <CategoryCardLayout onClick={() => props.handleClick(props.name)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {isHovering ? 
            <>
            <CategoryCardWrapper themeState={themeState}>
                <SubscribeMark />
                <LogoLayout>
                        <div>
                        {props.name}
                        </div>
                        <div>
                        구독하기
                        </div>
                </LogoLayout>
            </CategoryCardWrapper>
            <div className='subscribe-web'>ㅤ</div>
            </>
            :
            <>
                        <CategoryCardWrapper themeState={themeState}>
                <SubscribeMark />
                <LogoLayout>
                        <div>
                        {content}
                        </div>
                        <NameWrapper>
                        {props.name}
                        </NameWrapper>
                </LogoLayout>
            </CategoryCardWrapper>
            <div className='subscribe-web'>구독 중</div>
            </>
            }
        </CategoryCardLayout>
        </>
    )
}

const CategoryCardLayout = styled.div`
    font-size: 1.7rem;
    font-weight: bold;
    position:relative;
    width: 18.5rem;
    //회전 애니메이션
    .subscribe-web{
        text-align: center;
        margin-top: 1rem;
    }
        @media screen and (max-width:412px) {
        display:flex;
        .subscribe-web {
            display:none;
        }
}
`
const CategoryCardWrapper = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    min-width: 18.5rem;
    height: 7.5rem;
    border-radius:1.5rem;
    cursor: pointer;
    background-color :  ${(props) => props.themeState==='light' ? 'var(--color-yellow)': 'var(--color-black)'};
    :hover{
        background-color :  ${(props) => props.themeState==='light' ? '#FFE57A': 'var(--color-navy)'};
    }
`
const LogoLayout = styled.div`
@media screen and (max-width:412px){
}
`
const NameWrapper = styled.div`
    padding-top: 0.5rem;
`

export default CategoryCard