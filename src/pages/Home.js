import React from "react";
import "./Home.css";
import Search from "./Search";
import { useStateValue } from "../context/stateProvider";
import AppsIcon from "@mui/icons-material/Apps";
import MuiSvgIcon from "@mui/icons-material/AccountCircle";
import { Tooltip } from "@mui/material";
import Languages from "../language/languageChange";

function Home() {
  const { state } = useStateValue();

  return (
    <div className="home">
      <div
        className="home__header"
        style={[state.lang] == "english" ? { justifyContent: "flex-end" } : {}}
      >
        <div
          className="home__headerLeft"
          style={
            [state.lang] == "english" ? { flexDirection: "row-reverse" } : {}
          }
        >
          <a href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp">
            <MuiSvgIcon fontSize="large" htmlColor="grey" />
          </a>
          <Tooltip title={Languages[state.lang].toolTipApp} arrow>
            <AppsIcon htmlColor="grey" className="dots" />
          </Tooltip>
          <a href="https://www.google.co.il/imghp?hl=iw&ogbl">
            {Languages[state.lang].photo}
          </a>
          <a href="https://mail.google.com/mail/&ogbl">Gmail</a>
        </div>
      </div>
      <div className="home__body">
        <img
          src="https://www.google.co.il/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png"
          className="home__img"
        ></img>
        <div className="home__inputContainer">
          <Search hideButtons={false} />
        </div>
      </div>
    </div>
  );
}

export default Home;
