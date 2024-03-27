import { useDebounce } from "@/hooks/useDebounce";
import { QueryBuilderSearchInput } from "@/types";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";

import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2";

const SearchInput: React.FC<{
    input: QueryBuilderSearchInput;
    searchUpdatedHandler: (input: QueryBuilderSearchInput, newValue: string) => void;
}> = ({ input, searchUpdatedHandler }) => {
    const [value, setValue] = useState(input.value ?? "");

    const updateSearchInputValue = () => {
        searchUpdatedHandler(input, value);
    };

    const debouncedUpdateSearchInputValue = useDebounce(updateSearchInputValue, 500);

    return (
        <TextField
            variant="outlined"
            value={value}
            onChange={e => {
                setValue(e.target.value);
                debouncedUpdateSearchInputValue();
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" sx={{ pr: 2 }}>
                        {input.label}
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <Tooltip title="Clear selection">
                            <IconButton
                                onClick={() => {
                                    setValue("");
                                    debouncedUpdateSearchInputValue();
                                }}
                                size="small"
                            >
                                <HiXMark />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                ),
                style: {
                    height: "45px"
                }
            }}
            sx={{
                "& .MuiInputBase-input": {
                    height: "20px",
                    padding: "12px 14px"
                },
                "& .MuiInputAdornment-root": {
                    margin: "0px"
                }
            }}
            fullWidth
        />
    );
};

export default SearchInput;
