import { router } from "@inertiajs/react";
import React from "react";
import { Box, Button, MenuItem, Select, Stack, Typography } from "@mui/material";

const Paginator: React.FC<{
    perPageOptions: Array<number>;
    perPageChangeHandler: (newValue: number | null) => void;
    perPage: number;
    from: number;
    to: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}> = ({ perPageOptions, perPageChangeHandler, perPage, from, to, total, links }) => {
    const activePageIdx = links.findIndex(link => link.active);
    const lastPageIndex = links.length - 1;

    // Determine the range of page numbers to display
    const startRange = Math.max(activePageIdx - 1, 1);
    const endRange = Math.min(activePageIdx + 1, lastPageIndex - 1);
    const visiblePages = links.slice(startRange, endRange + 1);

    // Determine if ellipsis should be shown
    const showEllipsisBefore = startRange > 1;
    const showEllipsisAfter = endRange < lastPageIndex - 1;

    // Construct the array of pages to display, including ellipses if needed
    const paginationLinks = [
        links[0],
        ...(showEllipsisBefore ? [{ label: "...", active: false, url: null }] : []),
        ...visiblePages,
        ...(showEllipsisAfter ? [{ label: "...", active: false, url: null }] : []),
        links[lastPageIndex]
    ];

    return (
        <Box sx={{ width: "100%", paddingY: 1 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <Select<number>
                        value={perPage}
                        onChange={e => {
                            perPageChangeHandler(Number(e.target.value) || null);
                        }}
                    >
                        {perPageOptions.map(option => (
                            <MenuItem key={option} value={option}>
                                {option} per page
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography>
                        {from}-{to} of {total} results
                    </Typography>
                </Box>

                <Stack direction="row" gap={1}>
                    {paginationLinks.map(link => {
                        if (link.label === "...") {
                            // The key for ellipses needs to be unique, so we use a combination of label and index
                            return <Typography key={`ellipsis-${link.label}`}>...</Typography>;
                        }
                        return (
                            <Button
                                key={link.label}
                                color={link.active ? "primary" : "secondary"}
                                variant={link.active ? "contained" : "outlined"}
                                disabled={link.url === null}
                                onClick={() => {
                                    if (link.url) {
                                        router.get(link.url, undefined, {
                                            preserveScroll: true,
                                            preserveState: true
                                        });
                                    }
                                }}
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Button>
                        );
                    })}
                </Stack>
            </Box>
        </Box>
    );
};

export default Paginator;
