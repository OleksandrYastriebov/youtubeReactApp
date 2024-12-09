import React from "react";
import { Stack, Typography } from "@mui/material";
import { logo } from "../utils/constants";
import { Link } from "react-router-dom";
import { SearchBar } from "./index";

const Navbar = () => {
    return (
        <Stack direction="row"
               alignItems="center"
               p={2}
               sx={{
                   position: 'sticky',
                   background: '#000',
                   top: 0,
                   justifyContent: "space-between"
               }}>
            <Link to="/" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <img src={logo} alt="Youtube clone logo" height={45} width={45}/>
                <Typography variant="h1" sx={{
                    fontSize: {xs: "16px", md: "21px"},
                    color: "white",
                    fontWeight: "bold",
                    ml: "10px"
                }}>
                    YouClone
                </Typography>
            </Link>
            <SearchBar/>

        </Stack>
    );
}

export default Navbar;