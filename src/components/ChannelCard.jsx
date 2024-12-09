import React from 'react';
import { Box, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { demoProfilePicture, demoChannelUrl } from "../utils/constants";
import { avatar } from "../assets"
import channelDetail from "./ChannelDetail";

const ChannelCard = ({channelDetail}) => {
    const channelId = channelDetail?.id?.channelId;
    const snippet = channelDetail?.snippet;
    return (
        <Box sx={{
            background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #833ab4)",
            p: "3px",
            borderRadius: "20px",
        }}>
            <Box sx={{
                backgroundColor: "#000",
                boxShadow: "none",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: {xs: "356px", md: "355px"},
                height: "298px",
                margin: "auto"
            }}>
                <Link to={channelId ? `/channel/${channelId}` : demoChannelUrl}>
                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "#FFF"
                    }}>
                        <CardMedia component="img" image={snippet?.thumbnails?.high?.url || demoProfilePicture}
                                   alt={snippet?.title}
                                   sx={{
                                       borderRadius: "50%",
                                       width: "180px",
                                       height: "180px",
                                       mb: 2,
                                       border: "5px solid #E3E3E3"
                                   }}
                                   onError={(err) => {
                                       err.target.src = avatar
                                   }}/>
                        <Typography variant="h6" fontWeight="bold" sx={{
                            color: "gray",
                            "&:hover": {color: "lightgray"}
                        }}>
                            {snippet?.title}
                        </Typography>
                        {snippet?.statistics?.subscriberCount && (
                            <Typography>
                                {parseInt(snippet?.statistics?.subscriberCount).toLocaleString()} Subscribers
                            </Typography>
                        )}
                    </CardContent>
                </Link>
            </Box>
        </Box>
    );
}

export default ChannelCard;