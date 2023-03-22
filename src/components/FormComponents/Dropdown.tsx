import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";




export const Dropdown = ({name, control, label, options}) => {
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
        <FormControl sx={{ m: 0, minWidth: 120 }} >
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
