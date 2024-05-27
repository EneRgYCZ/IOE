import { QueryBuilderColumn } from "@/types";

import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

import { Box, ButtonGroup, IconButton, Typography, Button } from "@mui/material";

// Define the ColumnHeader component with props for a column, sortRemoveHandler, and sortChangeHandler
const ColumnHeader: React.FC<{
    col: QueryBuilderColumn; // Single column data
    sortRemoveHandler: () => void; // Handler to remove sorting
    sortChangeHandler: () => void; // Handler to change sorting
}> = ({ col, sortRemoveHandler, sortChangeHandler }) => {
    return (
        <th key={col.key} style={{ minHeight: 32, paddingLeft: 16, paddingTop: 10, paddingBottom: 10 }}>
            {col.sortable ? ( // Check if the column is sortable
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
                    <Typography>{col.label}</Typography>

                    <ButtonGroup>
                        <IconButton
                            size="small"
                            onClick={e => {
                                e.preventDefault(); // Prevent default action
                                sortChangeHandler(); // Call sort change handler
                            }}
                        >
                            {!col.sorted && <FaSort />} {/* Show sort icon if not sorted */}
                            {col.sorted === "asc" && <FaSortUp />} {/* Show ascending sort icon */}
                            {col.sorted === "desc" && <FaSortDown />} {/* Show descending sort icon */}
                        </IconButton>
                        {col.sort_number !== null && <Button disabled>{col.sort_number}</Button>}{" "}
                        {/* Show sort number if not null */}
                        {col.sort_number !== null && (
                            <Button
                                size="small"
                                onClick={e => {
                                    e.preventDefault(); // Prevent default action
                                    sortRemoveHandler(); // Call sort remove handler
                                }}
                            >
                                Delete Sort
                            </Button>
                        )}
                    </ButtonGroup>
                </Box>
            ) : (
                <Typography sx={{ textTransform: "uppercase" }}>{col.label}</Typography> // Show column label in uppercase if not sortable
            )}
        </th>
    );
};

export default ColumnHeader;
