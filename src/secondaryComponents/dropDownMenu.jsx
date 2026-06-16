import {useState} from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {selectInput} from "../allSlices/CountriesDataSlice";
import { useSelector, useDispatch } from "react-redux";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

const names = [
  "Africa",
  "America",
  "Asia",
  "Europe",
  "Oceania",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function DropDownMenu() {
  const theme = useTheme();
  
  let selectInputVal=useSelector(state=>{
     return state.countriesReducer.selectDropDownInput;
   })

   let dispatch=useDispatch();


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(selectInput(value));
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, width: 300 }}
        className="bg-main dark:bg-mainDark dark:text-main!"
      >
        <InputLabel id="demo-multiple-name-label" className="dark:text-main!">
          {" "}
          Filter By Region
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          className="dark:text-main!"
          value={selectInputVal}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{
            "& .MuiSelect-icon": {
              color: "#0000000",
            },

            ".dark & .MuiSelect-icon": {
              color: "#ffffff",
            },
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectInputVal, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}