import React from "react";
import styled from "styled-components";
import DetailContainer from "containers/detailCon";

const Home = ({ match, ...props }) => {
  return (
    <Wrap>
      <DetailContainer match={match} />
    </Wrap>
  );
};

const Wrap = styled.div`
  background: #fff;
  margin: 0 auto;
  min-width: 320px;
  height: 100%;
  max-width: 420px;
`;

export default Home;
