import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const SignWrap = styled.div`
  width: 100%;
  margin-top: 3rem;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .formContainer {
    min-width: 400px;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* overflow: hidden; */
    /* border: 1px solid red; */
  }

  .formContainer > h2 {
    align-self: center;
    font-size: 2rem;
    font-weight: 700;
    color: #262626;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    label {
      font-weight: 600;
      margin-top: 1rem;
    }
    input {
      width: 100%;
      height: 40px;
      font-size: 0.875rem;
      border: 1px solid #ccc;
      padding-left: 0.5rem;
      border-radius: 0.5rem;
      color: #000;
    }
    .submit_btn {
      cursor: pointer;
      width: 100%;
      height: 40px;
      background-color: #84c5fb;
      color: #fefefe;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.125rem;
      letter-spacing: -0.04rem;
      font-weight: 600;

      &:hover {
        background-color: #40a9ff;
      }
    }
  }
`;

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //서버로 보낼 값들을 state로 갖고 있음
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfrimPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfrimPasswordHandler = (event) => {
    setConfrimPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Email", Email);
    console.log("Name", Name);
    console.log("Password", Password);
    console.log("ConfirmPassword", ConfirmPassword);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        alert("MovieApp에 오신것을 환영합니다!");
        navigate("/login"); //props.history.push('/') 페이지 이동시 사용
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }); //dispatch: action을 store로 전달(파라미터: 입력받은 데이터(state) )
  };

  return (
    <SignWrap>
      <div className="formContainer">
        <h2>회원가입</h2>

        <form onSubmit={onSubmitHandler}>
          <label>이메일</label>
          <input
            required
            type="email"
            value={Email}
            placeholder="이메일을 입력하세요"
            onChange={onEmailHandler}
          />

          <label>이름</label>
          <input
            required
            type="text"
            value={Name}
            placeholder="이름을 입력하세요"
            onChange={onNameHandler}
          />

          <label>비밀번호</label>
          <input
            required
            type="password"
            value={Password}
            placeholder="비밀번호를 입력하세요"
            onChange={onPasswordHandler}
          />

          <label>비밀번호 확인</label>
          <input
            required
            type="password"
            value={ConfirmPassword}
            placeholder="비밀번호를 다시 입력하세요"
            onChange={onConfrimPasswordHandler}
          />

          <br />
          <button className="submit_btn" type="submit">
            회원 가입
          </button>
        </form>
      </div>
    </SignWrap>
  );
}

export default RegisterPage;
