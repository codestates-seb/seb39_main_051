import styled from "styled-components"
import { useSelector } from 'react-redux';


const BasicButton = (props) => {
    console.log(props.padding)
    const themeState = useSelector((state) => state.themeSlice).theme
    return(
        <Button themeState={themeState} width={props.width} height={props.height} color={props.color} backGroundColor={props.backGroundColor} fontSize={props.fontSize} padding={props.padding}>{props.text}</Button>
    )
}
const Button = styled.button`
    width : ${(props)=>props.width};
    height: ${(props)=>props.height};
    background-color: ${(props)=>props.themeState === 'light'  ? props.backGroundColor : '#393939'};
    font-size : ${(props)=>props.fontSize};
    border-radius: 1.5rem;
    border: none;
    color: ${(props)=>props.color};
    padding: ${(props)=>props.padding};
    cursor: pointer;
`

export default BasicButton