import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import ht from "img/bul_favorite.svg";
import htOn from "img/bul_favorite_on.svg";
import nxBt from "img/btn_slide_next.svg";
import pvBt from "img/btn_slide_prev.svg";
import ldGif from "img/bul_loding_circle.gif";
import stDtLeng from "json/storeData";

let todayStore = [];
for (let i = 0; i < 5; i++) {
  todayStore.push(Math.floor(Math.random() * (stDtLeng.length - 1)));
}
for (let i = 0; i < todayStore.length; i++) {
  for (let j = 0; j < todayStore.length; j++) {
    if (todayStore[i] === todayStore[j] && i < j) {
      todayStore[j] = Math.floor(Math.random() * (stDtLeng.length - 1));
      j--;
    }
  }
}

const Home = ({ stDt, znDt, filter, loadDt, setLoadDt, fixedOn, ...props }) => {
  const [slideSt, setSlideSt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preAllDt, setPreAllDt] = useState(stDt);

  // 오늘의 가게 슬라이드 갯수
  const slideMax = 5;
  const slideControll = (n) => {
    if (n < 0) {
      setSlideSt(slideMax - 1);
      return;
    } else if (n >= slideMax) {
      setSlideSt(0);
      return;
    }
    setSlideSt(n);
  };

  useEffect(() => {
    const slideTime = setInterval(() => {
      slideControll(slideSt + 1);
    }, 2000);

    return () => {
      clearInterval(slideTime);
    };
  });

  useEffect(() => {
    const scrollLoad = setInterval(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        loadDt < Math.ceil(stDt.length / 10)
      ) {
        setLoading(true);
        setLoadDt(loadDt + 1);
      } else if (loading) {
        setLoading(false);
      }
    }, 500);
    return () => {
      clearInterval(scrollLoad);
    };
  });

  return (
    <HomeWrap className={fixedOn && "fixedOn"}>
      <div className="recommend">
        <h4>오늘의 추천 가게</h4>
        <div className="slideWrap">
          <div
            style={{ width: `${slideMax * 100}%`, left: `-${slideSt * 100}%` }}
            className="todayStoreData"
          >
            {stDt
              .filter((val, idx) => {
                if (todayStore.indexOf(idx) !== -1) {
                  return val;
                }
              })
              .map((val, idx) => {
                // if (idx >= slideMax) {
                //   return <></>;
                // }
                // if (todayStore.indexOf(idx) === -1) {
                //   return <></>;
                // }
                return (
                  <Link
                    style={{ width: `${100 / slideMax}%` }}
                    onClick={() => {
                      let lcArr = JSON.parse(localStorage.prRecent);
                      for (let lcIdx in lcArr) {
                        if (lcArr[lcIdx] === val.id) {
                          lcArr.splice(lcIdx, 1);
                        }
                      }
                      lcArr.push(val.id);
                      if (lcArr.length > 30) {
                        lcArr.splice(0, 1);
                      }
                      localStorage.setItem("prRecent", JSON.stringify(lcArr));
                    }}
                    to={`/detail${val.uri}`}
                    className={`store ${val.state === "CLOSED" && "closed"}`}
                    key={idx}
                  >
                    <div className="storeTitle">
                      <div className="left">
                        <span>
                          <strong>{val.label}</strong>
                          {val.market}
                        </span>
                        <span>{val.description}</span>
                      </div>
                      <div className="right">
                        <span>★ {val.summary.rating}</span>
                        <span>
                          {val.state === "OPEN" && "영업 중"}
                          {val.state === "CLOSED" && "영업종료"}
                        </span>
                      </div>
                    </div>
                    <figure>
                      <img src={val.thumbnail} alt="" />
                      <div>
                        <ul>
                          {val.tags.indexOf("today-price") !== -1 && (
                            <li className="green">오늘시세</li>
                          )}
                          {val.tags.indexOf("today-price") === -1 && (
                            <li className="red">전일시세</li>
                          )}
                          {val.tags.indexOf("day-delivery") !== -1 && (
                            <li>당일배송</li>
                          )}

                          {/* <li>#광어</li>
                        <li>#참돔</li> */}
                        </ul>
                        {val.favorite === "off" && <img src={ht} alt="" />}
                        {val.favorite === "on" && <img src={htOn} alt="" />}
                      </div>
                    </figure>
                  </Link>
                );
              })}
          </div>
          <figure
            onClick={() => {
              slideControll(slideSt + 1);
            }}
            className="nextBt"
          >
            <img src={nxBt} alt="" />
          </figure>
          <figure
            onClick={() => {
              slideControll(slideSt - 1);
            }}
            className="prevBt"
          >
            <img src={pvBt} alt="" />
          </figure>
        </div>
      </div>
      <div className="premium">
        <h4>프리미엄 가게</h4>
        <div className="storeData">
          {preAllDt
            .filter((val, idx) => {
              if (filter.sort === "최근 본 가게") {
                const lcArr = JSON.parse(localStorage.getItem("prRecent"));
                for (let lcVal of lcArr) {
                  if (lcVal === val.id) {
                    return val;
                  }
                }
              }
              if (filter.sort === "인기 순") {
                return val;
              }
              if (filter.sort === "기본 순") {
                return val;
              }
            })
            .filter((val, idx) => {
              if (filter.zone === "모든지역") {
                return val;
              }

              for (let val2 of znDt) {
                if (val2.label === filter.zone) {
                  for (let val3 of val2.locations) {
                    if (val3.label === val.market) {
                      return val;
                    }
                  }
                }
              }
            })
            .filter((val, idx) => {
              if (filter.item === "모든품목") {
                return val;
              }
            })
            .filter((val, idx) => {
              for (let key in val) {
                if (key !== "id" && key !== "state" && key !== "summary") {
                  if (val[key].indexOf(filter.search) !== -1) {
                    return val;
                  }
                }
              }
            })
            .filter((val, idx) => {
              if (idx < loadDt * 10) {
                return val;
              }
            })
            .map((val, idx) => {
              return (
                <Link
                  key={idx}
                  to={`/detail${val.uri}`}
                  onClick={() => {
                    let lcArr = JSON.parse(localStorage.prRecent);
                    for (let lcIdx in lcArr) {
                      if (lcArr[lcIdx] === val.id) {
                        lcArr.splice(lcIdx, 1);
                      }
                    }
                    lcArr.push(val.id);
                    if (lcArr.length > 30) {
                      lcArr.splice(0, 1);
                    }
                    localStorage.setItem("prRecent", JSON.stringify(lcArr));
                  }}
                  className={`store ${val.state === "CLOSED" && "closed"}`}
                >
                  <div className="storeTitle">
                    <div className="left">
                      <span>
                        <strong>{val.label}</strong>
                        {val.market}
                      </span>
                      <span>{val.description}</span>
                    </div>
                    <div className="right">
                      <span>★ {val.summary.rating}</span>
                      <span>
                        {val.state === "OPEN" && "영업 중"}
                        {val.state === "CLOSED" && "영업종료"}
                      </span>
                    </div>
                  </div>
                  <figure>
                    <img src={val.thumbnail} alt="" />
                    <div>
                      <ul>
                        {val.tags.indexOf("today-price") !== -1 && (
                          <li className="green">오늘시세</li>
                        )}
                        {val.tags.indexOf("today-price") === -1 && (
                          <li className="red">전일시세</li>
                        )}
                        {val.tags.indexOf("day-delivery") !== -1 && (
                          <li>당일배송</li>
                        )}

                        {/* <li>#광어</li>
                        <li>#참돔</li> */}
                      </ul>
                      {val.favorite === "off" && <img src={ht} alt="" />}
                      {val.favorite === "on" && <img src={htOn} alt="" />}
                    </div>
                  </figure>
                </Link>
              );
            })}
        </div>
      </div>
      {loading && <img src={ldGif} alt="" className="loading" />}
    </HomeWrap>
  );
};

const HomeWrap = styled.div`
  background: #f1f2f3;

  &.fixedOn {
    margin-top: ${42 + 42 + 34 + 41}px;
  }

  h4 {
    padding: 20px 0px 10px;

    font-size: 14px;
    color: #1c79bc;
    letter-spacing: -0.5px;
    font-weight: 500;
  }

  & > .recommend {
    padding: 0 16px 10px;

    background: #e1e6ea;

    & > .slideWrap {
      position: relative;
      overflow: hidden;

      & > figure {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);

        width: 27px;

        &.prevBt {
          left: 10px;
        }
        &.nextBt {
          right: 10px;
        }

        & > img {
          width: 100%;
        }

        cursor: pointer;
      }

      & > .todayStoreData {
        position: relative;
        left: 0;
        top: 0;

        transition: all 0.5s;

        &:after {
          display: block;
          content: "";
          clear: both;
        }

        & > .store {
          float: left;
          display: block;
          overflow: hidden;
          position: relative;
          border: #d2d4d7 1px solid;
          background: #fff;
          margin: 0 0 10px;
          border-radius: 4px;
          box-shadow: 0 1px 0 0 rgba(204, 204, 204, 0.5);

          & > .storeTitle {
            padding: 12px 70px 12px 15px;

            & span {
              display: block;
            }
            & > .left {
              & > span {
                font-size: 13px;
                color: #444444;
                letter-spacing: -0.5px;
                line-height: 14px;
                font-weight: normal;

                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;

                & > strong {
                  margin-right: 5px;

                  font-size: 14px;
                  color: #444444;
                  letter-spacing: -0.5px;
                  font-weight: 500;
                }

                &:last-child {
                  height: 14px;
                  margin-top: 7px;
                  color: #777777;
                }
              }
            }
            & > .right {
              position: absolute;
              width: 70px;
              height: 61px;
              top: 0;
              right: 0;

              & > span {
                position: absolute;

                font-size: 13px;
                letter-spacing: -0.5px;
                line-height: 14px;

                &:first-child {
                  right: 15px;
                  top: 12px;

                  color: #f5a623;
                  font-weight: 500;
                }
                &:last-child {
                  right: 15px;
                  bottom: 12px;

                  color: #1c79bc;
                  font-weight: normal;
                }
              }
            }
          }

          & > figure {
            position: relative;
            height: 170px;
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

                  &.green {
                    background: #80db35;
                  }
                  &.red {
                    background: #ec7387;
                  }
                }
              }
              & > img {
                position: absolute;
                right: 15px;
                width: 23px;
                height: 23px;
                background-size: 17px;
                background-color: rgba(0, 0, 0, 0.5);
                padding: 2px;
                background-position: 50%;
                border-radius: 3px;
                z-index: 2;
              }
            }
          }
          &.closed {
            & * {
              color: #a0a0ac !important;
            }
            & > figure {
              & > img {
                filter: gray;
                -webkit-filter: grayscale(100%);
              }
              & > div {
                & > ul {
                  & > li {
                    background: rgba(0, 0, 0, 0.5) !important;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  & > .premium {
    padding: 0 16px 10px;

    & > .storeData {
      & > .store {
        display: block;
        overflow: hidden;
        position: relative;
        border: #d2d4d7 1px solid;
        background: #fff;
        margin: 0 0 10px;
        border-radius: 4px;
        box-shadow: 0 1px 0 0 rgba(204, 204, 204, 0.5);

        & > .storeTitle {
          padding: 12px 70px 12px 15px;

          & span {
            display: block;
          }
          & > .left {
            & > span {
              font-size: 13px;
              color: #444444;
              letter-spacing: -0.5px;
              line-height: 14px;
              font-weight: normal;

              & > strong {
                margin-right: 5px;

                font-size: 14px;
                color: #444444;
                letter-spacing: -0.5px;
                font-weight: 500;
              }

              &:last-child {
                margin-top: 7px;
                color: #777777;
              }
            }
          }
          & > .right {
            position: absolute;
            width: 70px;
            height: 61px;
            top: 0;
            right: 0;

            & > span {
              position: absolute;

              font-size: 13px;
              letter-spacing: -0.5px;
              line-height: 14px;

              &:first-child {
                right: 15px;
                top: 12px;

                color: #f5a623;
                font-weight: 500;
              }
              &:last-child {
                right: 15px;
                bottom: 12px;

                color: #1c79bc;
                font-weight: normal;
              }
            }
          }
        }

        & > figure {
          position: relative;
          height: 170px;
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

                &.green {
                  background: #80db35;
                }
                &.red {
                  background: #ec7387;
                }
              }
            }
            & > img {
              position: absolute;
              right: 15px;
              width: 23px;
              height: 23px;
              background-size: 17px;
              background-color: rgba(0, 0, 0, 0.5);
              padding: 2px;
              background-position: 50%;
              border-radius: 3px;
              z-index: 2;
            }
          }
        }
        &.closed {
          & * {
            color: #a0a0ac !important;
          }
          & > figure {
            & > img {
              filter: gray;
              -webkit-filter: grayscale(100%);
            }
            & > div {
              & > ul {
                & > li {
                  background: rgba(0, 0, 0, 0.5) !important;
                }
              }
            }
          }
        }
      }
    }
  }

  & > .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80px;
    transform: translate(-50%, -50%);
  }
`;

export default Home;
