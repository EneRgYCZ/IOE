import { QueryBuilderColumn } from "@/types";
import React from "react";
import { MenuItem } from "@mui/material";
import IndividualToggle from "./individual-toggle";

// Define the ColumnToggler component with props for columns and columnToggledHandler
const ColumnToggler: React.FC<{
    columns: Array<QueryBuilderColumn>; // Array of columns
    columnToggledHandler: (column: QueryBuilderColumn, state: boolean) => void; // Handler for toggling columns
}> = ({ columns, columnToggledHandler }) => {
    return (
        <>
            {columns.map(col => (
                // Map through columns and render IndividualToggle for each
                <MenuItem key={col.key}>
                    <IndividualToggle column={col} columnToggledHandler={columnToggledHandler} />{" "}
                    {/* Render toggle for each column */}
                </MenuItem>
            ))}
        </>
    );
};

export default ColumnToggler;
