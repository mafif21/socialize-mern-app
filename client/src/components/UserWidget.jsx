import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight={500}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} Friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />
      {/* sec row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      {/* third row */}
      <Divider />
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {/* {viewedProfile} */}983
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Impression of your post</Typography>
          <Typography color={main} fontWeight="500">
            {/* {impressions} */}
            423
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography color={main} fontWeight="500" fontSize="1rem" mb="1rem">
          {impressions}
        </Typography>

        <FlexBetween mb="0.5rem" gap="1rem">
          <FlexBetween gap="1rem">
            <img src={twitter} alt="social-media" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>

          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween mb="0.5rem" gap="1rem">
          <FlexBetween gap="1rem">
            <img src={linkedin} alt="social-media" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>

          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
