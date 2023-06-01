import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

type FilterBoxProps = {
  label: string;
  categories: string[];
  selectedCategory: string;
  setCategory: (value: React.SetStateAction<string>) => void;
};

export const ALL_CATEGORIES = 'all';

export default function FilterBox(props: FilterBoxProps) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setCategory(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="filter-box-label">{props.label}</InputLabel>
        <Select
          labelId="filter-box-label"
          id="filter-box"
          value={props.selectedCategory}
          label={props.label}
          onChange={handleChange}
        >
          <MenuItem key={ALL_CATEGORIES} value={ALL_CATEGORIES}>
            All
          </MenuItem>
          {props.categories.map(t => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
