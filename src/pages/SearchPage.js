import react, { useEffect } from "react";
import "./SearchPage.css";
import Search from "./Search";
import useGoogleSearch from "../hooks/useGoogleSearch";
import { useStateValue } from "../context/stateProvider";
import { useNavigate } from "react-router";
import Languages from "../language/languageChange";

import AppsIcon from "@mui/icons-material/Apps";
import MuiSvgIcon from "@mui/icons-material/AccountCircle";
import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArticleIcon from "@mui/icons-material/Article";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

function SearchPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useStateValue();

  const searchPageOptions = [
    {
      href: "",
      style: { color: "#8ab4f8" },
      iconName: Languages[state.lang].all,
      icon: <SearchIcon style={{ color: "#8ab4f8" }} />,
    },
    {
      href: `https://www.google.com/search?q=${state.inputState}&sxsrf=ALiCzsYIMaBw7nE2ZLnq2yv7aEBB7Z2-ug:1653578488233&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjzpJjzu_33AhVOgf0HHQXDD0EQ_AUoAXoECAIQAw&biw=1591&bih=1279&dpr=1`,
      iconName: Languages[state.lang].photo,
      icon: <PhotoCameraBackIcon />,
    },
    {
      href: `https://www.google.com/search?q=${state.inputState}&source=lmns&tbm=nws&bih=1279&biw=1591&hl=iw&sa=X&ved=2ahUKEwj5v539u_33AhUH8hoKHeIjD_oQ_AUoAnoECAEQAg`,
      iconName: Languages[state.lang].news,
      icon: <ArticleIcon />,
    },
    {
      href: `https://www.google.com/search?q=${state.inputState}&hl=iw&tbm=vid&sxsrf=ALiCzsbDoBkBpaSzUsopKpJr9jzU6h8x_w:1653578543176&source=lnms&sa=X&ved=2ahUKEwjw-bGNvP33AhUVQUEAHds2CPwQ_AUoA3oECAEQBQ&biw=1591&bih=1279&dpr=1`,
      iconName: Languages[state.lang].videos,
      icon: <OndemandVideoIcon />,
    },
    {
      href: `https://www.google.com/maps/search/${state.inputState}/@28.6945974,54.0353073,5z/data=!3m1!4b1?hl=iw`,
      iconName: Languages[state.lang].maps,
      icon: <AddLocationAltIcon />,
    },
    {
      href: "/",
      iconName: Languages[state.lang].more,
      icon: <MoreVertIcon />,
    },
  ];
  //costume hook for fetch the search data
  const { data, error } = useGoogleSearch(state.inputState);

  //reset to home page
  useEffect(() => {
    if (state.inputState == "") {
      navigate("/");
    }
  }, []);

  //while pressing the google icon go back to home page
  const homePageBTN = () => {
    navigate("/");
    dispatch({ type: "inputState", id: "" });
  };

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <div className="searchPage__headerLeft">
          <MuiSvgIcon fontSize="large" htmlColor="grey" />
          <Tooltip title={Languages[state.lang].toolTipApp} arrow>
            <AppsIcon htmlColor="grey" className="dots" />
          </Tooltip>
        </div>
        <div className="searchPage__headerRight">
          <Search hideButtons={true} />
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png"
            className="search__img"
            onClick={homePageBTN}
            style={{ cursor: "pointer" }}
          ></img>
        </div>
      </div>
      <div className="searchPage__options">
        {searchPageOptions.map((item, i) => {
          return (
            <div className="searchPage__option">
              <a
                href={searchPageOptions[i].href}
                style={searchPageOptions[i].style}
              >
                {searchPageOptions[i].iconName}
              </a>
              {searchPageOptions[i].icon}
            </div>
          );
        })}
        <div className="searchPage__optionLeft">
          {Languages[state.lang].tools}
        </div>
      </div>
      {data ? (
        <div className="searchPage__results">
          <p className="searchPAge__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for{" "}
            {state.inputState}
          </p>
          {data?.items?.map((item) => (
            <div className="searchPage__result" key={item.link}>
              <a href={item.link} className="searchPage__resultLink">
                {item.displayLink}
              </a>
              <a className="searchPage__resultTitle " href={item.link}>
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="searchPage__results">
          <p className="searchPAge__resultCount">
            {
              (error == 429
                ? "Error number 429 Too Many Requests"
                : "Error number",
              error)
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
