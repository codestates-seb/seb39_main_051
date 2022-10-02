import styled from 'styled-components';
import SubscribeMark from '../assets/SubscribeMark';
import {
  faReact,
  faJava,
  faSquareJs,
} from '@fortawesome/free-brands-svg-icons';
import {
  faNetworkWired,
  faDatabase,
  faLeaf,
  faFolderTree,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CategoryCard = ({categoryName, questionCategoryId, handleClick, isSubscribe}) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  let content = null;
  switch (categoryName) {
    case 'React':
      content = <FontAwesomeIcon icon={faReact} size='2x' />;
      break;
    case 'Javascript':
      content = <FontAwesomeIcon icon={faSquareJs} size='2x' />;
      break;
    case 'Java':
      content = <FontAwesomeIcon icon={faJava} size='2x' />;
      break;
    case 'Spring':
      content = <FontAwesomeIcon icon={faLeaf} size='2x' />;
      break;
    case 'Data Structure':
      content = <FontAwesomeIcon icon={faFolderTree} size='2x' />;
      break;
    case 'Database':
      content = <FontAwesomeIcon icon={faDatabase} size='2x' />;
      break;
    case 'Network':
      content = <FontAwesomeIcon icon={faNetworkWired} size='2x' />;
      break;
    case 'OS':
      content = <FontAwesomeIcon icon={faGear} size='2x' />;
      break;
    default:
      content = null;
      break;
  }
  return (
    <>
      <CategoryCardLayout
        onClick={() => handleClick(questionCategoryId,categoryName, isSubscribe)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isHovering ? (
          isSubscribe ? (
            <>
              <CategoryCardWrapper themeState={themeState} isSubscribe={isSubscribe}>
                <SubscribeMark />
                <LogoLayout>
                  <div>{categoryName}</div>
                  <div>구독취소하기</div>
                </LogoLayout>
              </CategoryCardWrapper>
              <div className='subscribe-web'>ㅤ</div>
            </>
          ) : (
            <>
              <CategoryCardWrapper themeState={themeState}  isSubscribe={isSubscribe}>
                <LogoLayout>
                  <div>{categoryName}</div>
                  <div>구독하기</div>
                </LogoLayout>
              </CategoryCardWrapper>
              <div className='subscribe-web'>ㅤ</div>
            </>
          )
        ) : isSubscribe ? (
          <>
            <CategoryCardWrapper themeState={themeState}  isSubscribe={isSubscribe}>
              <SubscribeMark />
              <LogoLayout>
                <div>{content}</div>
                <NameWrapper>{categoryName}</NameWrapper>
              </LogoLayout>
            </CategoryCardWrapper>
            <div className='subscribe-web'>구독 중</div>
          </>
        ) : (
          <>
            <CategoryCardWrapper themeState={themeState}  isSubscribe={isSubscribe}>
              <LogoLayout>
                <div>{content}</div>
                <NameWrapper>{categoryName}</NameWrapper>
              </LogoLayout>
            </CategoryCardWrapper>
            <div className='subscribe-web'>ㅤ</div>
          </>
        )}
      </CategoryCardLayout>
    </>
  );
};

const CategoryCardLayout = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  position: relative;
  width: 18.5rem;
  //회전 애니메이션
  .subscribe-web {
    text-align: center;
    margin-top: 1rem;
  }
  @media screen and (max-width: 412px) {
    display: flex;
    .subscribe-web {
      display: none;
    }
  }
`;
const CategoryCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 18.5rem;
  height: 7.5rem;
  border-radius: 1.5rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.themeState === 'light' ? props.isSubscribe ? 'var(--color-yellow)' :  '#FFE57A': props.isSubscribe ? 'var(--color-navy)' :  'var(--color-black)'}; //
  :hover {
    background-color: ${(props) =>
      props.themeState === 'light' ? '#FFE57A' : 'var(--color-navy)'};
  }
`;
const LogoLayout = styled.div`
  @media screen and (max-width: 412px) {
  }
`;
const NameWrapper = styled.div`
  padding-top: 0.5rem;
`;

export default CategoryCard;
