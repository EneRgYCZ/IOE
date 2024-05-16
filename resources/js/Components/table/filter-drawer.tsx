import * as React from "react";
import Drawer from "@mui/material/Drawer";
import ColumnToggler from "@/Components/table/column-toggler";
import { Box, Typography } from "@mui/material";
import SearchInput from "@/Components/table/search-input";
import { QueryBuilderProps } from "@/types";

const FilterDrawer = (props: {
    isOpen: boolean;
    handleClose: () => void;
    tableData: QueryBuilderProps;
    setTableData: React.Dispatch<React.SetStateAction<QueryBuilderProps>>;
    tableName: string;
}) => {
    return (
        <Drawer open={props.isOpen} onClose={props.handleClose}>
            <Box sx={{ padding: "20px" }}>
                <Typography variant={"h5"}>Filters</Typography>
                <Typography variant={"h6"} sx={{ margin: "30px 0 10px 0" }}>
                    Fields shown
                </Typography>
                <ColumnToggler
                    columns={props.tableData.columns}
                    columnToggledHandler={(column, state) => {
                        const newCols = props.tableData.columns.map(value => {
                            if (value.key === column.key) {
                                value.hidden = state;
                            }

                            return value;
                        });

                        props.setTableData(prev => {
                            return {
                                ...prev,
                                columns: newCols
                            };
                        });
                    }}
                />

                <Typography variant={"h6"} sx={{ margin: "20px 0" }}>
                    Search specific fields
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pb: 1 }}>
                    {props.tableData.searchInputs.map(searchInput => {
                        if (
                            !searchInput.shown ||
                            props.tableData.columns.find(col => col.key == searchInput.key)?.hidden
                        ) {
                            return null;
                        }
                        return (
                            <SearchInput
                                key={`table-${props.tableName}-search-${searchInput.key}`}
                                input={searchInput}
                                searchUpdatedHandler={(input, newValue) => {
                                    const newInputs = props.tableData.searchInputs.map(search => {
                                        if (search.key === input.key) {
                                            search.value = newValue;
                                        }

                                        return search;
                                    });

                                    props.setTableData(prev => {
                                        return {
                                            ...prev,
                                            searchInputs: newInputs
                                        };
                                    });
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>
        </Drawer>
    );
};

export default FilterDrawer;
