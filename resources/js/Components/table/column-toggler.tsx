import { QueryBuilderColumn } from "@/types";

import React, { useRef } from "react";
import { useState } from "react";
import { HiOutlineEyeSlash } from "react-icons/hi2";

import { FormControlLabel, IconButton, Menu, Switch, Typography } from "@mui/material";
import { MenuItem } from "@mui/material";

const ColumnToggler: React.FC<{
    columns: Array<QueryBuilderColumn>;
    columnToggledHandler: (column: QueryBuilderColumn, state: boolean) => void;
}> = ({ columns, columnToggledHandler }) => {
    const hasHiddenColumns = columns.some(column => column.hidden);

    const IndividualToggle: React.FC<{
        column: QueryBuilderColumn;
    }> = ({ column }) => {
        const [hidden, setHidden] = useState(column.hidden);

        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={hidden}
                        onChange={e => {
                            setHidden(e.target.checked);
                            columnToggledHandler(column, e.target.checked);
                        }}
                        color="primary"
                    />
                }
                label={
                    <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
                        {column.label}
                    </Typography>
                }
                labelPlacement="start"
                sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    margin: 0
                }}
            />
        );
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const togglerRef = useRef(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                ref={togglerRef}
                color={hasHiddenColumns ? "primary" : "default"}
                onClick={handleClick}
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    padding: 1
                }}
            >
                <HiOutlineEyeSlash />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {columns.map(col => (
                    <MenuItem key={col.key}>
                        <IndividualToggle column={col} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ColumnToggler;
