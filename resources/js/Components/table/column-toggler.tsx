import { QueryBuilderColumn } from "@/types";
import React from "react";
import { MenuItem } from "@mui/material";
import IndividualToggle from "./individual-toggle";

const ColumnToggler: React.FC<{
    columns: Array<QueryBuilderColumn>;
    columnToggledHandler: (column: QueryBuilderColumn, state: boolean) => void;
}> = ({ columns, columnToggledHandler }) => {
    return (
        <>
            {columns.map(col => (
                <MenuItem key={col.key}>
                    <IndividualToggle column={col} columnToggledHandler={columnToggledHandler} />
                </MenuItem>
            ))}
        </>
    );
};

export default ColumnToggler;
