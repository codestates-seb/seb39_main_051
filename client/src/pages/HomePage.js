import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SubscribeBanner from '../components/SubscribeBanner';
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
import axiosInstance from '../utils/axiosInstance';
import NavigationBar from '../components/NavigationBar';
import Logo from '../assets/Logo';
import CategoryCard from '../components/CategoryCard';
const arr = [
  { categoryName: 'React', questionCategoryId: 2 },
  { categoryName: 'Javascript', questionCategoryId: 8 },
  { categoryName: 'Java', questionCategoryId: 1 },
  { categoryName: 'Spring', questionCategoryId: 3 },
  { categoryName: 'Data Structure', questionCategoryId: 4 },
  { categoryName: 'OS', questionCategoryId: 5 },
  { categoryName: 'Database', questionCategoryId: 6 },
  { categoryName: 'Network', questionCategoryId: 7 },
];

const HomePage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  useEffect(() => {
    if (getCookie('accessToken')) {
      axiosInstance.get('/home').then((res) => {
        setCookie('memberId', res.data.id, 60);
        setCookie('nickname', res.data.nickname, 60);
        setCookie('role', res.data.role, 60);
        setCookie('picture', res.data.picture, 60);
      });
    }
  }, []);

  return (
    <>
      <NavigationBar themeState={themeState} />
      <Container themeState={themeState}>
        <Wrapper>
          <ScrollContainer>
            <ScrollPage page={0}>
              <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
                <WhiteFont>
                  <Logo />
                  <div className='web'>구독형 면접 질문</div>
                  <div className='web'>메일 서비스</div>
                  <div className='web'>MAEILMAIL</div>
                  <div className='web'>매일메일</div>
                  <div className='mobile'>구독형 </div>
                  <div className='mobile'>면접 질문</div>
                  <div className='mobile'>메일</div>
                  <div className='mobile'>서비스</div>
                  <div className='mobile'>MAEILMAIL</div>
                  <div className='mobile'>매일메일</div>
                </WhiteFont>
              </Animator>
            </ScrollPage>
            <ScrollPage page={1}>
              <Animator
                animation={batch(Sticky(), Fade(), MoveOut(0, -200))}
              ></Animator>
            </ScrollPage>
            <ScrollPage page={2}>
              <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
                <ColorFont themeState={themeState}>
                  <div className='sectionTwo web'>
                    면접에서 승리하기 위한 평범하지만
                  </div>
                  <br />
                  <div className='sectionTwo web'>어쩌면 가장 완벽한 방법.</div>
                  <br />
                  <div className='sectionTwo web'>
                    어떠한 질문 앞에서도 냉철해지도록
                  </div>
                  <br />
                  <div className='sectionTwo web'>
                    매일 아침 여러분의 습관에 투자하세요
                  </div>

                  <div className='sectionTwo mobile'>
                    면접에서 승리하기 위한
                  </div>
                  <br />
                  <div className='sectionTwo mobile'>평범하지만</div>
                  <br />
                  <div className='sectionTwo mobile'>
                    어쩌면 가장 완벽한 방법.
                  </div>
                  <br />
                  <div className='sectionTwo mobile'>어떠한 질문 앞에서도</div>
                  <br />
                  <div className='sectionTwo mobile'>냉철할 수 있도록</div>
                  <br />
                  <div className='sectionTwo mobile'>매일 아침 여러분의</div>
                  <br />
                  <div className='sectionTwo mobile'>습관에 투자하세요</div>
                </ColorFont>
              </Animator>
            </ScrollPage>
            <ScrollPage page={3}>
              <CardWrapper>
                <section>
                  <CategoryCard
                    categoryName={arr[0].categoryName}
                    questionCategoryId={arr[0].questionCategoryId}
                  />
                  <CategoryCard
                    categoryName={arr[1].categoryName}
                    questionCategoryId={arr[1].questionCategoryId}
                  />
                  <CategoryCard
                    categoryName={arr[3].categoryName}
                    questionCategoryId={arr[3].questionCategoryId}
                  />
                  <CategoryCard
                    categoryName={arr[2].categoryName}
                    questionCategoryId={arr[2].questionCategoryId}
                  />
                </section>
                <Describe>여러분이 선택한 주제의 면접질문을</Describe>
                <section>
                  <CategoryCard
                    categoryName={arr[4].categoryName}
                    questionCategoryId={arr[4].questionCategoryId}
                  />
                  <CategoryCard
                    categoryName={arr[5].categoryName}
                    questionCategoryId={arr[5].questionCategoryId}
                  />
                  <CategoryCard
                    categoryName={arr[6].categoryName}
                    questionCategoryId={arr[6].questionCategoryId}
                  />
                  <CategoryCard
                    categoryName={arr[7].categoryName}
                    questionCategoryId={arr[7].questionCategoryId}
                  />
                </section>
                <Describe>매일 아침 여러분의 메일로 받아보세요</Describe>
              </CardWrapper>
            </ScrollPage>
            <ScrollPage page={4}>
              <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
                <></>
              </Animator>
            </ScrollPage>
            <ScrollPage page={5}>
              <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
                <WhiteFont>
                  <div className='web'>날아오를 준비 완료.</div>
                  <div className='mobile'>날아오를</div>
                  <br />
                  <div className='mobile'>준비 완료</div>
                </WhiteFont>
              </Animator>
            </ScrollPage>
            <ScrollPage page={6}>
              <ProjectInfo themeState={themeState}>
                <Animator>
                  <ProjectName themeState={themeState}>
                    CODESTATES SEB 39기 <br /> 51조 Main Project 매일메일
                    <a href='https://github.com/codestates-seb/seb39_main_051'>
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </ProjectName>
                </Animator>
                <Animator animation={MoveIn(-1000, 0)}>
                  <span className='member'>FE 이창훈</span>
                  <a href='https://github.com/anotheranotherhoon'>
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Animator>
                <Animator animation={MoveIn(1000, 0)}>
                  <span className='member'>FE 한정윤</span>
                  <a href='https://github.com/JungYunHan'>
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Animator>
                <Animator animation={MoveIn(-1000, 0)}>
                  <span className='member'>BE 김충섭</span>
                  <a href='https://github.com/kchs94'>
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Animator>
                <Animator animation={MoveIn(1000, 0)}>
                  <span className='member'>BE 김수빈</span>
                  <a href='https://github.com/soobinkim-kor'>
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Animator>
              </ProjectInfo>
            </ScrollPage>
          </ScrollContainer>
          <SubscribeBanner />
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 8rem;
  font-size: 1.3rem;
  font-family: 'Noto Sans KR', sans-serif;
  background: ${(props) =>
    props.themeState === 'light'
      ? 'linear-gradient(black  50%, white)'
      : 'linear-gradient(black  50%, var(--color-dark-bg-color) )'};
`;
const Wrapper = styled.div`
  width: 100;
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
  a {
    text-decoration: none;
  }
  svg {
    margin-left: 0.5rem;
    color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-black)'
        : 'var(--color-white)'};
  }
  .member {
    color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-black)'
        : 'var(--color-white)'};
  }
`;

const ProjectName = styled.div`
  margin-bottom: 1rem;
  font-size: 300%;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : 'var(--color-white)'};
  @media screen and (max-width: 413px) {
    font-size: 100%;
  }
`;

const WhiteFont = styled.section`
  color: var(--color-white);
  font-size: 300%;
  font-weight: bold;
  .mobile {
    display: none;
  }
  @media screen and (max-width: 413px) {
    .web {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
`;

const CardWrapper = styled.div`
  section {
    display: grid;
    grid-template-columns: repeat(4, 15%);
    place-items: center;
    justify-content: center;
    margin: 3% 0;
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 50%);
      grid-row-gap: 10%;
    }
    @media screen and (max-width: 413px) {
      grid-template-columns: repeat(2, 50%);
      grid-row-gap: 2.5%;
      padding-bottom: 10%;
    }
  }
`;
const Describe = styled.div`
  color: var(--color-white);
  font-size: 400%;
  font-weight: bold;
  text-align: center;
  @media screen and (max-width: 413px) {
    font-size: 150%;
  }
`;

const ColorFont = styled.div`
  .sectionTwo {
    font-size: 400%;
    font-weight: bold;
    height: 100%;
    font-weight: bold;
    color: transparent;
    background: ${(props) =>
      props.themeState === 'light'
        ? 'linear-gradient(40deg, #ff6c02, #ffa69e)'
        : 'linear-gradient(40deg, #0f52ba, #89CFF0)'};
    -webkit-background-clip: text;
    &.mobile {
      display: none;
    }
    @media screen and (max-width: 413px) {
      font-size: 1rem;
      &.web {
        display: none;
      }
      &.mobile {
        display: block;
        font-size: 2rem;
      }
    }
  }
`;

export default HomePage;
