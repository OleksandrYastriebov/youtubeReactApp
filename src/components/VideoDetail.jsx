import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, Avatar } from "@mui/material";
import ReactPlayer from "react-player";
import { avatar } from "../assets"
import CheckCircle from "@mui/icons-material/CheckCircle";
import ThumbUp from "@mui/icons-material/ThumbUp";
import Visibility from "@mui/icons-material/Visibility";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Loader, Videos } from "./index";

const VideoDetail = () => {

    const {id} = useParams();
    const [videoData, setVideoData] = useState(null);
    const [relatedVideoData, setRelatedVideoData] = useState(null);
    const [channelData, setChannelData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoApiResponse = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
                const videoItem = videoApiResponse?.items[0];
                setVideoData(videoItem);

                const channelId = videoItem?.snippet?.channelId;

                if (!channelId) {
                    console.error("Channel ID not found in video data");
                    return;
                }

                const channelApiResponse = await fetchFromAPI(`channels?part=snippet%2Cstatistics&id=${channelId}`);
                setChannelData(channelApiResponse?.items[0]);

                const relatedVideosApiResponse = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`);
                setRelatedVideoData(relatedVideosApiResponse.items)


            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [id]);

    if (!videoData || !channelData) {
        return <Loader/>
    }

    const {
        snippet: {title, channelId, channelTitle, description},
        statistics: {viewCount, likeCount}
    } = videoData;

    const {snippet: {thumbnails: {default: {url: channelImage}}}} = channelData;

    return (
        <Box minHeight="95vh">
            <Stack direction={{xs: "column", md: "row"}}>
                <Box flex={4} sx={{overflowY: "auto", height: "100vh"}}>
                    <Box sx={{width: "100%", top: "86px"}}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
                                     className="react-player"
                                     controls/>
                        <Typography color="#fff" variant="h5" fontWeight="bold" p={2} pt={4}>
                            {title}
                        </Typography>
                        <Accordion sx={{backgroundColor: "black"}}>
                            <AccordionSummary expandIcon={<ExpandMore sx={{color: "gray"}}/>}
                                              sx={{backgroundColor: "black", maxWidth: "600px"}}>
                                <Typography color="gray" variant="body2">
                                    {description.slice(0, 80)}...
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography color="gray" variant="body2">
                                    {description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Stack direction={{xs: "column", md: "row"}} justifyContent="space-between" py={1} px={2}
                               sx={{color: "#FFF"}}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={{sm: "subtitle1", md: "h6"}} sx={{
                                    color: "gray",
                                    "&:hover": {color: "lightgray"},
                                    fontSize: {xs: "18px", md: "20px"}
                                }}>
                                    <Stack display="flex"
                                           flexDirection="row"
                                           alignItems="center"
                                           justifyContent={{xs: "start", md: "center"}}
                                           sx={{mb: {xs: "20px", md: 0}}}>
                                        <Avatar alt={channelTitle} src={channelImage || avatar}
                                                sx={{mr: "16px"}}/>

                                        {channelTitle}
                                        <CheckCircle sx={{
                                            fontSize: {xs: "16px", md: "18px"},
                                            ml: "5px",
                                            position: "relative",
                                            top: "3px"
                                        }}/>
                                    </Stack>
                                </Typography>
                            </Link>
                            <Stack direction="row" alignItems="center" gap="20px">
                                <Typography variant="body1" sx={{
                                    opacity: "0.7",
                                    paddingX: "20px",
                                    paddingY: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "30px",
                                    border: "1px solid #FFF"
                                }}>
                                    {parseInt(viewCount).toLocaleString()} views
                                    <Visibility sx={{ml: "10px"}}/>
                                </Typography>
                                <Typography variant="body1" sx={{
                                    opacity: "0.7",
                                    paddingX: "20px",
                                    paddingY: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "30px",
                                    border: "1px solid #FFF"
                                }}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                    <ThumbUp sx={{ml: "10px"}}/>
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box py={2} px={{xs: 5, md: 1}} justifyContent="center" alignItems="center" flex={1}
                     sx={{overflowY: "auto", height: "100vh",}}>
                    <Videos videos={relatedVideoData} direction="column"/>
                </Box>
            </Stack>
        </Box>
    )
        ;
}

export default VideoDetail;