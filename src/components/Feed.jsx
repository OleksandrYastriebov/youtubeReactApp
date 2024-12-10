import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "./index";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {

    const [selectedCategory, setSelectedCategory] = useState("New");
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
            .then((data) => setVideos(data.items));
    }, [selectedCategory]);

    return (
        <Stack
            sx={{flexDirection: {sx: "column", md: "row"}}}
        >
            <Box sx={{
                height: {md: "89vh"},
                borderRight: "1px solid #3D3D3D",
                padding: {sx: "0", md: 2}
            }}>
                <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                <Typography
                    className="copyrighr"
                    variant="body2"
                    sx={{
                        mt: 1.5,
                        color: "#FFF",
                        display: {xs: "none", md: "block"}
                    }}>
                    Copyright 2024 JSM media
                </Typography>
            </Box>
            <Box p={2} sx={{overflowY: "auto", height: "90vh", flex: 2}}>
                <Typography variant="h4" fontWeight="bold" mb={2} color="white">
                    {selectedCategory} <span style={{color: "#FC1503"}}>
                        videos
                    </span>
                </Typography>
                <Videos videos={videos}/>
            </Box>
        < /Stack>
    );
}

export default Feed;