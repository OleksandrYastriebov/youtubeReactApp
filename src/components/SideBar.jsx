import React from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

const SideBar = ({selectedCategory, setSelectedCategory}) => {
    return (
        <Stack
            direction="row"
            sx={{
                overflowY: "auto",
                height: {sx: "auto", md: "96%"},
                flexDirection: {md: "column"},
            }}
        >
            {categories.map(({name, icon}) => (
                <button key={name}
                        className="category-btn"
                        onClick={() => {
                            setSelectedCategory(name)
                        }}
                        style={{
                            background: name === selectedCategory && "#FC1503"
                        }}>
                    <span style={{color: name === selectedCategory && "#FFF"}}
                        className="category-icon">
                        {icon}
                    </span>
                    <span>{name}</span>
                </button>
            ))}

        </Stack>
    );
}

export default SideBar;