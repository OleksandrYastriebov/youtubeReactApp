import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"

const SearchBar = () => {

    const [searchString, setSearchSting] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchString) {
            navigate(`/search/${searchString}`);
            setSearchSting("");
        }
    }

    return (
        <Paper
            component="form"
            onSubmit={(event) => {
                handleSubmit(event)
            }}
            sx={{
                borderRadius: 20,
                border: "1px solid #E3E3E3",
                pl: 3,
                boxShadow: "none",
                mr: {sm: 5}
            }}>
            <input
                className="search-bar"
                placeholder="Search..."
                value={searchString}
                onChange={(event) => setSearchSting(event.target.value)}
            />
            <IconButton
                type="submit"
                sx={{p: "10px", color: "red"}}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}

export default SearchBar;