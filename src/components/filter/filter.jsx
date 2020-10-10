import React, { useState } from "react";
import styled from "styled-components";
import znDt from "json/zoneData";
import itDt from "json/itemData";

const Filter = ({
  filter,
  setLoadDt,
  setItem,
  setSearch,
  setSort,
  setZone,
  fixedOn,
  ...props
}) => {
  const [ftNum, setFtNum] = useState(0);
  const [searchTxt, setSearchTxt] = useState("");

  const ftSelect = (n) => {
    if (ftNum === n) {
      setFtNum(0);
      return;
    }
    setFtNum(n);
  };

  return (
    <FilterWrap className={fixedOn && "fixedOn"}>
      <div className="filter3">
        <div
          onClick={() => {
            ftSelect(1);
          }}
          className={`area ${ftNum !== 0 && ftNum !== 1 && "off"}`}
        >
          {filter.zone} ▾
        </div>
        <div
          onClick={() => {
            ftSelect(2);
          }}
          className={`object ${ftNum !== 0 && ftNum !== 2 && "off"}`}
        >
          {filter.item} ▾
        </div>
        <div
          onClick={() => {
            ftSelect(3);
          }}
          className={`sort ${ftNum !== 0 && ftNum !== 3 && "off"}`}
        >
          {filter.sort} ▾
        </div>
      </div>
      <div className="ftResult">
        {ftNum === 1 && (
          <div className="arRt">
            <div
              onClick={() => {
                setZone("모든지역");
                setFtNum(0);
                setLoadDt(1);
              }}
              className={`${znDt.length < 3 && "bbNo"} ${
                filter.zone === "모든지역" && "on"
              }`}
            >
              모든지역
            </div>
            {znDt.map((val, idx) => {
              const num1 = Math.floor((znDt.length + 1) / 3);
              let bbNo = false;
              if ((znDt.length + 1) % 3 === 0) {
                if (idx + 1 >= znDt.length + 1 - 3) {
                  bbNo = true;
                }
              } else {
                if (idx + 1 > num1 * 3) {
                  bbNo = true;
                }
              }
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setZone(val.label);
                    setFtNum(0);
                    setLoadDt(1);
                  }}
                  className={`${bbNo && "bbNo"} ${
                    filter.zone === val.label && "on"
                  }`}
                >
                  {val.label}
                </div>
              );
            })}
          </div>
        )}

        {ftNum === 2 && (
          <div className="obRt">
            {itDt.map((val, idx) => {
              const num1 = Math.floor(itDt.length / 3);
              let bbNo = false;
              if (itDt.length % 3 === 0) {
                if (idx >= itDt.length - 3) {
                  bbNo = true;
                }
              } else {
                if (idx >= num1 * 3) {
                  bbNo = true;
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setItem(val.label);
                    setFtNum(0);
                    setLoadDt(1);
                  }}
                  className={`${bbNo && "bbNo"} ${
                    filter.item === val.label && "on"
                  }`}
                >
                  {val.label}
                </div>
              );
            })}
          </div>
        )}
        {ftNum === 3 && (
          <div className="stRt">
            <div
              onClick={() => {
                setSort("기본 순");
                setFtNum(0);
                setLoadDt(1);
              }}
              className={filter.sort === "기본 순" && "on"}
            >
              기본 순
            </div>
            <div
              onClick={() => {
                setSort("인기 순");
                setFtNum(0);
                setLoadDt(1);
              }}
              className={filter.sort === "인기 순" && "on"}
            >
              인기 순
            </div>
            <div
              onClick={() => {
                setSort("최근 본 가게");
                setFtNum(0);
                setLoadDt(1);
              }}
              className={filter.sort === "최근 본 가게" && "on"}
            >
              최근 본 가게
            </div>
          </div>
        )}
      </div>
      <div className="search">
        <input
          onChange={(e) => {
            setSearchTxt(e.target.value);
          }}
          value={searchTxt}
          type="text"
          placeholder="검색어를 입력하세요."
        />
        <span
          onClick={() => {
            setSearch(searchTxt);
          }}
        >
          검색
        </span>
      </div>
    </FilterWrap>
  );
};

const FilterWrap = styled.div`
  box-shadow: 0 1px 0 0 rgba(204, 204, 204, 0.5);
  background: #fff;

  &.fixedOn {
    position: fixed;
    top: ${42 + 42}px;
    left: 50%;
    transform: translateX(-50%);

    width: 100%;
    max-width: 420px;
    min-width: 320px;

    z-index: 50;
  }

  & > .filter3 {
    width: 100%;
    &:after {
      display: block;
      content: "";
      clear: both;
    }

    & > div {
      float: left;
      width: ${100 / 3}%;
      height: 34px;

      text-align: center;
      font-size: 14px;
      color: #1c79bc;
      letter-spacing: -0.5px;
      line-height: 34px;
      font-weight: normal;

      border: 1px solid #cccccc;
      border-left: none;
      cursor: pointer;

      &:last-of-type {
        border-right: none;
      }
      &.off {
        color: #bbbbbb;
        background: #f1f2f3;
      }
    }
  }
  & > .ftResult {
    position: relative;

    z-index: 10;
    text-align: center;
    & > .arRt {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
      border: 1px solid #cccccc;
      border-left: none;
      border-right: none;
      border-top: none;

      &:after {
        display: block;
        content: "";
        clear: both;
      }

      & > div {
        width: ${100 / 3}%;
        float: left;
        height: 32px;
        line-height: 32px;
        font-size: 15px;
        color: #777;
        letter-spacing: -0.5px;
        font-weight: 400;
        border-bottom: 1px solid #cccccc;
        border-right: 1px solid #cccccc;

        cursor: pointer;

        &:nth-child(3n) {
          border-right: none;
        }
        &.bbNo {
          border-bottom: none;
        }
        &.on {
          color: #444444;
          font-weight: 500;
        }
      }
    }
    & > .obRt {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
      border: 1px solid #cccccc;
      border-left: none;
      border-right: none;
      border-top: none;

      &:after {
        display: block;
        content: "";
        clear: both;
      }

      & > div {
        width: ${100 / 3}%;
        float: left;
        height: 32px;
        line-height: 32px;
        font-size: 15px;
        color: #777;
        letter-spacing: -0.5px;
        font-weight: 400;
        border-bottom: 1px solid #cccccc;
        border-right: 1px solid #cccccc;

        cursor: pointer;

        &:nth-child(3n) {
          border-right: none;
        }
        &.bbNo {
          border-bottom: none;
        }
        &.on {
          color: #444444;
          font-weight: 500;
        }
      }
    }
    & > .stRt {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
      border: 1px solid #cccccc;
      border-left: none;
      border-right: none;
      border-top: none;

      & > div {
        height: 32px;
        line-height: 32px;
        font-size: 15px;
        color: #777;
        letter-spacing: -0.5px;
        font-weight: 400;
        border-top: 1px solid #cccccc;

        cursor: pointer;

        &:first-child {
          border-top: none;
        }
        &.on {
          color: #444444;
          font-weight: 500;
        }
      }
    }
  }

  & > .search {
    position: relative;
    height: 41px;
    padding: 6px 15px 7px;

    border: 1px solid #cccccc;
    border-top: 0px;
    background: #ffffff;

    & > input {
      width: 100%;
      height: 28px;
      padding-right: 40px;

      background: #eff2f4;
      border: 0;
      border-radius: 4px;
      line-height: 28px;
      text-indent: 12px;
      font-size: 14px;
      font-weight: normal;

      &::placeholder {
        color: #bbbbbb;
      }
      &:focus {
        outline: none;
      }
    }
    & > span {
      position: absolute;
      top: 7px;
      right: 15px;
      height: 28px;
      padding: 0 12px;

      color: #bbbbbb;
      font-size: 14px;
      font-weight: normal;
      line-height: 28px;

      cursor: pointer;
    }
  }
`;

export default Filter;
