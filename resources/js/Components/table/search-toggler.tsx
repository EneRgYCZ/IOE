import { QueryBuilderSearchInput } from "@/types";

import React, { useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";

import { Box, FormControl, FormLabel, IconButton, ListItem, Menu, Switch, Typography } from "@mui/material";

const SearchToggler: React.FC<{
    searches: Array<QueryBuilderSearchInput>;
    searchToggledHandler: (search: QueryBuilderSearchInput, state: boolean) => void;
}> = ({ searches, searchToggledHandler }) => {
    const hasShownInputs = searches.reduce(
        (accumulator, currentValue) =>
            accumulator === true
                ? accumulator
                : currentValue.shown || (currentValue.value !== null && currentValue.value !== ""),
        false
    );

    const [open, setOpen] = useState(false);
    const togglerRef = useRef(null);

    const IndividualToggle: React.FC<{
        search: QueryBuilderSearchInput;
    }> = ({ search }) => {
        const [shown, setShown] = useState(search.shown);

        return (
            <FormControl >
                <Box>
                    <FormLabel>
                        <Typography sx={{ textTransform: "uppercase" }}>{search.label}</Typography>
                    </FormLabel>
                </Box>
                <Switch
                    checked={shown}
                    onChange={e => {
                        setShown(e.target.checked);
                        searchToggledHandler(search, e.target.checked);
                    }}
                    color={shown ? "primary" : "secondary"}
                />
            </FormControl>
        );
    };

    return (
        <>
            <IconButton
                ref={togglerRef}
                color={hasShownInputs ? "primary" : "secondary"}
                onClick={() => {
                    setOpen(!open);
                }}
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    padding: 1
                }}
            >
                <HiSearch />
            </IconButton>
            <Menu anchorEl={togglerRef.current} open={open} onClose={() => setOpen(false)}>
                {searches.map(search => {
                    return (
                        // eslint-disable-next-line react/prop-types
                        <ListItem key={search.key}>
                            <IndividualToggle search={search} />
                        </ListItem>
                    );
                })}
            </Menu>
        </>
    );
};

export default SearchToggler;
