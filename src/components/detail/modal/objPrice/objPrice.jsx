import React from "react";
import styled from "styled-components";
import rkc from "img/redkingcrap.jpg";
import uruk from "img/uruk.jpg";
import close from "img/bul_close_light.svg";

const tempArr = [
  {
    name: "레드 킹크랩",
    from: "러시아",
    grow: "자연산",
    unit: [
      { uName: "A급/대", uWeight: "2~3kg", uPrice: "68,000원" },
      { uName: "A급/중", uWeight: "1~1.5kg", uPrice: "30,000원" },
    ],
    img: rkc,
  },
  {
    name: "우럭",
    from: "국산",
    grow: "양식",
    unit: [{ uName: "대", uWeight: "1kg이상", uPrice: "30,000원" }],
    img: uruk,
  },
];

const ObjPrice = ({ setPriceMd, objNum }) => {
  return (
    <ObjPriceWrap>
      <div className="modalContent">
        <h2>{tempArr[objNum].name}</h2>
        <div className="imgWrap">
          <figure>
            <img src={tempArr[objNum].img} alt="" />
          </figure>
        </div>
        {/* <div className="price">
          {tempArr[objNum].unit.map((val, idx) => {
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
          *{tempArr[objNum].name}({tempArr[objNum].from}/{tempArr[objNum].grow})
          구성
        </div> */}
        <figure
          onClick={() => {
            setPriceMd(false);
          }}
          className="close"
        >
          <img src={close} alt="" />
        </figure>
      </div>
    </ObjPriceWrap>
  );
};

const ObjPriceWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  min-height: 100vh;

  background: rgba(0, 0, 0, 0.6);

  z-index: 9999;

  & > .modalContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: calc(100% - 20px);
    min-width: 300px;
    max-width: 400px;
    padding: 20px;
    border-radius: 4px;
    background: #f7f5f3;

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
`;

export default ObjPrice;
