import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChannelDetail, Feed, Navbar, SearchFeed, VideoDetail, PlaylistDetail } from "./components";

const App = () => {
    return (
        <BrowserRouter>
            <Box sx={{backgroundColor: '#000'}}>
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Feed/>}/>
                    <Route path="/video/:id" element={<VideoDetail/>}/>
                    <Route path="/channel/:id" element={<ChannelDetail/>}/>
                    <Route path="/playlist/:id" element={<PlaylistDetail/>}/>
                    <Route path="/search/:searchTerm" element={<SearchFeed/>}/>
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;