import { QueryBuilderColumn } from "@/types";

import React from "react";
import { useState } from "react";

import { FormControlLabel, Switch, Typography } from "@mui/material";
import { MenuItem } from "@mui/material";

// Define the ColumnToggler component with props for columns and columnToggledHandler
const ColumnToggler: React.FC<{
    columns: Array<QueryBuilderColumn>; // Array of columns
    columnToggledHandler: (column: QueryBuilderColumn, state: boolean) => void; // Handler for toggling columns
}> = ({ columns, columnToggledHandler }) => {
    // Define the IndividualToggle component for toggling individual columns
    const IndividualToggle: React.FC<{
        column: QueryBuilderColumn; // Single column data
    }> = ({ column }) => {
        const [shown, setShown] = useState(!column.hidden); // State to track if the column is shown

        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={shown} // Switch state based on whether the column is shown
                        onChange={e => {
                            setShown(e.target.checked); // Update state based on switch change
                            columnToggledHandler(column, !e.target.checked); // Call handler with new state
                        }}
                        color="primary" // Color of the switch
                    />
                }
                label={
                    <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
                        {/* Label for the column */}
                        {column.label}
                    </Typography>
                }
                labelPlacement="start" // Position of the label
                sx={{
                    justifyContent: "space-between", // Style for spacing
                    width: "100%", // Full width
                    margin: 0 // No margin
                }}
            />
        );
    };

    return (
        <>
            {columns.map(col => (
                // Map through columns and render IndividualToggle for each
                <MenuItem key={col.key}>
                    <IndividualToggle column={col} /> {/* Render toggle for each column */}
                </MenuItem>
            ))}
        </>
    );
};

export default ColumnToggler;
