import { Container, Box, Typography, Pagination } from '@mui/material';
import BusinessCard from '../components/BusinessCard';
import { useState, useEffect } from 'react';
import type { Business } from '../types/Business';
import businessData from '../data/businesses-en.json'; //synchronous data bundled at build time --> would need to be an async function if a backend is added
import FilterBar from '../components/FilterBar';

function HomePage() {
  const allBusinessInfo = businessData as Business[]; //create an array of Businesses to store the contents of the JSON file

  //pagination
  const numEntriesPerPage = 9;
  const [page, setPage] = useState<number>(1);

  //filter bar values
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
  const [selectedCategory, setSelectedCategory] = useState('All');

  //calculate the businesses to render based on the filters
  const filteredBusinesses = allBusinessInfo.filter(handleFilter);

  function handleFilter(business: Business) {
    //return all businesses when the filter is 'All'
    if (selectedCategory === 'All') {
      return business;
    }
    //return businesses that do not satisfy any other filter if the filter is "Other"
    else if (selectedCategory === 'Other') {
      //remove All and Other
      let filtersToCheck = CATEGORIES.filter(
        (category) => category !== 'All' && category !== 'Other'
      );
      //check that all filters are not included
      return business.categories.every((category) => {
        return !filtersToCheck.includes(category);
      });
      //all other filters return businesses of that category
    } else if (business.categories.includes(selectedCategory)) {
      return business;
    }
  }

  console.log(filteredBusinesses);

  //calculate the businesses to render based on the pagination
  const startIndex = (page - 1) * numEntriesPerPage;
  const endIndex = startIndex + numEntriesPerPage;
  const currentPageBusinesses = filteredBusinesses.slice(startIndex, endIndex);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', py: 15 }}>
      <Typography variant="h3" component="h1">
        Ottawa Greek Business Directory
      </Typography>
      <FilterBar
        categoryFilter={selectedCategory}
        setCategoryFilter={setSelectedCategory}
      />

      {allBusinessInfo.length === 0 || filteredBusinesses.length === 0 ? (
        // we have no businesses
        <Container sx={{ display: 'flex', flexDirection: 'column', py: 15 }}>
          <Typography variant="h1" component="h1">
            No business info available.
          </Typography>
        </Container>
      ) : (
        // show businesses as usual
        <>
          <Typography variant="h4" component="h3">
            Showing {filteredBusinesses.length} businesses
          </Typography>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            {currentPageBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                id={business.id}
                name={business.name}
                categories={business.categories}
                description={business.description}
                image={business.image}
              ></BusinessCard>
            ))}
          </Box>
          <Pagination
            count={Math.ceil(allBusinessInfo.length / numEntriesPerPage)}
            page={page}
            onChange={(event, value) => {
              setPage(value);
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }}
          />
        </>
      )}
    </Container>
  );
}

export default HomePage;
