import { QueryBuilderColumn } from "@/types";

import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

import { Box, ButtonGroup, IconButton, Typography, Button } from "@mui/material";

const ColumnHeader: React.FC<{
    col: QueryBuilderColumn;
    sortRemoveHandler: () => void;
    sortChangeHandler: () => void;
}> = ({ col, sortRemoveHandler, sortChangeHandler }) => {
    return (
        <th
            key={col.key}
            style={{
                minHeight: 32,
                maxHeight: 50,
                paddingLeft: 16,
                paddingTop: 10,
                paddingBottom: 10,
                overflow: "hidden"
            }}
        >
            {col.sortable ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", overflow: "hidden" }}>
                    <Typography
                        sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", flexShrink: 0 }}
                    >
                        {col.label}
                    </Typography>

                    <ButtonGroup>
                        <IconButton
                            size="small"
                            sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
                            onClick={e => {
                                e.preventDefault();
                                sortChangeHandler();
                            }}
                        >
                            {!col.sorted && <FaSort />}

                            {col.sorted === "asc" && <FaSortUp />}

                            {col.sorted === "desc" && <FaSortDown />}
                        </IconButton>

                        {col.sort_number !== null && <Button disabled>{col.sort_number}</Button>}

                        {col.sort_number !== null && (
                            <Button
                                sx={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    flexShrink: 0
                                }}
                                size="small"
                                onClick={e => {
                                    e.preventDefault();
                                    sortRemoveHandler();
                                }}
                            >
                                Delete Sort
                            </Button>
                        )}
                    </ButtonGroup>
                </Box>
            ) : (
                <Typography
                    sx={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                    }}
                >
                    {col.label}
                </Typography>
            )}
        </th>
    );
};

export default ColumnHeader;
