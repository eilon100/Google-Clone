import "./Search.css";
import React, { useRef, useState } from "react";
import Languages from "../language/languageChange";
import { useNavigate } from "react-router";
import { useStateValue } from "../context/stateProvider";

import Button from "@mui/material/Button";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";

function Search({ hideButtons = false }) {
  const { state, dispatch } = useStateValue();
  const navigate = useNavigate();
  const inputReference = useRef(null);
  const [input, setInput] = useState(state.inputState || "");
  const [searchStyle, setSearchStyle] = useState({});
  const [searchIcon, setSearchIcon] = useState(false);
  const [blurToggle, setBlurToggle] = useState(true);

  //while the search is focused
  const inputFocus = () => {
    setSearchStyle({
      backgroundColor: "#303134",
      borderColor: "rgba(223, 225, 229, 0)",
      boxShadow: "0 1px 6px 0 #171717",
    });
    if (hideButtons) {
      setSearchIcon(true);
      setBlurToggle(false);
      setSearchStyle({
        width: "720px",
        position: "relative",
        left: "40px",
      });
    }
  };

  //while the search is blurred
  const inputBlur = () => {
    if (!hideButtons) {
      setSearchStyle({});
    }

    if (!blurToggle) {
      setSearchIcon(false);
      setSearchStyle({});
    }
  };

  //when the search button clicked
  const searchBtnClick = (e) => {
    e.preventDefault();

    if (input.length > 0) {
      dispatch({ type: "inputState", id: input });
      navigate("/search");
    }
  };

  //set focus for the search bar
  const SetFocus = () => {
    inputReference.current.focus();
  };

  //clear all the input while pressing the clear button
  const clearInput = () => {
    SetFocus();
    setInput("");
  };

  return (
    <form className="search">
      <div
        className="search__input"
        style={searchStyle}
        onMouseDown={() => setBlurToggle(true)}
      >
        {hideButtons && (
          <button onClick={searchBtnClick}>
            <SearchIcon htmlColor="#8ab4f8" />
          </button>
        )}
        <Tooltip title={Languages[state.lang].toolTipMic} arrow>
          <KeyboardVoiceIcon htmlColor="grey" />
        </Tooltip>
        <Tooltip title={Languages[state.lang].toolTipKeyboard} arrow>
          <KeyboardIcon htmlColor="grey" />
        </Tooltip>
        {input.length > 0 && (
          <>
            <span className="greyLine"></span>
            <Tooltip title={Languages[state.lang].clear} arrow>
              <ClearOutlinedIcon
                onClick={clearInput}
                style={{ fontSize: "24px", color: "#757b80" }}
              />
            </Tooltip>
          </>
        )}

        <input
          value={input}
          autoFocus={!hideButtons}
          autoComplete="off"
          ref={inputReference}
          id="input"
          type="text"
          onBlur={inputBlur}
          onFocus={inputFocus}
          onChange={(e) => setInput(e.target.value)}
        />
        {!hideButtons && (
          <SearchIcon
            className="SearchIcon"
            htmlColor="grey"
            onClick={SetFocus}
          />
        )}
        {searchIcon && (
          <SearchIcon
            className="SearchIcon"
            htmlColor="grey"
            fontSize="small"
            onClick={SetFocus}
          />
        )}
      </div>
      {!hideButtons && (
        <div>
          {[state.lang] == "english" ? (
            <div className="search__buttons">
              <Button variant="outlined" onClick={searchBtnClick} type="submit">
                {Languages[state.lang].searchBTN}
              </Button>
              <a href="https://www.google.com/doodles">
                <Button variant="outlined">
                  {Languages[state.lang].luckyBTN}
                </Button>
              </a>
            </div>
          ) : (
            <div className="search__buttons">
              <a
                href="https://www.google.com/doodles"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined">
                  {Languages[state.lang].luckyBTN}
                </Button>
              </a>
              <Button variant="outlined" onClick={searchBtnClick} type="submit">
                {Languages[state.lang].searchBTN}
              </Button>
            </div>
          )}
          <div className="Language__availability">
            {[state.lang] == "english" &&
              Languages[state.lang].LanguageAvailability}
            {[state.lang] == "hebrew" || (
              <a onClick={() => dispatch({ type: "lang", id: "hebrew" })}>
                עברית
              </a>
            )}
            {[state.lang] == "arabic" || (
              <a onClick={() => dispatch({ type: "lang", id: "arabic" })}>
                العربية
              </a>
            )}
            {[state.lang] == "english" || (
              <a onClick={() => dispatch({ type: "lang", id: "english" })}>
                English
              </a>
            )}
            {[state.lang] == "english" ||
              Languages[state.lang].LanguageAvailability}
          </div>
        </div>
      )}
    </form>
  );
}

export default Search;
