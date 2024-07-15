import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import CategoryIcon from "@mui/icons-material/Category";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ open }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleActive = (text) => {
    if (text === "Dashboard") {
      navigate(`/dashboard`);

      window.scrollTo({
        top: 0,
        behavior: "smooth", // Adds smooth scrolling effect
      });
    } else {
      navigate(`/${text.toLowerCase()}`);
    }
  };
  return (
    <div className="lg:w-[260px] h-[100vh] shadow-lg fixed top-0 bottom-0 left-0 lg:block transition-all">
      <List>
        <ListItem sx={{ justifyContent: "center", alignItems: "center" }}>
          HuyEndy
        </ListItem>
        {["Dashboard", "Category"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => {
              handleActive(text);
            }}
            sx={
              location.pathname === `/${text.toLowerCase()}` && {
                bgcolor: "#e6f4ff",
              }
            }
          >
            <ListItemButton>
              <ListItemIcon
                sx={
                  location.pathname === `/${text.toLowerCase()}` && {
                    color: "rgb(22, 119, 255);",
                  }
                }
              >
                {index === 0 ? (
                  <SpeedIcon />
                ) : index === 1 ? (
                  <CategoryIcon />
                ) : index === 2 ? (
                  <SpeedIcon />
                ) : (
                  index === 3 && <SpeedIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={
                  location.pathname === `/${text.toLowerCase()}` && {
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
