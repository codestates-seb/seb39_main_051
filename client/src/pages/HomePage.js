import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SubscribeBanner from '../components/SubscribeBanner';
import BorderLayout from '../components/BorderLayout';
import {
  Animator,
  Fade,
  ScrollContainer,
  ScrollPage,
  Sticky,
  batch,
  MoveOut,
  MoveIn,
} from 'react-scroll-motion';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie, setCookie } from '../utils/cookie';
import { useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  useEffect(() => {
    if (getCookie('accessToken')) {
      // axios
      //   .get('/getUserInfo', {
      //     headers: {
      //       Authorization: getCookie('accessToken'),
      //     },
      //   })
      //   .then((res) => {
      //     setCookie('memberId', res.data.memberId, 60);
      //     setCookie('nickname', res.data.nickname, 60);
      //   });

      //임시 유저 정보
      setCookie('memberId', 1, 60);
      setCookie('nickname', 'han', 60);
    }
  });

  return (
    <BorderLayout>
      <ScrollContainer>
        <ScrollPage page={0}>
          <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
            <Message>
              <span>
                개발자를 꿈꾸는 <br />
                누구나
              </span>
            </Message>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1}>
          <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
            <Message className='imgSection'>
              <img src={'img/webSubscribe.png'} className='web' />
              <img src={'img/mobileSubscribe.png'} className='mobile' />
              <div>
                매일 자신이 구독한 <br />
                주제의 면접 질문을
                <br />
                메일로 받아보세요
              </div>
            </Message>
          </Animator>
        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
            <Message className='imgSection'>
              <img src='img/webAnswer.png' className='web' />
              <img src={'img/mobileAnswer.png'} className='mobile' />
              <div>
                동료들과 답변을
                <br />
                공유하며 함께
                <br />
                성장하세요!
              </div>
            </Message>
          </Animator>
        </ScrollPage>
        <ScrollPage page={3}>
          <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
            <Message>
              <div>
                당신을 위한
                <br />
                맞춤 면접 서비스
              </div>
            </Message>
          </Animator>
        </ScrollPage>

        <ScrollPage page={4}>
          <ProjectInfo themeState={themeState}>
            <Animator>
              <ProjectName>
                CODESTATES SEB 39기 <br /> 51조 Main Project 매일매일
                <a href='https://github.com/codestates-seb/seb39_main_051'>
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </ProjectName>
            </Animator>
            <Animator className='member' animation={MoveIn(-1000, 0)}>
              FE 이창훈
              <a href='https://github.com/anotheranotherhoon'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </Animator>
            <Animator className='member' animation={MoveIn(1000, 0)}>
              FE 한정윤
              <a href='https://github.com/JungYunHan'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </Animator>
            <Animator className='member' animation={MoveIn(-1000, 0)}>
              BE 김충섭
              <a href='https://github.com/kchs94'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </Animator>
            <Animator className='member' animation={MoveIn(1000, 0)}>
              BE 김수빈
              <a href='https://github.com/soobinkim-kor'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </Animator>
          </ProjectInfo>
        </ScrollPage>
      </ScrollContainer>
      <SubscribeBanner />
    </BorderLayout>
  );
};

const Message = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    font-size: 500%;
    font-weight: bold;
  }
  div {
    font-size: 250%;
  }
  a {
    color: var(--color-black);
  }
  .mobile {
    display: none;
  }
  @media screen and (max-width: 412px) {
    font-size: 1rem;
    .web {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : 'var(--color-white)'};
  font-size: 2rem;
  font-weight: bold;
  height: 100%;
  svg {
    margin-left: 0.5rem;
    background-color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-black)'};
    color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-black)'
        : 'var(--color-white)'};
  }
`;

const ProjectName = styled.div`
  margin-bottom: 1rem;
  font-size: 300%;
  @media screen and (max-width: 412px) {
    font-size: 100%;
  }
`;

export default HomePage;
