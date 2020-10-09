import React, { useState } from "react";
import styled from "styled-components";
import Header from "containers/headerCon";
import RollingBanner from "containers/rollingBannerCon";
import Filter from "containers/filterCon";
import HomeContainer from "containers/homeCon";

const Home = () => {
  const [zone, setZone] = useState("모든지역");
  const [item, setItem] = useState("모든품목");
  const [sort, setSort] = useState("기본 순");
  const [loadDt, setLoadDt] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <Wrap>
      <Header />
      <RollingBanner />
      <Filter
        setZone={setZone}
        setItem={setItem}
        setSort={setSort}
        setSearch={setSearch}
        setLoadDt={setLoadDt}
        filter={{ zone: zone, item: item, sort: sort, search: search }}
      />
      <HomeContainer
        filter={{ zone: zone, item: item, sort: sort, search: search }}
        loadDt={loadDt}
        setLoadDt={setLoadDt}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  background: #f1f2f3;
  margin: 0 auto;
  min-width: 320px;
  max-width: 420px;
  height: 100%;
  min-height: 100vh;
`;

export default Home;
