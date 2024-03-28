import { PageProps, PaginatedResponse, QueryBuilderColumn } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { get, pickBy } from "lodash";
import qs from "qs";

import React, { useEffect, useState } from "react";

import ColumnHeader from "./column-header";
import ColumnToggler from "./column-toggler";
import Paginator from "./paginator";
import SearchInput from "./search-input";
import SearchToggler from "./search-toggler";
import { Box, Card, Stack, TableCell, Typography, Table as MultiTable } from "@mui/material";

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
            <TableCell key={cellKey} sx={{ pl: 2 }}>
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

    const [tableData, setTableData] = useState(originalData);

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
            filter(prefix, value) {
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
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                            width: "100%"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <Box sx={{ pt: 1 }}>
                                <SearchToggler
                                    searches={tableData.searchInputs}
                                    searchToggledHandler={(search, state) => {
                                        const newSearchInputs = tableData.searchInputs.map(value => {
                                            if (value.key === search.key) {
                                                value.shown = state;
                                            }

                                            return value;
                                        });

                                        setTableData(prev => {
                                            return {
                                                ...prev,
                                                searchInputs: newSearchInputs
                                            };
                                        });
                                    }}
                                />
                            </Box>
                            <Box sx={{ pt: 1 }}>
                                <ColumnToggler
                                    columns={tableData.columns}
                                    columnToggledHandler={(column, state) => {
                                        const newCols = tableData.columns.map(value => {
                                            if (value.key === column.key) {
                                                value.hidden = state;
                                            }

                                            return value;
                                        });

                                        setTableData(prev => {
                                            return {
                                                ...prev,
                                                columns: newCols
                                            };
                                        });
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pb: 1 }}>
                        {tableData.searchInputs.map(searchInput => {
                            if (!searchInput.shown) {
                                return null;
                            }

                            return (
                                <SearchInput
                                    key={`table-${name}-search-${searchInput.key}`}
                                    input={searchInput}
                                    searchUpdatedHandler={(input, newValue) => {
                                        const newInputs = tableData.searchInputs.map(search => {
                                            if (search.key === input.key) {
                                                search.value = newValue;
                                            }

                                            return search;
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
                    </Box>
                </Box>
                <Card variant="outlined">
                    <MultiTable>
                        <thead style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                            <tr>
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

                                                if (
                                                    !searchArray.find(c =>
                                                        c.startsWith("-") ? c.substring(1) === col.key : c === col.key
                                                    )
                                                ) {
                                                    searchArray.push(col.key);
                                                }

                                                setTableData(prev => {
                                                    return {
                                                        ...prev,
                                                        sort: searchArray
                                                            .map(sort => {
                                                                if (
                                                                    sort.startsWith("-") &&
                                                                    sort.substring(1) === col.key
                                                                ) {
                                                                    return col.key;
                                                                }

                                                                if (sort === col.key) {
                                                                    return `-${col.key}`;
                                                                }

                                                                return sort;
                                                            })
                                                            .join(","),
                                                        page: 1
                                                    };
                                                });
                                            }}
                                            sortRemoveHandler={() => {
                                                setTableData(prev => {
                                                    return {
                                                        ...prev,
                                                        sort:
                                                            tableData.sort
                                                                ?.split(",")
                                                                .filter(item =>
                                                                    item.startsWith("-")
                                                                        ? item.substring(1) !== col.key
                                                                        : item !== col.key
                                                                )
                                                                .join(",") ?? null
                                                    };
                                                });
                                            }}
                                        />
                                    );
                                })}

                                {actionRenderer && (
                                    <th style={{ textAlign: "center" }}>
                                        <Typography>Actions</Typography>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((row, idx) => {
                                return (
                                    <tr key={idx}>
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
                                    </tr>
                                );
                            })}
                        </tbody>
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
        </Stack>
    );
};