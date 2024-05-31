import { QueryBuilderColumn } from "@/types";

import React, { useState } from "react";

import { FormControlLabel, Switch, Typography } from "@mui/material";

const IndividualToggle = (props: {
    column: QueryBuilderColumn;
    columnToggledHandler: (column: QueryBuilderColumn, state: boolean) => void;
}) => {
    const [shown, setShown] = useState(!props.column.hidden);

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={shown}
                    onChange={e => {
                        setShown(e.target.checked);
                        props.columnToggledHandler(props.column, !e.target.checked);
                    }}
                    color="primary"
                />
            }
            label={
                <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
                    {props.column.label}
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

export default IndividualToggle;
