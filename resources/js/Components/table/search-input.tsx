import { useDebounce } from "@/hooks/useDebounce"; // Import the useDebounce hook.
import { QueryBuilderSearchInput } from "@/types"; // Import the type definition for the input.
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material"; // Import MUI components.

import React, { useState } from "react"; // Import React and useState hook.
import { HiXMark } from "react-icons/hi2"; // Import the icon for the clear button.

// Define the SearchInput component accepting props structured as per QueryBuilderSearchInput and a handler function.
const SearchInput: React.FC<{
    input: QueryBuilderSearchInput; // Props for defining the input structure and initial value.
    searchUpdatedHandler: (input: QueryBuilderSearchInput, newValue: string) => void; // Handler for updating the search.
}> = ({ input, searchUpdatedHandler }) => {
    const [value, setValue] = useState(input.value ?? ""); // State for managing the text field's value.

    // Function to call the update handler passing the current state value.
    const updateSearchInputValue = () => {
        searchUpdatedHandler(input, value);
    };

    // Debounce the update handler to avoid frequent updates during typing.
    const debouncedUpdateSearchInputValue = useDebounce(updateSearchInputValue, 500);

    return (
        <TextField
            variant="outlined"
            value={value} // Set the current state value to the TextField.
            onChange={e => {
                // Update the state and call the debounced handler when the input changes.
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
                                    // Clear the input value and call the debounced handler when the button is clicked.
                                    setValue("");
                                    debouncedUpdateSearchInputValue();
                                }}
                                size="small"
                            >
                                <HiXMark /> {/* Icon for the clear button */}
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                ),
                style: {
                    height: "45px" // Set the height of the input field.
                }
            }}
            sx={{
                "& .MuiInputBase-input": {
                    height: "20px", // Set the height of the input text.
                    padding: "12px 14px" // Set the padding of the input text.
                },
                "& .MuiInputAdornment-root": {
                    margin: "0px" // Set the margin of the adornments.
                }
            }}
            fullWidth // Make the TextField take the full width of its container.
        />
    );
};

export default SearchInput; // Export the SearchInput component.
