import React, { useEffect, useState } from "react";
import HomeComp from "components/home";

import stDt from "json/storeData";
import znDt from "json/zoneData";

const HomeCon = ({ filter, loadDt, setLoadDt, fixedOn }) => {
  return (
    <HomeComp
      filter={filter}
      stDt={stDt}
      znDt={znDt}
      loadDt={loadDt}
      setLoadDt={setLoadDt}
      fixedOn={fixedOn}
    />
  );
};

export default HomeCon;
