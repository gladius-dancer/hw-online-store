import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
import {FormInputProps} from "./FormInputProps";

export const InputText = ({ name, control, label, status }: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={''}
            render={({
                         field: { onChange, value },
                         fieldState: { error },
                     }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    variant="outlined"
                    disabled={status ? false : true}
                />
            )}
        />
    );
};
