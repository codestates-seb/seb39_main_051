import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import BasicButton from './BasicButton';
import { useNavigate, useParams } from 'react-router-dom';

const Pagination = ({ total, page, setPage, setTotal, type, value }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const numPages = Math.ceil(total / 10);

  const questionCategoryArr = [
    'Java',
    'Javascript',
    'Spring',
    'React',
    'Data Structure',
    'Operating System',
    'Database',
    'Network',
  ];
  const freeCategoryArr = ['취업 정보', '고민 상담', '유머', '잡담'];
  const suggestionCategoryArr = ['질문 추가 요청', '질문 수정 요청', '기타'];

  const navigate = useNavigate();
  const { category } = useParams();

  const handleOnClick = (e) => {
    setPage(Number(e.target.innerText));
  };

  useEffect(() => {
    if (type === '질문 답변 공유 게시판') {
      if ((value !== '') & (questionCategoryArr.indexOf(category) !== -1)) {
        axios
          .get(process.env.REACT_APP_API_URL+`/questions/search?keyword=${value}&page=${page}&size=10`)
          .then((res) => setTotal(Number(res.data.pageInfo.totalElements)));
      } else if (value !== '') {
        axios
          .get(
            process.env.REACT_APP_API_URL+`/questions/search?questionCategory=${category}&keyword=${value}&page=${page}&size=10`
          )
          .then((res) => setTotal(Number(res.data.pageInfo.totalElements)));
      } else if (questionCategoryArr.indexOf(category) !== -1) {
        axios
          .get(process.env.REACT_APP_API_URL+`/questions?questionCategory=${category}&page=${page}&size=10`)
          .then((res) => setTotal(Number(res.data.pageInfo.totalElements)));
      } else {
        axios.get(process.env.REACT_APP_API_URL+`/questions?page=${page}&size=10`).then((res) => {
          setTotal(Number(res.data.pageInfo.totalElements));
        });
        navigate('/questions');
      }
    } else if (type === '자유게시판') {
      if ((value !== '') & (freeCategoryArr.indexOf(category) !== -1)) {
        axios
          .get(
            process.env.REACT_APP_API_URL+`/posts/search?category=${category}&keyword=${value}&page=${page}&size=10`
          )
          .then((res) => {
            setTotal(Number(res.data.pageInfo.totalElements));
          });
      } else if (value !== '') {
        axios
          .get(
            process.env.REACT_APP_API_URL+`/posts/search?type=${type}&keyword=${value}&page=${page}&size=10`
          )
          .then((res) => {
            setTotal(Number(res.data.pageInfo.totalElements));
          });
      } else if (freeCategoryArr.indexOf(category) !== -1) {
        axios
          .get(process.env.REACT_APP_API_URL+`/posts?category=${category}&page=${page}&size=10`)
          .then((res) => {
            setTotal(Number(res.data.pageInfo.totalElements));
          });
      } else {
        axios.get(process.env.REACT_APP_API_URL+`/posts?type=자유게시판&page=${page}&size=10`).then((res) => {
          setTotal(Number(res.data.pageInfo.totalElements));
        });
        navigate('/free');
      }
    } else if (type === '건의게시판') {
      if ((value !== '') & (freeCategoryArr.indexOf(category) !== -1)) {
        axios
          .get(
            process.env.REACT_APP_API_URL+`/posts/search?category=${category}&keyword=${value}&page=${page}&size=10`
          )
          .then((res) => {
            setTotal(Number(res.data.pageInfo.totalElements));
          });
      } else if (value !== '') {
        axios
          .get(
            process.env.REACT_APP_API_URL+`/posts/search?type=${type}&keyword=${value}&page=${page}&size=10`
          )
          .then((res) => {
            setTotal(Number(res.data.pageInfo.totalElements));
          });
      } else if (suggestionCategoryArr.indexOf(category) !== -1) {
        axios
          .get(process.env.REACT_APP_API_URL+`/posts?category=${category}&page=${page}&size=10`)
          .then((res) => setTotal(Number(res.data.pageInfo.totalElements)));
      } else {
        axios.get(process.env.REACT_APP_API_URL+`/posts?type=건의게시판&page=${page}&size=10`).then((res) => {
          setTotal(Number(res.data.pageInfo.totalElements));
        });
        navigate('/suggestion');
      }
    }
  }, [page, value]);

  return (
    <>
      <Nav>
        {numPages > 5 && page < numPages - 3 && page > 4 ? (
          <>
            <BasicButton
              key={1}
              onClick={() => setPage(1)}
              aria-current={page === numPages ? 'page' : null}
              themeState={themeState}
              width='4rem'
              height='4rem'
              backGroundColor='var(--color-orange)'
              color='var(--color-white)'
              fontSize='1.8rem'
              text='1'
            />
            <div>...</div>
            {Array(5)
              .fill()
              .map((_, i) => (
                <BasicButton
                  key={page - 2 + i}
                  onClick={handleOnClick}
                  aria-current={page - 2 + i === page ? 'page' : null}
                  themeState={themeState}
                  width='4rem'
                  height='4rem'
                  backGroundColor='var(--color-orange)'
                  color='var(--color-white)'
                  fontSize='1.8rem'
                  text={page - 2 + i}
                />
              ))}
            <div>...</div>
            <BasicButton
              key={numPages}
              onClick={() => setPage(numPages)}
              aria-current={page === numPages ? 'page' : null}
              themeState={themeState}
              width='4rem'
              height='4rem'
              backGroundColor='var(--color-orange)'
              color='var(--color-white)'
              fontSize='1.8rem'
              text={numPages}
            />
          </>
        ) : numPages > 5 && page >= numPages - 3 && page > 5 ? (
          <>
            <BasicButton
              key={1}
              onClick={() => setPage(1)}
              aria-current={page === 1 ? 'page' : null}
              themeState={themeState}
              width='4rem'
              height='4rem'
              backGroundColor='var(--color-orange)'
              color='var(--color-white)'
              fontSize='1.8rem'
              text='1'
            />
            <div>...</div>
            {Array(5)
              .fill()
              .map((_, i) => (
                <BasicButton
                  key={numPages - 4 + i}
                  onClick={handleOnClick}
                  aria-current={numPages - 4 + i === page ? 'page' : null}
                  themeState={themeState}
                  width='4rem'
                  height='4rem'
                  backGroundColor='var(--color-orange)'
                  color='var(--color-white)'
                  fontSize='1.8rem'
                  text={numPages - 4 + i}
                />
              ))}
          </>
        ) : numPages <= 5 ? (
          Array(numPages)
            .fill()
            .map((_, i) => (
              <BasicButton
                key={i + 1}
                onClick={handleOnClick}
                aria-current={page === i + 1 ? 'page' : null}
                themeState={themeState}
                width='4rem'
                height='4rem'
                backGroundColor='var(--color-orange)'
                color='var(--color-white)'
                fontSize='1.8rem'
                text={i + 1}
              />
            ))
        ) : (
          <>
            {Array(5)
              .fill()
              .map((_, i) => (
                <BasicButton
                  key={i + 1}
                  onClick={handleOnClick}
                  aria-current={page === i + 1 ? 'page' : null}
                  themeState={themeState}
                  width='4rem'
                  height='4rem'
                  backGroundColor='var(--color-orange)'
                  color='var(--color-white)'
                  fontSize='1.8rem'
                  text={i + 1}
                />
              ))}
            <div>...</div>
            <BasicButton
              key={numPages}
              onClick={() => setPage(numPages)}
              aria-current={page === numPages ? 'page' : null}
              themeState={themeState}
              width='4rem'
              height='4rem'
              backGroundColor='var(--color-orange)'
              color='var(--color-white)'
              fontSize='1.8rem'
              text={numPages}
            />
          </>
        )}
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-white);

  & div {
    color: var(--color-black);
    font-size: 1.8rem;
  }
`;

export default Pagination;
