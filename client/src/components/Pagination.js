import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import BasicButton from './BasicButton';

const Pagination = ({ total, size, page, setPage, setSize, setTotal }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const numPages = Math.ceil(total / size);

  const handleOnClick = (e) => {
    setPage(Number(e.target.innerText));
  };

  useEffect(() => {
    axios
      .get(`/answer?page=${page}&size=${size}`)
      .then((res) => {
        setTotal(Number(res.data.pageInfo.totalElements));
        setSize(size);
        setPage(page);
      })
      .catch((err) => err);
  }, [page, size]);

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
`;

export default Pagination;
