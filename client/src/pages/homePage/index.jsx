import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/navbar";
import UserWidget from "components/UserWidget";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MyPostWidget from "components/MyPostWidget";
import PostsWidget from "components/PostsWidget";
import AdvertWidget from "components/AdvertWidget";
import FriendListWidget from "components/FriendListWidget";

function Homepage() {
  const { _id, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Homepage;
