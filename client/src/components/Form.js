import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';
import { setCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

const Form = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const navigate = useNavigate();
  const [certificationBtn, setCertificationBtn] = useState('인증번호보내기');
  const [inputValue, setInputValue] = useState({
    nickName: '',
    email: '',
    certification: '',
    password: '',
    rePassword: '',
    certificationNumber: '',
  });
  const { nickName, email, password, rePassword, certificationNumber } =
    inputValue;
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);
  const [emailCertification, setEmailCertification] = useState(false);
  const [emailDesc, setEmailDesc] = useState('');
  const [passwordDesc, setPasswordDesc] = useState('');
  const [rePasswordDesc, setRePasswordDesc] = useState('');

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const regNumber = /[0-9]/g;
  const regString = /[a-zA-Z]/g;
  const regSpecialCharacter =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const emailValidation = () => {
    if (regEmail.test(email)) {
      setEmailValid(true);
      setEmailDesc('');
    } else {
      setEmailValid(false);
      setEmailDesc('이메일 형식이 유효하지 않습니다.');
    }
  };

  const passwordValidation = () => {
    if (
      7 < password.length &&
      password.length < 21 &&
      regNumber.test(password) &&
      regString.test(password) &&
      regSpecialCharacter.test(password)
    ) {
      setPasswordValid(true);
      setPasswordDesc('');
    } else {
      setPasswordValid(false);
      setPasswordDesc(
        '8~20자 영문 대 소문자, 숫자, 특수문자를 포함하여야 합니다. '
      );
    }
  };

  const rePasswordValidation = () => {
    if (rePassword === password) {
      setRePasswordValid(true);
      setRePasswordDesc('');
    } else {
      setRePasswordValid(false);
      setRePasswordDesc('비밀번호가 일치하지 않습니다.');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (props.status === 'login') {
      //로그인 일시
      if (!email || !password) {
        alert('이메일과 비밀번호를 작성해주세요!');
        return;
      }

      try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL + '/member/login',
          {
            email: email,
            password: password,
          },
          {
            headers: {
              withCredentials: true,
            },
          }
        );
        const headers = response.headers;
        setCookie('accessToken', headers.authorization, 60);
        alert('로그인이 되었습니다.');
        navigate('/');
        window.location.reload();
      } catch (err) {
        alert('이메일 또는 비밀번호를 확인해주세요.');
      }
    } else {
      //회원가입 일시
      if (
        emailValid &&
        passwordValid &&
        rePasswordValid &&
        emailCertification
      ) {
        try {
          axios
            .post(
              process.env.REACT_APP_API_URL + '/member/post',
              {
                email: email,
                password: password,
                nickname: nickName,
              },
              {
                headers: {
                  withCredentials: true,
                },
              }
            )
            .then((res) => {
              alert('회원가입이 되었습니다.');
              navigate('/login');
              window.location.reload();
            })
            .catch((err) => alert('이미 존재하는 email입니다.'));
        } catch (err) {
          alert('회원 가입 형식에 맞춰 작성해주세요.');
        }
      } else {
        window.alert('회원 가입 형식에 맞춰 작성해주세요.');
      }
    }
  };
  const handleSertificationPost = async () => {
    console.log(email);
    await axios
      .post(process.env.REACT_APP_API_URL + `/mailAuth/createMailAuth`, {
        email,
      })
      .then((res) => {
        setCertificationBtn('인증번호다시보내기');
        alert(
          '기입하신 이메일로 인증번호가 발송되었습니다. 인증번호를 입력해주세요'
        );
      });
  };

  const handleCheckCertification = async () => {
    if(certificationNumber){
      await axios
      .post(process.env.REACT_APP_API_URL + `/mailAuth/verifyMailAuth`, {
        email,
        certificationNumber,
      })
      .then((res) => {
        if (res.data.certified === 'CERTIFIED') {
          setEmailCertification(true);
          alert('이메일인증에 성공하셨습니다.');
        } else {
          setEmailCertification(false);
          alert('이메일인증에 실패하셨습니다.');
        }
      })
      .catch((err) => alert(err));
    }else{
      alert('이메일 인증 번호를 입력해주세요!')
    }
  };

  return (
    <Layout themeState={themeState}>
      <Title>{props.status === 'login' ? '로그인' : '회원가입'}</Title>
      <form>
        {props.status === 'login' ? (
          <>
            <InputWrapper themeState={themeState}>
              <label id='email'>이메일</label>
              <input
                id='email'
                name='email'
                type='email'
                onChange={handleInput}
                required
              />
            </InputWrapper>
            <InputWrapper themeState={themeState}>
              <label id='password'>비밀번호</label>
              <input
                id='password'
                name='password'
                onChange={handleInput}
                type='password'
                required
              />
            </InputWrapper>
          </>
        ) : (
          <>
            <InputWrapper themeState={themeState}>
              <label id='nickName'>닉네임</label>
              <input
                id='nickName'
                name='nickName'
                onChange={handleInput}
                required
              />
            </InputWrapper>
            <InputWrapper themeState={themeState}>
              <label id='email'>이메일</label>
              <span>{emailDesc}</span>
              <Certification
                className='beforeMail'
                onClick={() => handleSertificationPost()}
                emailValid={emailValid}
              >
                {certificationBtn}
              </Certification>
              <input
                id='email'
                name='email'
                type='email'
                onChange={handleInput}
                onKeyUp={emailValidation}
                required
              />
            </InputWrapper>
            <InputWrapper themeState={themeState}>
              <label id='certificationNumber'>이메일 인증번호</label>
              <Certification
                className='beforeMail'
                onClick={() => handleCheckCertification()}
                emailValid={emailValid}
              >
                인증번호확인
              </Certification>
              <input
                id='certificationNumber'
                name='certificationNumber'
                onChange={handleInput}
                required
              />
            </InputWrapper>
            <InputWrapper themeState={themeState}>
              <label id='password'>비밀번호</label>
              <input
                id='password'
                name='password'
                type='password'
                onChange={handleInput}
                onKeyUp={passwordValidation}
                required
              />
              <span>{passwordDesc}</span>
            </InputWrapper>
            <InputWrapper themeState={themeState}>
              <label id='rePassword'>비밀번호 확인</label>
              <input
                id='rePassword'
                name='rePassword'
                type='password'
                onChange={handleInput}
                onKeyUp={rePasswordValidation}
                required
              />
              <span>{rePasswordDesc}</span>
            </InputWrapper>
          </>
        )}
        <BasicButton
          padding='1rem 4rem;'
          text={props.status === 'login' ? '로그인하기' : '회원가입하기'}
          backGroundColor='#FF6C02'
          color='#ffffff'
          onClick={submitHandler}
        />
        {props.status === 'login' ? (
          <Redirect themeState={themeState}>
            <a href='/signup'>회원가입하러가기 </a>
          </Redirect>
        ) : (
          <Redirect themeState={themeState}>
            <a href='/login'>로그인하러가기 </a>
          </Redirect>
        )}
      </form>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.themeState === 'light'
      ? 'var(--color-white)'
      : 'var(--color-dark-bg-color )'};
  min-width: 47rem;
  height: 70rem;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: auto;
  label {
    display: block;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 23rem;
    button {
      margin: 2rem 0;
    }
  }
  @media screen and (max-width: 413px) {
    min-width: 0;
    width: 34rem;
  }
`;
const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 3rem;
`;

const InputWrapper = styled.div`
  margin: 1rem 0;
  span {
    color: #808080;
  }
  label {
    display: inline;
    margin: 0.5rem 0;
  }
  input {
    width: 100%;
    height: 3rem;
    margin: 0.5rem 0;
    background-color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
    border: 1px solid #d2d2d2;
    border-radius: 0.3rem;
    color: ${(props) =>
      props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
  }
`;
const Redirect = styled.div`
  text-align: center;
  a {
    display: block;
    text-decoration: none;
    text-align: center;
    color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-blacr)'
        : 'var(--color-white)'};
    margin-bottom: 1.5rem;
  }
  svg {
    margin-right: 0.3rem;
  }
`;

const Certification = styled.span`
  display: ${(props) => (props.emailValid ? 'inline' : 'none')};
  margin: 0 0 0 0;
  font-size: 1rem;
  cursor: pointer;
`;
const CountDown = styled.span``;
export default Form;
