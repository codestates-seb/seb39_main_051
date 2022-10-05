import styled from 'styled-components';
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
import SubscribeMarkMobile from '../assets/SubscribeMarkMobile';

const CategoryCardMobile = ({
  categoryName,
  questionCategoryId,
  handleClick,
  isSubscribe,
}) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

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
        onClick={() =>
          handleClick(questionCategoryId, categoryName, isSubscribe)
        }
      >
        {isSubscribe ? (
          <>
            <CategoryCardWrapper
              themeState={themeState}
              isSubscribe={isSubscribe}
            >
              <SubscribeMarkMobile />
              <div>{content}</div>
            </CategoryCardWrapper>
            <div className='subscribe-web'>구독 중</div>
          </>
        ) : (
          <>
            <CategoryCardWrapper
              themeState={themeState}
              isSubscribe={isSubscribe}
            >
              <div>{content}</div>
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
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.themeState === 'light'
      ? props.isSubscribe
        ? 'var(--color-yellow)'
        : 'var(--color-orange)'
      : props.isSubscribe
      ? 'var(--color-navy)'
      : 'var(--color-black)'};
`;

export default CategoryCardMobile;
