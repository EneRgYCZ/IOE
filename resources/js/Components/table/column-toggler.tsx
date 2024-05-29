import { QueryBuilderColumn } from "@/types";

import React, { useState } from "react";

import { FormControlLabel, MenuItem, Switch, Typography } from "@mui/material";

const ColumnToggler: React.FC<{
    columns: Array<QueryBuilderColumn>;
    columnToggledHandler: (column: QueryBuilderColumn, state: boolean) => void;
}> = ({ columns, columnToggledHandler }) => {
    const IndividualToggle: React.FC<{
        column: QueryBuilderColumn;
    }> = ({ column }) => {
        const [shown, setShown] = useState(!column.hidden);

        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={shown}
                        onChange={e => {
                            setShown(e.target.checked);
                            columnToggledHandler(column, !e.target.checked);
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

    return (
        <>
            {columns.map(col => (
                <MenuItem key={col.key}>
                    <IndividualToggle column={col} />
                </MenuItem>
            ))}
        </>
    );
};

export default ColumnToggler;
