import React from 'react'
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircle from "@mui/icons-material/CheckCircle";

import {
    demoThumbnailUrl,
    demoVideoUrl,
    demoVideoTitle,
    demoChannelTitle,
    demoChannelUrl
} from "../utils/constants";

const VideoCard = ({video: {id: {videoId}, snippet}}) => {
    return (
        <Card sx={{
            boxShadow: "none",
            borderRadius: 0,
            width: {xs: "100%", sm: "358px", md: "355px"}
        }}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardMedia
                    image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                    alt={snippet?.title}
                    sx={{
                        width: {xs: '100%', sm: '358px', md: "355px"},
                        height: "180px"
                    }}
                />
            </Link>
            <CardContent sx={{
                backgroundColor: "#1E1E1E",
                height: "80px"
            }}>
                <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                    <Typography variant="subtitle1" color="#FFF" fontWeight="bold"
                                title={snippet?.title || demoVideoTitle}>
                        {snippet?.title.length > 60 ? snippet.title.slice(0, 60) + "..." : snippet?.title || demoVideoTitle.slice(0, 60)}
                    </Typography>
                </Link>
                <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{
                        color: "gray",
                        "&:hover": {color: "lightgray"}
                    }}>
                        {snippet?.channelTitle || demoChannelTitle}
                        <CheckCircle sx={{
                            ml: "5px",
                            position: "relative",
                            top: "2px",
                            color: "gray",
                            fontSize: 12
                        }}/>
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
}

export default VideoCard