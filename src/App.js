import React from "react";
import bgTxture from "img/bg_texture.svg";
import styled from "styled-components";
import { Route } from "react-router-dom";
import Home from "views/home";
import Detail from "views/detail";

if (!localStorage.getItem("prRecent")) {
  localStorage.setItem("prRecent", JSON.stringify([]));
}
const App = () => {
  return (
    <Bg>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/detail/:uri" component={Detail}></Route>
    </Bg>
  );
};

const Bg = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #333333 url(${bgTxture});
`;

export default App;
