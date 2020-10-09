import React from "react";
import DetailComp from "components/detail";

const DetailCon = ({ match, ...props }) => {
  return <DetailComp match={match} />;
};

export default DetailCon;
