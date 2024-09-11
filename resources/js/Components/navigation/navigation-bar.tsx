import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "@inertiajs/react";
import { Menu, MenuItem } from "@mui/material";
import "../../../css/navigation-bar.css";

const NavigationBar = () => {
    const currentPage = () => {
        if (
            window.location.pathname.includes("/desktops") ||
            window.location.pathname.includes("/laptops") ||
            window.location.pathname.includes("/meeting-room-laptops")
        ) {
            return "/equipment";
        } else {
            return window.location.pathname;
        }
    };

    const [selectedUrl, setSelectedUrl] = useState<string>(currentPage);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setSelectedUrl(currentPage);
    }, [window.location.pathname]);

    return (
        <div style={{ paddingBottom: "90px", position: "relative" }}>
            <Box
                sx={{
                    backgroundColor: "#4a98de",
                    position: "fixed",
                    width: "100%",
                    opacity: 1,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {/* Display Page Tabs */}
                <Tabs
                    value={selectedUrl}
                    centered
                    aria-label="Navigation Tabs"
                    selectionFollowsFocus
                    sx={{
                        "& .MuiTab-root": {
                            height: "20px",
                            padding: "35px 40px",
                            color: "#fff",
                            backgroundColor: "#4a98de",
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
                    {/* Navigate to selected Pages */}
                    <Link href={route("employees.index")} value="/employees">
                        <Tab
                            className={selectedUrl === "/employees" ? "Mui-selected" : ""}
                            label="Employees"
                            aria-label="Employees Page"
                            sx={{ width: "20vw", maxWidth: "200px" }}
                        />
                    </Link>
                    <Link href="" onClick={e => e.preventDefault()} value={"/equipment"}>
                        <Tab
                            label="Equipment"
                            aria-label="Equipment Page"
                            component="button"
                            className={selectedUrl.includes("/equipment") ? "Mui-selected" : ""}
                            onClick={e => {
                                e.preventDefault();
                                handleClick(e);
                            }}
                            sx={{ width: "20vw", maxWidth: "200px" }}
                        />
                    </Link>
                    <Link href={route("teams.index")} value="/teams">
                        <Tab
                            className={selectedUrl === "/teams" ? "Mui-selected" : ""}
                            label="Teams"
                            aria-label="Phone Page"
                            sx={{ width: "20vw", maxWidth: "200px" }}
                        />
                    </Link>

                    <Link href={route("logs.index")} value="/logs">
                        <Tab
                            className={selectedUrl === "/logs" ? "Mui-selected" : ""}
                            label="Logs"
                            value="/logs"
                            aria-label="Logs Page"
                            sx={{ width: "20vw", maxWidth: "200px" }}
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
                        <Link href={route("equipment.desktops")}>
                            <MenuItem
                                sx={{
                                    padding: 0,
                                    "&:hover": {
                                        backgroundColor: "#ddd"
                                    }
                                }}
                                onClick={handleClose}
                            >
                                <Tab
                                    className={
                                        window.location.pathname.includes("/equipment/desktops") ? "Mui-selected" : ""
                                    }
                                    sx={{
                                        width: "100%",
                                        padding: "20px 32px",
                                        alignItems: "flex-start"
                                    }}
                                    label="Desktops"
                                    aria-label="Desktops"
                                />
                            </MenuItem>
                        </Link>
                        <Link href={route("equipment.laptops")}>
                            <MenuItem
                                sx={{
                                    padding: 0,
                                    "&:hover": {
                                        backgroundColor: "#ddd"
                                    }
                                }}
                                onClick={handleClose}
                            >
                                <Tab
                                    className={
                                        window.location.pathname.includes("/equipment/laptops") ? "Mui-selected" : ""
                                    }
                                    sx={{
                                        width: "100%",
                                        padding: "20px 32px",
                                        alignItems: "flex-start"
                                    }}
                                    label="Laptops"
                                    aria-label="Laptops"
                                />
                            </MenuItem>
                        </Link>
                        <Link href={route("equipment.meeting-room-laptops")}>
                            <MenuItem
                                sx={{
                                    padding: 0,
                                    "&:hover": {
                                        backgroundColor: "#ddd"
                                    }
                                }}
                                onClick={handleClose}
                            >
                                <Tab
                                    className={
                                        window.location.pathname.includes("/equipment/meeting-room-laptops")
                                            ? "Mui-selected"
                                            : ""
                                    }
                                    sx={{
                                        width: "100%",
                                        padding: "20px 32px",
                                        alignItems: "flex-start"
                                    }}
                                    label="Meeting Room Laptops"
                                    aria-label="meeting-room-laptops"
                                />
                            </MenuItem>
                        </Link>
                    </Menu>
                </Tabs>
            </Box>
        </div>
    );
};

export default NavigationBar;
