import { PageProps, PaginatedResponse, QueryBuilderColumn } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { get, pickBy } from "lodash";
import qs from "qs";

import React, { useEffect, useState } from "react";

import ColumnHeader from "./column-header";
import Paginator from "./paginator";
import {
    Box,
    Card,
    Stack,
    TableCell,
    Typography,
    Table as MultiTable,
    TableRow,
    Button,
    TableHead,
    TableBody
} from "@mui/material";
import FilterDrawer from "@/Components/table/filter-drawer";
import SearchInput from "./search-input";

export type CellRenderer<T> = (
    data: T,
    column: QueryBuilderColumn,
    cellKey: string,
    rowIdx: number
) => React.ReactElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultCellRenderer: CellRenderer<any> = (row, col, cellKey) => {
    const val = get(row, col.key);
    if (typeof val === "number" || typeof val === "string") {
        return (
            <TableCell key={cellKey} sx={{ pl: 2, maxHeight: "50px", overflow: "hidden", textOverflow: "ellipsis" }}>
                {val}
            </TableCell>
        );
    }

    return <TableCell key={cellKey} sx={{ pl: 2 }}></TableCell>;
};

export const Table = <T,>({
    name = "default",
    data,
    actionRenderer,
    cellRenderer = defaultCellRenderer
}: {
    name?: string;
    data: PaginatedResponse<T>;
    cellRenderer?: CellRenderer<T>;
    actionRenderer?: (data: T) => React.ReactElement;
}) => {
    const { queryBuilder } = usePage<PageProps>().props;
    const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

    if (!(name in queryBuilder)) {
        return (
            <Typography color="danger">
                There was an error generating your table. Table <kbd>{name}</kbd> not found.
            </Typography>
        );
    }

    const originalData = queryBuilder[name];

    originalData.searchInputs = originalData.searchInputs.map(search => {
        if (search.value) {
            search.shown = true;
        }

        return search;
    });

    // Get saved filters
    originalData.columns.forEach(column => {
        if (localStorage.getItem(`filters_${data.path}_${column.key}`) != null) {
            // If the column can not be hidden anymore, remove saved filter
            if (!column.can_be_hidden) {
                localStorage.removeItem(`filters_${data.path}_${column.key}`);
            } else {
                column.hidden = localStorage.getItem(`filters_${data.path}_${column.key}`) == "true";
            }
        }
    });

    // Get saved sort preferences
    if (localStorage.getItem(`sorting_${data.path}`) != null) {
        originalData.sort = localStorage.getItem(`sorting_${data.path}`);
    }

    const [tableData, setTableData] = useState(originalData);

    // Update saved filters
    React.useEffect(() => {
        tableData.columns.forEach(column => {
            localStorage.setItem(`filters_${data.path}_${column.key}`, column.hidden.toString());
        });
    }, [tableData.columns]);

    // Update saved sort preferences
    React.useEffect(() => {
        if (tableData.sort != null) {
            localStorage.setItem(`sorting_${data.path}`, tableData.sort);
        } else {
            localStorage.removeItem(`sorting_${data.path}`);
        }
    }, [tableData.sort]);

    const dataForNewString = () => {
        const getColumnsForQuery = () => {
            const columns = tableData.columns;

            const visibleColumns = columns.filter(column => {
                return !column.hidden;
            });

            return visibleColumns
                .map(column => {
                    return column.key;
                })
                .sort();
        };

        const getFiltersForQuery = () => {
            const filtersWithValue: Record<string, string> = {};

            tableData.searchInputs.forEach(searchInput => {
                if (searchInput.value !== null && searchInput.value !== "") {
                    filtersWithValue[searchInput.key] = searchInput.value;
                }
            });

            return filtersWithValue;
        };

        const queryData: Record<string, unknown> = {};

        const colsForQuery = getColumnsForQuery();
        if (Object.keys(colsForQuery).length > 0) {
            queryData.columns = colsForQuery;
        }

        const filtersForQuery = getFiltersForQuery();
        if (Object.keys(filtersForQuery).length > 0) {
            queryData.filter = filtersForQuery;
        }

        const page = tableData.page;
        if (page > 1) {
            queryData.page = page;
        }

        const sort = tableData.sort;
        if (sort) {
            queryData.sort = sort;
        }

        const perPage = tableData.perPage;
        if (perPage) {
            queryData.perPage = perPage;
        }

        return queryData;
    };

    const newQs = () => {
        const existingData = qs.parse(location.search.substring(1));
        // prefix with table name
        const prefix = name === "default" ? "" : name + "_";

        // reset existing data
        ["columns", "filter", "sort"].forEach(key => {
            delete existingData[prefix + key];
        });
        delete existingData[tableData.pageName];

        // add new data
        const newData = dataForNewString();
        Object.entries(newData).forEach(([key, value]) => {
            if (key === "page") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                existingData[tableData.pageName] = value;
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                existingData[prefix + key] = value;
            }
        });

        function alphabeticalSort(a: string, b: string) {
            return a.localeCompare(b);
        }

        return qs.stringify(existingData, {
            filter(_prefix, value) {
                if (typeof value === "object" && value !== null) {
                    return pickBy(value);
                }

                return value;
            },
            sort: alphabeticalSort,
            skipNulls: true,
            strictNullHandling: true
        });
    };

    useEffect(() => {
        const newUrl = location.pathname + "?" + newQs();
        if (location.pathname + location.search == newUrl) {
            return;
        }
        router.visit(newUrl, { preserveScroll: true, preserveState: true });
    }, [tableData]);

    return (
        <Stack gap={1}>
            <Card sx={{ width: "100%", paddingX: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    {tableData.searchInputs.map(search => {
                        if (search.label !== "Global Search") {
                            return null;
                        }

                        return (
                            <SearchInput
                                key={`table-${name}-search-global_search`}
                                input={search}
                                searchUpdatedHandler={(input, newValue) => {
                                    const newInputs = tableData.searchInputs.map(s => {
                                        if (s.key === input.key) {
                                            s.value = newValue;
                                        }

                                        return s;
                                    });

                                    setTableData(prev => {
                                        return {
                                            ...prev,
                                            searchInputs: newInputs
                                        };
                                    });
                                }}
                            />
                        );
                    })}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            width: "100%"
                        }}
                    >
                        <Button onClick={() => setFilterDrawerOpen(true)}>Advanced Search</Button>
                    </Box>
                </Box>
                <Card variant="outlined" sx={{ width: "100%", overflowX: "auto" }}>
                    <MultiTable>
                        <TableHead style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                            <TableRow>
                                {originalData.columns.map(col => {
                                    if (col.hidden) {
                                        return null;
                                    }

                                    return (
                                        <ColumnHeader
                                            key={col.key}
                                            col={col}
                                            sortChangeHandler={() => {
                                                const searchArray = tableData.sort?.split(",") ?? [];
                                                let newSortArray;

                                                if (
                                                    !searchArray.includes(col.key) &&
                                                    !searchArray.includes(`-${col.key}`)
                                                ) {
                                                    // Sort ascending if not sorted
                                                    newSortArray = [...searchArray, col.key];
                                                } else if (searchArray.includes(col.key)) {
                                                    // Sort descending if currently sorted ascending
                                                    newSortArray = searchArray.map(sort =>
                                                        sort === col.key ? `-${col.key}` : sort
                                                    );
                                                } else {
                                                    // Remove sorting if currently sorted descending
                                                    newSortArray = searchArray.filter(sort => sort !== `-${col.key}`);
                                                }

                                                setTableData(prev => ({
                                                    ...prev,
                                                    sort: newSortArray.join(","),
                                                    page: 1
                                                }));
                                            }}
                                        />
                                    );
                                })}

                                {actionRenderer && (
                                    <th
                                        style={{
                                            textAlign: "center",
                                            position: "sticky",
                                            right: 0,
                                            backgroundColor: "#fff"
                                        }}
                                    >
                                        <Typography>Actions</Typography>
                                    </th>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((row, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        {tableData.columns.map(col => {
                                            if (col.hidden) {
                                                return null;
                                            }

                                            return cellRenderer(
                                                row,
                                                col,
                                                `table-${name}-row-${idx}-col-${col.key}`,
                                                idx
                                            );
                                        })}

                                        {actionRenderer && actionRenderer(row)}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </MultiTable>
                </Card>
                <Paginator
                    perPage={tableData.perPage}
                    perPageChangeHandler={newValue => {
                        if (!newValue) {
                            return;
                        }

                        setTableData(prev => {
                            return {
                                ...prev,
                                perPage: +newValue
                            };
                        });
                    }}
                    perPageOptions={tableData.perPageOptions}
                    from={data.from}
                    to={data.to}
                    total={data.total}
                    links={data.links}
                />
            </Card>
            <FilterDrawer
                isOpen={isFilterDrawerOpen}
                handleClose={() => setFilterDrawerOpen(false)}
                tableData={tableData}
                setTableData={setTableData}
                tableName={name}
            />
        </Stack>
    );
};
