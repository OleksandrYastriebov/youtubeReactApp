import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Box, Typography } from "@mui/material";
import { Videos } from "./index";

const SearchFeed = () => {

    const {searchTerm} = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
            .then((data) => setVideos(data.items));
    }, [searchTerm]);

    return (
        <Box p={2} sx={{overflowY: "auto", height: "90vh", flex: 2}}>
            <Typography variant="h4" fontWeight="bold" mb={2} color="white">
                Search Results for <span style={{color: "#FC1503"}}> {searchTerm} </span> videos
            </Typography>
            <Videos videos={videos} justifyContent="center"/>
        </Box>
    );
}

export default SearchFeed;