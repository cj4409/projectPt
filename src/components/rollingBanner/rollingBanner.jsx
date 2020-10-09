import React, { useEffect, useState } from "react";
import styled from "styled-components";
import downArr from "img/bul_arrow_down_white.svg";
import upArr from "img/bul_arrow_up_white.svg";
import rbData from "json/bannerData";

const RollingBanner = () => {
  const [baNum, setBaNum] = useState(0);
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    const timeUp = setInterval(() => {
      if (baNum === rbData.length) {
        setBaNum(0);
      }
      setBaNum(baNum + 1);
    }, 1000);
    return () => {
      clearInterval(timeUp);
    };
  });

  return (
    <RollingBannerWrap>
      <div className="text">
        <ul>
          <li>
            {rbData[baNum % rbData.length].zoneLabel}:{" "}
            {rbData[baNum % rbData.length].label}
          </li>
          <li className="whiteGreen">{rbData[baNum % rbData.length].price}</li>
          <li>{rbData[baNum % rbData.length].comment}</li>
        </ul>
      </div>
      {expand && (
        <div className="allText">
          {rbData.map((val, idx) => {
            return (
              <ul key={idx}>
                <li>
                  {val.zoneLabel}: {val.label}
                </li>
                <li className="whiteGreen">{val.price}</li>
                <li>{val.comment}</li>
              </ul>
            );
          })}
        </div>
      )}

      <figure
        onClick={() => {
          setExpand(!expand);
        }}
      >
        {expand ? <img src={upArr} alt="" /> : <img src={downArr} alt="" />}
      </figure>
    </RollingBannerWrap>
  );
};

const RollingBannerWrap = styled.div`
  position: relative;

  padding: 0;
  background: #313841;
  height: 42px;
  z-index: 20;

  & > .text {
    position: relative;
    height: 100%;

    & > ul {
      display: flex;
      justify-content: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      width: 100%;
      height: 42px;
      line-height: 42px;

      & > li {
        float: left;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: -0.5px;
        font-weight: 500;

        &.whiteGreen {
          margin: 0 0.2em;
          color: #b8e986;
        }
      }
    }
  }
  & > .allText {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #313841;
    & > ul {
      display: flex;
      justify-content: center;

      width: 100%;
      height: 42px;
      line-height: 42px;

      & > li {
        float: left;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: -0.5px;
        font-weight: 500;

        &.whiteGreen {
          margin: 0 0.2em;
          color: #b8e986;
        }
      }
    }
  }

  & > figure {
    position: absolute;
    top: 3px;
    right: 0;

    width: 33px;
    height: 36px;

    cursor: pointer;

    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default RollingBanner;
