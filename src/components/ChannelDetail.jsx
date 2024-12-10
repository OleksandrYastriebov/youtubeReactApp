import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Videos } from "./index"
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { avatar } from "../assets"

const ChannelDetail = () => {
    const [channelDetails, setChannelDetails] = useState();
    const [channelVideos, setChannelVideos] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        const fetchResults = async () => {
            const channelData = await fetchFromAPI(`channels?part=snippet%2Cstatistics&id=${id}`);
            setChannelDetails(channelData?.items[0]);

            const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);
            setChannelVideos(videosData?.items);
        }
        fetchResults();
    }, [id])

    const snippet = channelDetails?.snippet;

    return (
        <Box>
            <Box minHeight="95vh">
                <div style={{
                    background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #833ab4)",
                    zIndex: 10,
                    height: "300px"
                }}/>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-130px"
                }}>
                    <CardContent sx={{
                        textAlign: "center",
                        color: "#FFF"
                    }}>
                        <Box sx={{
                            width: "180px",
                            height: "180px",
                            borderRadius: "50%",
                            background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #833ab4)",
                            padding: "5px",
                        }}>
                            <CardMedia
                                component="img"
                                image={snippet?.thumbnails?.high?.url || avatar}
                                alt={snippet?.title}
                                sx={{
                                    borderRadius: "50%",
                                    width: "100%",
                                    height: "100%",
                                }}
                                onError={(err) => {
                                    err.target.src = avatar
                                }}/>
                        </Box>
                        <Typography variant="h6" fontWeight="bold" sx={{
                            fontSize: "20px",
                            color: "gray"
                        }}>
                            {snippet?.title}
                        </Typography>
                        <Typography variant="subtitle2" sx={{color: "lightgray"}}>
                            {parseInt(channelDetails?.statistics?.subscriberCount).toLocaleString("en-US")} Subscribers
                        </Typography>
                    </CardContent>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                    <Videos videos={channelVideos} justifyContent="center"/>
                </Box>
            </Box>
        </Box>
    );
}

export default ChannelDetail;