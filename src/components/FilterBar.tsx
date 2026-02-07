import {
  Toolbar,
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputLabel,
} from '@mui/material';

interface FilterProps {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  sortFilter: string;
  setSortFilter: (category: string) => void;
  userLocation: { lat: number; lng: number } | null;
}

function FilterBar(props: FilterProps) {
  const CATEGORIES = [
    'All',
    'Restaurant',
    'Bakery',
    'Café',
    'Services',
    'Retail',
    'Professional Services',
    'Construction',
    'Landscape',
    'Healthcare',
    'Other',
  ];

  const SORTBY = ['None', 'Alphabetical', 'Closest'];

  return (
    <Toolbar disableGutters>
      <FormControl fullWidth>
        <InputLabel id="categorySelectLabel" sx={{ color: 'text.primary' }}>
          Industry
        </InputLabel>
        <Select
          id="categorySelect"
          value={props.categoryFilter}
          label="Industry"
          onChange={(event) => props.setCategoryFilter(event.target.value)}
        >
          {CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="sortSelectLabel" sx={{ color: 'text.primary' }}>
          Sort
        </InputLabel>
        <Select
          id="sortSelect"
          value={props.sortFilter}
          label="Sort"
          onChange={(event) => props.setSortFilter(event.target.value)}
        >
          {SORTBY.map((sorting) => (
            <MenuItem
              key={sorting}
              value={sorting}
              disabled={sorting === 'Closest' && !props.userLocation}
            >
              {sorting}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Toolbar>
  );
}

export default FilterBar;
