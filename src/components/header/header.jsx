import React from "react";
import styled from "styled-components";
import logo from "img/ci_logo.gif";
import logoName from "img/ci_company_name.svg";
import { Link } from "react-router-dom";

const Header = ({ fixedOn, ...props }) => {
  return (
    <HeaderWrap>
      <div className="topTitle">
        <Link to="/">
          <img src={logo} alt="" />
          <img src={logoName} alt="" />
        </Link>
        <span>로그인/가입</span>
      </div>
      <div className={`topMenu ${fixedOn && "fixedOn"}`}>
        <Link to="/">시장</Link>
        <Link to="/">맛집</Link>
        <Link to="/">온라인</Link>
        <Link to="/">도매</Link>
        <Link to="/">시세</Link>
        <Link to="/">스페셜</Link>
        <Link to="/">후기</Link>
        <Link to="/">문의</Link>
      </div>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  position: relative;
  top: 0;
  z-index: 30;
  width: 100%;
  background: #fff;

  & > .topTitle {
    margin: 0 10px 0 15px;

    &::after {
      content: "";
      clear: both;
      display: block;
    }

    & > a {
      display: block;
      float: left;

      &::after {
        content: "";
        clear: both;
        display: block;
      }

      & > img {
        float: left;
      }

      & > img:first-child {
        margin: 4px 0;
        width: 42px;
        height: 42px;
        background-repeat: no-repeat;
        & + img {
          margin: 15px 0 15px 10px;
          width: 131px;
          height: 20px;
        }
      }
    }
    & > span {
      float: right;

      font-size: 15px;
      font-weight: 400;
      line-height: 50px;
      letter-spacing: -0.5px;
      color: #444444;

      cursor: pointer;
    }
  }
  & > .topMenu {
    max-width: 100%;
    width: 100%;
    height: 42px;
    background: #1c79bc;

    &.fixedOn {
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      max-width: 420px;
      min-width: 320px;

      z-index: 60;
    }

    & > a {
      float: left;
      display: block;
      width: ${100 / 8}%;

      font-size: 15px;
      color: #ffffff;
      letter-spacing: -0.5px;
      line-height: 42px;
      font-weight: 500;
      text-align: center;
    }
  }
`;

export default Header;
