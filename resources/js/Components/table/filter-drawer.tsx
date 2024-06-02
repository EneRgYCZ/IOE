import * as React from "react";
import Drawer from "@mui/material/Drawer";
import ColumnToggler from "@/Components/table/column-toggler";
import { Box, Typography } from "@mui/material";
import SearchInput from "@/Components/table/search-input";
import { QueryBuilderProps } from "@/types";

// Define the FilterDrawer component, which takes in several props
const FilterDrawer = (props: {
    isOpen: boolean; // Whether the drawer is open
    handleClose: () => void; // Function to close the drawer
    tableData: QueryBuilderProps; // Data for the table
    setTableData: React.Dispatch<React.SetStateAction<QueryBuilderProps>>; // Function to update table data
    tableName: string; // Name of the table
}) => {
    return (
        <Drawer open={props.isOpen} onClose={props.handleClose}>
            <Box sx={{ padding: "20px" }}>
                <Typography variant={"h5"}>Filters</Typography>
                <Typography variant={"h6"} sx={{ margin: "30px 0 10px 0" }}>
                    Fields shown
                </Typography>
                <ColumnToggler
                    columns={props.tableData.columns} // Pass columns data to ColumnToggler
                    columnToggledHandler={(column, state) => {
                        // Handler for toggling column visibility
                        const newCols = props.tableData.columns.map(value => {
                            if (value.key === column.key) {
                                value.hidden = state; // Update hidden state of the column
                            }

                            return value; // Return the updated column
                        });

                        props.setTableData(prev => {
                            // Update the table data with the new columns
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
                        // Map through search inputs
                        if (
                            !searchInput.shown || // Check if the search input is shown
                            props.tableData.columns.find(col => col.key == searchInput.key)?.hidden // Check if the corresponding column is hidden
                        ) {
                            return null; // If either condition is true, do not render the search input
                        }
                        return (
                            <SearchInput
                                key={`table-${props.tableName}-search-${searchInput.key}`} // Unique key for each search input
                                input={searchInput} // Pass the search input data
                                searchUpdatedHandler={(input, newValue) => {
                                    // Handler for updating search input value
                                    const newInputs = props.tableData.searchInputs.map(search => {
                                        if (search.key === input.key) {
                                            search.value = newValue; // Update the value of the search input
                                        }

                                        return search; // Return the updated search input
                                    });

                                    props.setTableData(prev => {
                                        // Update the table data with the new search inputs
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
