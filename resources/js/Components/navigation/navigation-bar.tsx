import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "@inertiajs/react";

const NavigationBar = () => {
    const [selectedUrl, setSelectedUrl] = useState<string>(window.location.pathname); // First page

    useEffect(() => setSelectedUrl(window.location.pathname));

    return (
        <Box sx={{ width: "100%", backgroundColor: "#009ddf" }}>
            <Tabs
                value={selectedUrl}
                centered
                aria-label="Navigation Tabs" // accessibility
                role="navigation"
                selectionFollowsFocus // keyboard actions
                sx={{
                    "& .MuiTab-root": {
                        height: "20px",
                        padding: "35px 40px",
                        color: "#fff",
                        backgroundColor: "#009ddf"
                    },
                    "& .Mui-selected": {
                        color: "#fff !important",
                        backgroundColor: "#1218f4"
                    }
                }}
            >
                <Link
                    href={route("employees.index")}
                    value="/employees"
                    className={selectedUrl === "/employees" ? "Mui-selected" : ""}
                >
                    <Tab label="Employees" value="/employees" aria-label="Employees Page" />
                </Link>

                <Link
                    href={route("equipment.index")}
                    value="/equipment"
                    className={selectedUrl === "/equipment" ? "Mui-selected" : ""}
                >
                    <Tab label="Equipment" value="/equipment" aria-label="Equipment Page" />
                </Link>

                <Link
                    href={route("teams.index")}
                    value="/teams"
                    className={selectedUrl === "/teams" ? "Mui-selected" : ""}
                >
                    <Tab label="Teams" value="/teams" aria-label="Phone Page" />
                </Link>

                <Link
                    href={route("logs.index")}
                    value="/logs"
                    className={selectedUrl === "/logs" ? "Mui-selected" : ""}
                >
                    <Tab label="Logs" value="/logs" aria-label="Logs Page" />
                </Link>
            </Tabs>
        </Box>
    );
};

export default NavigationBar;