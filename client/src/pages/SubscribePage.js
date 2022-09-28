import styled from 'styled-components';
import BorderLayout from '../components/BorderLayout';
import CategoryCard from '../components/CategoryCard';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const SubscribePage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const arr = [
    '리액트',
    '자바스크립트',
    '자바',
    '스프링',
    '자료구조',
    '네트워크',
    '데이터베이스',
    '운영체제'
  ];
  const mySubscribe = [ '리액트', '자바스크립트']

  const handleSubscribe = (category) => {
    toast.success(`${category}를 구독합니다!`,{
      position:toast.POSITION.TOP_RIGHT,
      className: 'toast-message'
    })

  }
  return (
    <BorderLayout>
      <Message themeState={themeState}>매일 받고 싶은 면접 주제를 선택하세요!</Message>
        <StyledContainer themeState={themeState} />
        <GridLayout>
          {arr.map((el)=><CategoryCard name={el} handleClick={handleSubscribe} isSubscribe={mySubscribe.includes(el)}/>)}
        </GridLayout>
    </BorderLayout>
  );
};

const StyledContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    background-color: ${(props)=>props.themeState==='light'? 'var(--color-orange)' : 'var(--color-gray)'};
    color:var(--color-white);
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
    background-color:  ${(props) => props.themeState==='light' ? 'var(--color-yellow)': 'var(--color-black)'};
  }
`;


const GridLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-row-gap: 20%;
    height:auto;
    place-items: center;
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 50%);
      grid-row-gap: 10%;
      padding-bottom: 20%;
    }
    @media screen and (max-width: 413px) {
      grid-template-columns: repeat(1, 100%);
      grid-row-gap: 2.5%;
      padding-bottom: 40%;
    }
`
const Message = styled.div`
  text-align:center;
  font-weight: bold;
  font-size: 1vw;
  margin-bottom:3%;
  color:${(props)=>props.themeState ==='light' === 'var(--color-black)'};
`


export default SubscribePage;
