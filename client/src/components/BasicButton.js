import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

const BasicButton = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  return (
    <Btn
      themeState={themeState}
      width={props.width}
      height={props.height}
      color={props.color}
      backGroundColor={props.backGroundColor}
      fontSize={props.fontSize}
      padding={props.padding}
      onClick={props.onClick}
      selected={props.selected}
    >
      {props.text}
    </Btn>
  );
};
const Btn = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) =>
    props.themeState === 'light' ? props.backGroundColor : 'var(--color-gray)'};
  font-size: ${(props) => props.fontSize};
  border-radius: 1.5rem;
  border: none;
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  cursor: pointer;

  ${(props) => {
    if (props.selected) {
      return css`
        background-color: ${(props) =>
          props.themeState === 'light'
            ? 'var(--color-yellow)'
            : 'var(--color-navy)'};
        color: ${(props) =>
          props.themeState === 'light'
            ? 'var(--color-black)'
            : 'var(--color-white)'}; ;
      `;
    }
  }}
`;

export default BasicButton;
