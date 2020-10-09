import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

import backArr from "img/bul_arrow_left.svg";
import eye from "img/bul_view.svg";
import htIc from "img/bul_like.svg";
import star from "img/bul_review.svg";
import message from "img/bul_comment.svg";
import map from "img/bul_location.svg";
import uruk from "img/uruk.jpg";
import redkingcrap from "img/redkingcrap.jpg";
import topContent1 from "img/topContent1.jpg";
import topContent2 from "img/topContent2.jpg";

import stDt from "json/storeData";

import ModalObjPrice from "./modal/objPrice";

const tempArr = [
  {
    name: "레드 킹크랩",
    from: "러시아",
    grow: "자연산",
    unit: [
      { uName: "A급/대", uWeight: "2~3kg", uPrice: "68,000원" },
      { uName: "A급/중", uWeight: "1~1.5kg", uPrice: "30,000원" },
    ],
    img: redkingcrap,
  },
  {
    name: "우럭",
    from: "국산",
    grow: "양식",
    unit: [{ uName: "대", uWeight: "1kg이상", uPrice: "30,000원" }],
    img: uruk,
  },
];

const dayArr = ["일", "월", "화", "수", "목", "금", "토"];

const Detail = ({ match, ...props }) => {
  const [expandDay, setExpandDay] = useState(false);
  const [priceMd, setPriceMd] = useState(false);
  const [objNum, setObjNum] = useState(0);

  return (
    <>
      <DetailWrap>
        {stDt
          .filter((value) => value.uri === `/${match.params.uri}`)
          .map((val, idx) => {
            return (
              <div key={idx} className="mapWrap">
                <div className="headLine">
                  <Link to="/">
                    <img src={backArr} alt="" />
                  </Link>
                  <div className="infoTitle">
                    <span>{val.label}</span>
                    <em>{val.market}</em>
                  </div>
                  <div className="titleRight">
                    <img src={eye} alt="" />
                    <span>31.5만</span>
                    <div>
                      <img src={htIc} alt="" />
                      <span>849</span>
                    </div>
                  </div>
                </div>
                <div className="top">
                  <img src={val.thumbnail} alt="" />
                  <div>
                    <ul>
                      {val.tags.indexOf("today-price") !== -1 && (
                        <li style={{ background: "#80DB35" }}>오늘시세</li>
                      )}
                      {val.tags.indexOf("today-price") === -1 && (
                        <li style={{ background: "#EC7387" }}>전일시세</li>
                      )}
                      {val.tags.indexOf("day-delivery") !== -1 && (
                        <li>당일배송</li>
                      )}
                    </ul>
                    <span>★ {val.summary.rating}</span>
                  </div>
                </div>
                <div className="mid">
                  <p>서울특별시 동작구 674</p>
                  <div className="time">
                    <span>영업시간</span>
                    <div className="timeRight">
                      <strong>
                        {val.state === "OPEN" && "현재 영업 중입니다."}
                        {val.state === "CLOSED" &&
                          "지금은 영업시간이 아닙니다."}
                      </strong>
                      <span>
                        {dayArr[moment().add("day", 0).day()]}요일(오늘): 24시간
                      </span>
                      <span>
                        {dayArr[moment().add("day", 1).day()]}요일(내일): 24시간
                      </span>
                      <span>
                        {dayArr[moment().add("day", 2).day()]}요일(모래): 24시간
                      </span>
                      {!expandDay && (
                        <span
                          onClick={() => {
                            setExpandDay(true);
                          }}
                          className="add"
                        >
                          더보기 ▾
                        </span>
                      )}
                      {expandDay && (
                        <>
                          <span>
                            {dayArr[moment().add("day", 3).day()]}요일(
                            {moment().add("day", 3).format("MM")}/
                            {moment().add("day", 3).format("DD")}): 24시간
                          </span>
                          <span>
                            {dayArr[moment().add("day", 4).day()]}요일((
                            {moment().add("day", 4).format("MM")}/
                            {moment().add("day", 4).format("DD")})): 24시간
                          </span>
                          <span>
                            {dayArr[moment().add("day", 5).day()]}요일((
                            {moment().add("day", 5).format("MM")}/
                            {moment().add("day", 5).format("DD")})): 24시간
                          </span>
                          <span>
                            {dayArr[moment().add("day", 6).day()]}요일((
                            {moment().add("day", 6).format("MM")}/
                            {moment().add("day", 6).format("DD")})): 24시간
                          </span>
                        </>
                      )}
                      <span>휴무: 연중무휴</span>
                    </div>
                  </div>
                  <div className="call">
                    <span>전화걸기</span>
                    <div className="callRight">
                      <div>
                        <strong>010-5575-2755</strong>
                        <span>22시이후 전화필수</span>
                      </div>
                      <div>
                        <strong>010-5575-2755</strong>
                        <span>22시이후 전화필수</span>
                      </div>
                    </div>
                  </div>
                  <div className="delivery">
                    <span>전국택배</span>
                    <div className="deliveryRight">
                      <span>퀵서비스 (사장님께 문의)</span>
                      <span>고속버스화물 (사장님께 문의)</span>
                      <span>택배 (사장님께 문의)</span>
                    </div>
                  </div>
                </div>
                <div className="exploration">
                  <div className="menu">
                    <div className="on">
                      <div>
                        <figure>
                          <img src={star} alt="" />
                        </figure>
                        <span>탐방기</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <figure>
                          <img src={message} alt="" />
                        </figure>
                        <span>{val.summary.comments}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <figure>
                          <img src={map} alt="" />
                        </figure>
                        <span>약도</span>
                      </div>
                    </div>
                  </div>
                  <div className="content">
                    <h1>
                      <strong>최근시세:</strong>2020년 10월 8일
                    </h1>
                    <p>
                      오늘자 시세가 아닙니다. 시세에 변동이 있을 수 있습니다.
                    </p>
                    <p>재난지원금, 제로페이 사용가능</p>
                    <p className="black">
                      전화 시 '인어교주해적단 보고 전화드립니다.' 말씀해 주세요.
                    </p>
                    <div>
                      <button>전화걸기</button>
                      <button>주소복사</button>
                      <button>공유하기</button>
                    </div>
                  </div>
                </div>
                <div className="price">
                  <h2>품목시세</h2>
                  <div
                    onClick={() => {
                      setObjNum(0);
                      setPriceMd(true);
                    }}
                    className="object"
                  >
                    <img src={redkingcrap} alt="" />
                    <div className="objRt">
                      <div className="title">
                        <strong>레드 킹크랩</strong>
                        <span>러시아 | 자연산</span>
                        <em>1kg 당</em>
                      </div>
                      <div className="content">
                        <div>
                          <strong>A급/대</strong>
                          <span>살수율 80% 이상,2~3kg</span>
                          <em>68,000원</em>
                        </div>
                        <div>
                          <strong>A급/중</strong>
                          <span>살수율 80% 이상,1~1.5kg</span>
                          <em>30,000원</em>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setObjNum(1);
                      setPriceMd(true);
                    }}
                    className="object"
                  >
                    <img src={uruk} alt="" />
                    <div className="objRt">
                      <div className="title">
                        <strong>우럭</strong>
                        <span>국산 | 양식</span>
                        <em>1kg 당</em>
                      </div>
                      <div className="content">
                        <div>
                          <strong>대</strong>
                          <span>1kg이상</span>
                          <em>30,000원</em>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menuPrice">
                  <h2>메뉴정보</h2>
                  {tempArr.map((val, idx) => {
                    return (
                      <div>
                        <h2>{val.name}</h2>
                        <div className="imgWrap">
                          <figure>
                            <img src={val.img} alt="" />
                          </figure>
                        </div>
                        <div className="price">
                          {val.unit.map((val, idx) => {
                            return (
                              <div key={idx} className="priceContent">
                                <span className="kind">{val.uName}</span>
                                <span className="realPrice">{val.uPrice}</span>
                                <span className="people">{val.uWeight}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="info">
                          *{val.name}({val.from}/{val.grow}) 구성
                        </div>
                        <figure
                          onClick={() => {
                            setPriceMd(false);
                          }}
                          className="close"
                        ></figure>
                      </div>
                    );
                  })}
                </div>
                <div className="storeContent">
                  <h3>{val.description}</h3>
                  <p>2020년 10월 09일</p>
                  <div className="topContent">
                    <img src={topContent1} alt="" />
                    <img src={topContent2} alt="" />
                    <div className="text1">
                      노량진수산시장 당진수산은
                      <br />
                      활어 2-67,68호입니다.
                      <br />
                      <br />
                      노량진수산시장 신시장 중간쯤이 아니라
                      <br />
                      외곽쪽에 있기 때문에 구매하시고
                      <br />
                      기다리시는데 좀 더 여유롭게
                      <br />
                      대기하실 수 있습니다.
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </DetailWrap>
      {priceMd && <ModalObjPrice objNum={objNum} setPriceMd={setPriceMd} />}
    </>
  );
};

const DetailWrap = styled.div`
  background: #f1f2f3;
  padding-top: 50px;

  & > .mapWrap {
    & > .headLine {
      position: fixed;
      top: 0;
      width: 100%;
      height: 50px;
      max-width: 420px;
      padding: 0 10px;
      border-bottom: #313841 1px solid;
      background: rgba(255, 255, 255, 0.9);
      z-index: 10;
      & > a {
        position: relative;
        display: block;
        float: left;

        width: 30px;
        height: 30px;
        margin: 10px 0;
        margin-right: 10px;
        background-color: #313841;
        border-radius: 15px;

        & > img {
          position: absolute;
          width: 7px;

          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      & > .infoTitle {
        float: left;
        max-width: 190px;
        height: 50px;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        font-size: 17px;
        font-weight: 500;
        line-height: 50px;
        & > span {
          float: left;
          display: block;
          max-width: 130px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        & > em {
          margin: 0 0 0 10px;
          padding: 0 0 0 5px;
          border-left: #6c6c6c 1px solid;
          font-size: 17px;
          font-weight: normal;
        }
      }

      & > .titleRight {
        float: right;
        max-width: 160px;
        height: 50px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        & > img {
          margin-top: ${(50 - 12) / 2}px;
          width: 19px;
        }
        & > span {
          margin-left: 6px;
          line-height: 50px;
          font-size: 15px;
          color: #444444;
        }
        & > div {
          float: right;
          margin: 10px 0 10px 10px;
          padding: 0 8px;
          height: 28px;
          border: #c8cbce 1px solid;
          border-radius: 4px;
          background-color: #ffffff;
          color: #646464;
          font-weight: 500;
          font-size: 13px;
          line-height: 28px;
          & > img {
            float: left;
            width: 18px;
            margin-top: ${(28 - 16.8) / 2}px;
          }
          & > span {
            margin-left: 8px;
            float: left;
          }
        }
      }
    }

    & > .top {
      position: relative;
      height: 180px;

      overflow: hidden;
      & > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 100%;
        object-fit: cover;
      }
      & > div {
        width: 100%;
        height: 23px;
        position: absolute;
        bottom: 10px;
        & > ul {
          margin-left: 15px;
          & > li {
            text-align: center;
            white-space: nowrap;
            padding: 0 6px;
            margin-right: 5px;
            line-height: 23px;
            float: left;
            background: rgba(0, 0, 0, 0.5);
            border-width: 0;
            border-radius: 3px;

            font-size: 12px;
            color: #ffffff;
            letter-spacing: -0.5px;
            font-weight: normal;
          }
        }
        & > span {
          position: absolute;
          height: 23px;
          line-height: 23px;
          right: 10px;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.5);
          border-width: 0;
          border-radius: 3px;
          padding: 0 6px;

          font-size: 12px;
          letter-spacing: -0.5px;
          font-weight: normal;
        }
      }
    }
    & > .mid {
      background: #0070c0;
      padding: 20px;

      color: #ffffff;
      font-size: 15px;
      line-height: 30px;

      & > p {
        font-weight: 500;
        color: #ffffff;
        font-size: 15px;
        line-height: 30px;
      }
      & > .time {
        position: relative;
        & > span {
          font-weight: 500;
          position: absolute;
          left: 0;
          margin: 10px 0 0;
        }
        & > .timeRight {
          margin: 0 0 0 80px;
          padding-top: 10px;
          overflow: hidden;

          & > strong {
            display: block;
          }
          & > span {
            padding-left: 9px;
            display: block;

            background: radial-gradient(
              2px circle at 2px 0.6em,
              #ffffff,
              #ffffff 80%,
              transparent,
              transparent
            );

            &.add {
              background: transparent;
              cursor: pointer;
            }
          }
        }
      }
      & > .call {
        position: relative;
        & > span {
          font-weight: 500;
          position: absolute;
          left: 0;
          margin: 10px 0 0;
        }
        & > .callRight {
          margin: 0 0 0 80px;
          padding-top: 10px;
          overflow: hidden;

          & > div {
            & > strong {
              display: block;
              float: left;

              background-color: #ffffff;
              border-color: #0070c0;
              border-radius: 4px;
              color: #0070c0;

              padding: 0 8px;
              height: 28px;

              font-weight: 500;
              font-size: 13px;
              line-height: 28px;
            }
            & > span {
              display: block;
              float: left;
              margin-left: 5px;
            }
          }
        }
      }
      & > .delivery {
        position: relative;
        & > span {
          font-weight: 500;
          position: absolute;
          left: 0;
          margin: 10px 0 0;
        }
        & > .deliveryRight {
          margin: 0 0 0 80px;
          padding-top: 10px;
          overflow: hidden;

          & > strong {
            display: block;
          }
          & > span {
            padding-left: 9px;
            display: block;

            background: radial-gradient(
              2px circle at 2px 0.6em,
              #ffffff,
              #ffffff 80%,
              transparent,
              transparent
            );
          }
        }
      }
    }
    & > .exploration {
      & > .menu {
        background: #313841;

        color: #7a828d;
        text-decoration: none;
        font-weight: 500;

        &:after {
          content: "";
          clear: both;
          display: block;
        }

        & > div {
          float: left;
          position: relative;
          width: ${100 / 3}%;
          line-height: 35px;
          height: 35px;
          border-left: #404750 1px solid;

          cursor: pointer;

          &:first-child {
            border: none;
          }

          & > div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            & > figure {
              float: left;
              position: relative;
              margin-right: 6px;
              width: 14px;
              height: 36px;

              & > img {
                position: absolute;
                width: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }

            & > span {
              font-size: 15px;
            }
          }
          &.on {
            background: #f1f2f3;
            color: #313841;
            border-radius: 4px 4px 0 0;
            border-color: #313841;
            height: 35px;
            border-bottom: #f1f2f3 1px solid;

            cursor: default;

            & > div {
            }
          }
        }
      }
      & > .content {
        padding: 5px 0 10px;
        text-align: center;
        & > h1 {
          font-size: 15px;
          font-weight: normal;

          line-height: 40px;
          color: #555555;
          & > strong {
            font-weight: 500;
            margin-right: 6px;
          }
        }
        & > p {
          margin: 0 0 10px;
          color: #e73431;
          font-size: 15px;
          letter-spacing: -0.5px;
          line-height: 20px;
          font-weight: 400;

          &:first-of-type {
            margin-top: -5px;
          }

          &.black {
            margin-top: 15px;
            color: #444444;
          }
        }
        & > div {
          margin: 0 10px;
          & > button {
            width: calc(${100 / 3}% - 20px);
            color: #646464;
            font-weight: 500;
            height: 34px;
            line-height: 32px;

            background: linear-gradient(#ffffff, #e4e4e4);
            border: #9fa5ac 1px solid;
            border-radius: 4px;
            box-shadow: 0 1px 2px #d6d7d7;

            cursor: pointer;

            & + button {
              margin-left: 10px;
            }
          }
        }
      }
    }
    & > .price {
      border-style: solid;
      border-color: #cccccc;
      border-width: 0 0 1px;
      padding: 15px;
      box-shadow: 1px 0 0 rgba(204, 204, 204, 0.5);

      overflow: hidden;
      position: relative;
      background: #fff;

      & > h2 {
        color: #e73431;
        border-color: #e73431;

        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        padding-bottom: 5px;
        border-bottom: 2px solid;
        margin-bottom: 10px;
      }
      & > .object {
        cursor: pointer;

        &:not(:first-of-type) {
          margin-top: 20px;
        }
        &:after {
          content: "";
          clear: both;
          display: block;
        }

        & > img {
          float: left;
          border: #c8c8c8 1px solid;
          height: 60px;
          width: 60px;
        }
        & > .objRt {
          float: left;
          width: calc(100% - 80px);
          margin-left: 20px;
          & > .title {
            & > strong {
              font-size: 14px;
              color: #444444;
              letter-spacing: -0.5px;
              font-weight: 500;
            }
            & > span {
              margin-left: 10px;
              color: #7f7f7f;
              font-size: 13px;
              line-height: 20px;
            }
            & > em {
              float: right;
              color: #7f7f7f;
              font-size: 13px;
              line-height: 20px;
            }
          }
          & > .content {
            & > div {
              padding-top: 5px;
              & > strong {
                font-size: 14px;
                color: #444444;
                letter-spacing: -0.5px;
                font-weight: 500;
              }
              & > span {
                margin-left: 10px;
                color: #7f7f7f;
                font-size: 13px;
                line-height: 20px;
              }
              & > em {
                float: right;
                font-size: 14px;
                color: #444444;
                letter-spacing: -0.5px;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
    & > .menuPrice {
      margin-top: 15px;
      padding: 15px;
      background: #fff;

      border-bottom: 1px solid #cccccc;
      box-shadow: 1px 0 0 rgba(204, 204, 204, 0.5);

      & > h2 {
        color: #e73431;
        border-color: #e73431;

        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        padding-bottom: 5px;
        border-bottom: 2px solid;
        margin-bottom: 10px;
      }

      & > div {
        margin-top: 15px;
        & > h2 {
          text-align: center;
          font-size: 14px;
          color: #444444;
          letter-spacing: -1px;
          line-height: 16px;
        }

        & > .imgWrap {
          margin-top: 20px;
          & > figure {
            position: relative;
            width: 100%;
            height: 240px;
            overflow: hidden;

            & > img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);

              width: 100%;
            }
          }
        }

        & > .price {
          margin-top: 10px;
          & > .priceContent {
            & + .priceContent {
              margin-top: 5px;
            }

            &:after {
              display: block;
              content: "";
              clear: both;
            }

            & > span {
              display: block;
              float: left;

              font-size: 14px;
              color: #444444;
              letter-spacing: -1px;
              line-height: 16px;
              font-weight: 400;

              &.kind {
                width: 25%;

                font-weight: 500;
              }
              &.realPrice {
                width: 35%;
              }
              &.people {
                width: 30%;
                color: #e73431;
              }
            }
          }
        }

        & > .info {
          margin-top: 10px;

          font-size: 14px;
          color: #444444;
          font-weight: 300;
        }

        & > .close {
          position: absolute;
          top: 20px;
          right: 20px;

          width: 30px;
          height: 30px;
          background-color: #313841;
          border-radius: 50%;

          cursor: pointer;

          & > img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 15px;
          }
        }
      }
    }
    & > .storeContent {
      margin-top: 15px;
      padding: 15px;
      background: #fff;

      & > h3 {
        color: #323232;
        font-size: 17px;
        line-height: 20px;
        font-weight: 400;
      }

      & > p {
        color: #646464;
        font-size: 13px;
        letter-spacing: -0.5px;
        line-height: 20px;
        font-weight: 400;
      }

      & > .topContent {
        border-top: #e6e6e6 1px solid;
        margin-top: 10px;
        padding-top: 15px;

        & > img {
          width: 100%;
          & + img {
            margin-top: 5px;
          }
        }
        & > .text1 {
          margin-top: 10px;
          text-align: center;
          font-size: 15px;
          color: #444444;
          letter-spacing: -0.5px;
          line-height: 20px;
          font-weight: 400;
        }
      }
    }
  }
`;

export default Detail;
