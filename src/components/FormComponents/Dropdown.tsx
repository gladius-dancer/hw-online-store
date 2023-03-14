import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";


const options = [
    {
        label: "Delivery",
        value: "1",
    },
    {
        label: "Local pickup",
        value: "2",
    },
];

export const Dropdown = ({name, control, label}) => {
    const generateSingleOptions = () => {
        return options.map((option) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            );
        });
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel>{label}</InputLabel>
            <Controller
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <Select onChange={onChange} value={value}>
                        {generateSingleOptions()}
                    </Select>
                )}
                control={control}
                name={name}
            />
        </FormControl>
    );
};
