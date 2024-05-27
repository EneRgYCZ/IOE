import { useEffect, useRef } from "react";

/**
 * Custom hook that executes a callback function after a specified delay.
 * @param callback - The callback function to be executed.
 * @param delay - The delay in milliseconds before executing the callback. If null or undefined, the callback will not be executed.
 */
export default (callback: () => void, delay: number | null) => {
    const savedCallback = useRef(callback); // Store the callback function in a ref

    useEffect(() => {
        savedCallback.current = callback; // Update the stored callback when it changes
    }, [callback]);

    useEffect(() => {
        if (!delay && delay !== 0) {
            return; // If delay is null or undefined, do nothing
        }

        const id = setTimeout(() => savedCallback.current(), delay); // Execute the callback after the specified delay

        return () => clearTimeout(id); // Clean up by clearing the timeout when the component unmounts or when the delay changes
    }, [delay]);
};
