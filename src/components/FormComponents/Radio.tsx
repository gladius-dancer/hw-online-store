import React from "react";
import {FormControl, FormControlLabel, FormLabel} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Controller } from "react-hook-form";

export const InputRadio = ({name, control, value, label}) => {
    const generateRadioOptions = () => {
        // return options.map((singleOption) => (
            return (<FormControlLabel
                value={value}
                label={label}
                control={<Radio />}
            />)
        // ));
    };

    return (
        <FormControl component="fieldset">
            <Controller
                name={name}
                control={control}
                defaultValue="No"
                render={({
                             field: { onChange, value },
                             fieldState: { error },
                             formState,
                         }) => (
                    <RadioGroup value={value} onChange={onChange}>
                        {generateRadioOptions()}
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
};
