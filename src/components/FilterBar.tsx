import {
  Toolbar,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface FilterProps {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
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

  return (
    <Container>
      <Toolbar>filters</Toolbar>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            id="categorySelect"
            value={props.categoryFilter}
            onChange={(event) => props.setCategoryFilter(event.target.value)}
          >
            {CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

export default FilterBar;
