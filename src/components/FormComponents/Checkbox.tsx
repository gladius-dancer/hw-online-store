import React, {useEffect, useState} from "react";
import {FormControl, FormControlLabel, FormLabel} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import {Controller} from "react-hook-form";

const options =
    {
        label: "",
        value: "1",
    };

export const InputCheckbox = ({name, control, setValue, label}) => {
    const [selectedItems, setSelectedItems] = useState ([]);

    const handleSelect = (value) => {
        const isPresent = selectedItems.indexOf(value);
        if (isPresent !== -1) {
            const remaining = selectedItems.filter((item) => item !== value);
            setSelectedItems(remaining);
        } else {
            setSelectedItems((prevItems) => [...prevItems, value]);
        }
    };

    useEffect(() => {
        setValue(name, selectedItems);
    }, [selectedItems]);

    return (
        <FormControl size={"small"} variant={"outlined"}>
            <FormLabel component="legend">{label}</FormLabel>

            <div>
                <FormControlLabel
                    control={
                        <Controller
                            name={name}
                            defaultValue={''}
                            render={({}) => {
                                return (
                                    <Checkbox
                                        checked={selectedItems.includes(options.value)}
                                        onChange={() => handleSelect(options.value)}
                                    />
                                );
                            }}
                            control={control}
                        />
                    }
                    label={options.label}
                    key={options.value}
                />
            </div>
        </FormControl>
    );
};
