import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "@inertiajs/react";
import { Menu, MenuItem } from "@mui/material";

const NavigationBar = () => {
    const [selectedUrl, setSelectedUrl] = useState<string>(window.location.pathname);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setSelectedUrl(window.location.pathname);
    }, [window.location.pathname]);

    return (
        <Box sx={{ backgroundColor: "#009ddf" }}>
            <Tabs
                value={selectedUrl}
                centered
                aria-label="Navigation Tabs"
                role="navigation"
                selectionFollowsFocus
                sx={{
                    "& .MuiTab-root": {
                        height: "20px",
                        padding: "35px 40px",
                        color: "#fff",
                        backgroundColor: "#009ddf",
                        "&:hover": {
                            backgroundColor: "#1976d2",
                            opacity: 0.9
                        }
                    },
                    "& .Mui-selected": {
                        color: "#fff !important",
                        backgroundColor: "#1976d2"
                    }
                }}
            >
                <Link href={route("employees.index")} value="/employees">
                    <Tab
                        className={selectedUrl === "/employees" ? "Mui-selected" : ""}
                        label="Employees"
                        value="/employees"
                        aria-label="Employees Page"
                    />
                </Link>
                <Link href="#" onClick={e => e.preventDefault()}>
                    <Tab
                        label="Equipment"
                        aria-label="Equipment Page"
                        component="button"
                        value="/equipment"
                        onMouseOverCapture={handleClick}
                        className={selectedUrl.includes("/equipment") ? "Mui-selected" : ""}
                    />
                </Link>
                <Link href={route("teams.index")} value="/teams">
                    <Tab
                        className={selectedUrl === "/teams" ? "Mui-selected" : ""}
                        label="Teams"
                        value="/teams"
                        aria-label="Phone Page"
                    />
                </Link>

                <Link href={route("logs.index")} value="/logs">
                    <Tab
                        className={selectedUrl === "/logs" ? "Mui-selected" : ""}
                        label="Logs"
                        value="/logs"
                        aria-label="Logs Page"
                    />
                </Link>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button"
                    }}
                >
                    <MenuItem
                        sx={{
                            backgroundColor: "#009ddf",
                            "&:hover": {
                                backgroundColor: "#1976d2",
                                opacity: 0.9,
                                "& .MuiTab-root": {
                                    color: "#fff"
                                }
                            }
                        }}
                        onClick={handleClose}
                    >
                        <Link href={route("equipment.desktops")} value="/equipment/desktops">
                            <Tab
                                className={selectedUrl === "/equipment/desktops" ? "Mui-selected" : ""}
                                label="Desktops"
                                value="/equipment/desktops"
                                aria-label="Desktops"
                            />
                        </Link>
                    </MenuItem>
                    <MenuItem
                        sx={{
                            backgroundColor: "#009ddf",
                            "&:hover": {
                                backgroundColor: "#1976d2",
                                opacity: 0.9,
                                "& .MuiTab-root": {
                                    // Targeting the Tab component directly
                                    color: "#fff" // Ensuring text color changes on hover
                                }
                            }
                        }}
                        onClick={handleClose}
                    >
                        <Link href={route("equipment.laptops")} value="/equipment/laptops">
                            <Tab
                                className={selectedUrl === "/equipment/laptops" ? "Mui-selected" : ""}
                                label="Laptops"
                                value="/equipment/laptops"
                                aria-label="Laptops"
                            />
                        </Link>
                    </MenuItem>
                    <MenuItem
                        sx={{
                            backgroundColor: "#009ddf",
                            "&:hover": {
                                backgroundColor: "#1976d2",
                                opacity: 0.9,
                                "& .MuiTab-root": {
                                    // Targeting the Tab component directly
                                    color: "#fff" // Ensuring text color changes on hover
                                }
                            }
                        }}
                        onClick={handleClose}
                    >
                        <Link href={route("equipment.meeting-room-laptops")} value="/equipment/meeting-room-laptops">
                            <Tab
                                className={selectedUrl === "/equipment/meeting-room-laptops" ? "Mui-selected" : ""}
                                label="Meeting Room Laptops"
                                value="/equipment/meeting-room-laptops"
                                aria-label="meeting-room-laptops"
                            />
                        </Link>
                    </MenuItem>
                </Menu>
            </Tabs>
        </Box>
    );
};

export default NavigationBar;
