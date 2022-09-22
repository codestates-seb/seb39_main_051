import styled from 'styled-components';
import BasicButton from './BasicButton';

const Pagination = (props) => {
  return (
    <>
      <Nav>
        {[1, 2, 3, 4, 5].map((el) => (
          <BasicButton
            key={el}
            themeState={props.themeState}
            width='4rem'
            height='4rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.8rem'
            text={el}
          />
        ))}
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export default Pagination;
