import React from "react";
import { Stack, Box } from "@mui/material"
import { VideoCard, ChannelCard, PlaylistCard, Loader } from "./index";

const Videos = ({videos, justifyContent, direction}) => {

    if (!videos?.length) {
        return <Loader/>
    }

    return (
        <Stack direction={direction || "row"} flexWrap="wrap" justifyContent={justifyContent || "start"} gap={2}>
            {videos.map((item, idx) => {
                return (
                    <Box key={item.id + idx}>
                        {item.id.videoId && <VideoCard video={item}/>}
                        {item.id.channelId && <ChannelCard channelDetail={item}/>}
                        {item.id.playlistId && <PlaylistCard playlistDetail={item}/>}
                    </Box>
                );
            })}
        </Stack>
    );
}

export default Videos;