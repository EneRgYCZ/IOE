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
}> = ({ perPage, perPageChangeHandler, perPageOptions, from, to, total, links }) => {
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
                    <Select<typeof perPage>
                        defaultValue={perPage}
                        onChange={(e, newValue) => {
                            e?.preventDefault();
                            perPageChangeHandler(newValue as number | null);
                        }}
                    >
                        {perPageOptions.map(option => (
                            <MenuItem key={option} value={option}>
                                {option} per page
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography sx={{ display: "flex", gap: 1 }}>
                        <Typography>{from}</Typography> to <Typography>{to}</Typography> of{" "}
                        <Typography>{total}</Typography> results
                    </Typography>
                </Box>

                <Stack direction="row" gap={1}>
                    {links.map((link, idx) => {
                        return (
                            <Button
                                key={idx}
                                color={link.active ? "primary" : "secondary"}
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
