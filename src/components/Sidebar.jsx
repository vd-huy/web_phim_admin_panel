import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import CategoryIcon from "@mui/icons-material/Category";
import AppsIcon from '@mui/icons-material/Apps';
import PublicIcon from '@mui/icons-material/Public';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";


const Sidebar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  
  const [active,setActive] = useState(location.pathname.split("/")[1]);

  const handleActive = (text) => {
    
    navigate(`/${text.toLowerCase()}`);
    window.scrollTo({
            top: 0,
            behavior: "smooth", // Adds smooth scrolling effect
          });

    setActive(text.toLowerCase())
  };
  return (
    <div className="lg:w-[230px] h-[100%] shadow-lg fixed top-0 bottom-0 left-0 lg:block transition-all bg-white">
      <List>
        <ListItem sx={{ justifyContent: "center", alignItems: "center" }}>
          HuyEndy
        </ListItem>
        {["Dashboard", "Category","Country","Genre","Movie"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => {
              handleActive(text);
            }}
            sx={
              active === text.toLocaleLowerCase() && {
                bgcolor: "#e6f4ff",
              }
            }
          >
            <ListItemButton>
              <ListItemIcon
                sx={
                  active === text.toLocaleLowerCase() && {
                    color: "rgb(22, 119, 255);",
                  }
                }
              >
                {index === 0 ? (
                  <SpeedIcon />
                ) : index === 1 ? (
                  <CategoryIcon />
                ) : index === 2 ? (
                  <PublicIcon />
                ) : index === 3 ? (
                  <AppsIcon />
                ) : (
                  index === 4 && <LiveTvIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={
                  active === text.toLocaleLowerCase()&& {
                    color: "rgb(22, 119, 255);",
                  }
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
