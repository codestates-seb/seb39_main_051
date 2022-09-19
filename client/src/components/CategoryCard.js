import styled from "styled-components"
import SubscribeMark from "../assets/SubscribeMark";
import {
    faReact,
    faJava,
    faPython,
    faSquareJs,
}from'@fortawesome/free-brands-svg-icons';
import {faWindowMaximize, faNetworkWired,faLightbulb, faDatabase} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';


const CategoryCard = (props) => {
    const themeState = useSelector((state) => state.themeSlice).theme
    let content = null
    // <FontAwesomeIcon icon={faJava} />
    switch (props.name){
        case 'React':
            content = <FontAwesomeIcon icon={faReact} size='2x' />
            break
        case 'JavaScript':
            content = <FontAwesomeIcon icon={faSquareJs} size='2x' />
            break
        case 'Java':
            content = <FontAwesomeIcon icon={faJava} size='2x' />
            break
        case 'Python':
                content = <FontAwesomeIcon icon={faPython} size='2x' />
                break
        case 'Browser':
                content = <FontAwesomeIcon icon={faWindowMaximize} size='2x' />
                break
        case 'Algorithm':
                content = <FontAwesomeIcon icon={faLightbulb} size='2x' />
                break
        case 'Databse':
                content = <FontAwesomeIcon icon={faDatabase} size='2x'/>
                break
        case 'Network':
                content = <FontAwesomeIcon icon={faNetworkWired} size='2x'/>
                break
    }
    return(
        <CategoryCardLayout onClick={props.handleClick}>
            <CategoryCardWrapper themeState={themeState}>
                <SubscribeMark />
                <Logo>
                    <div id="wrapper">
                        <ContentWrapper>
                        {content}
                        </ContentWrapper>
                        <NameWrapper>
                        {props.name}
                        </NameWrapper>
                    </div>
                    <div id='subscribe-mobile'>구독 중</div>
                </Logo>
            </CategoryCardWrapper>
            <div id="subscribe-web">구독 중</div>
        </CategoryCardLayout>
    )
}

const CategoryCardLayout = styled.div`
    font-size: 1.7rem;
    font-weight: bold;
    position:relative;
    width: 18.5rem;
    #subscribe-web{
        text-align: center;
        margin-top: 1rem;
    }
        @media screen and (max-width:767px) {
        display:flex;
        #subscribe-web {
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
    cursor: pointer;
    background-color :  ${(props) => props.themeState==='light' ? '#FEDD89': '#000000'};
    #subscribe-mobile{
        display:none
    }
    :hover{
        background-color :  ${(props) => props.themeState==='light' ? '#FFE57A': '#13264E'};
    }
    border-radius:1.5rem;
    #name {
        margin-top: 0.5rem;
    }
`
const Logo = styled.div`
@media screen and (max-width:767px){
    display:flex;
    align-items:center;
    #wrapper{
        margin-right:1rem;
    }
    #subscribe-mobile{
        display:block;
        margin-right: -2rem;
    }
}
`
const ContentWrapper = styled.div`

`
const NameWrapper = styled.div`
    padding-top: 0.5rem;
`

export default CategoryCard