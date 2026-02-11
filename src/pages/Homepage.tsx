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

  //user's position
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Location error:', error);
          console.log('Could not get your location.');
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

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

  //sorting values
  const SORTBY = ['None', 'Alphabetical', 'Closest'];

  const [searchValue, setSearchValue] = useState(''); //search bar
  const [selectedCategory, setSelectedCategory] = useState('All'); //industry dropdown
  const [selectedSort, setSelectedSort] = useState('None'); //sort dropdown

  //calculate the businesses to render based on the filters
  const searchBusiness = handleSearch(); //search first
  const filteredBusinesses = searchBusiness.filter(handleFilter); //then filter
  const sortedBusinesses = handleSort(); //then sort

  function handleSearch() {
    let searchTerm = searchValue.toLowerCase().trim();

    let searchFilteredBusinesses = allBusinessInfo.filter(
      (business) =>
        business.name.toLowerCase().includes(searchTerm) ||
        business.description.toLowerCase().includes(searchTerm) ||
        business.address.toLowerCase().includes(searchTerm)
    );

    return searchFilteredBusinesses;
  }

  function handleFilter(business: Business) {
    //CATEGORIESFILTER
    //return all businesses when the filter is 'All'
    if (selectedCategory === 'All') {
      return true;
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
      return true;
    }
  }

  //----------------calculating distance functions reference: https://dev.to/ayushman/measure-distance-between-two-locations-in-javascript-using-the-haversine-formula-7dc----//
  function degToRad(deg: number) {
    var rad = (deg * Math.PI) / 180;
    return rad;
  }

  // Calculate distance between two coordinates
  function calculateDistance(
    startCoords: { lat: number; lng: number },
    destCoords: { lat: number; lng: number }
  ) {
    const startingLat = degToRad(startCoords.lat);
    const startingLong = degToRad(startCoords.lng);
    const destinationLat = degToRad(destCoords.lat);
    const destinationLong = degToRad(destCoords.lng);

    // Radius of the Earth (in kilometers)
    const radius = 6371;

    // Haversine formula
    const distance =
      Math.acos(
        Math.sin(startingLat) * Math.sin(destinationLat) +
          Math.cos(startingLat) *
            Math.cos(destinationLat) *
            Math.cos(startingLong - destinationLong)
      ) * radius;

    return distance;
  }
  //--------------------------end of reference-------------------------

  //sorting filters
  function handleSort() {
    if (selectedSort === 'Alphabetical') {
      return [...filteredBusinesses].sort((a, b) =>
        a.name.localeCompare(b.name)
      ); //ascending order A to Z
    } else if (selectedSort === 'Closest') {
      if (!userLocation) {
        //no location available
        return filteredBusinesses;
      }
      //calculate distances between business coords
      return [...filteredBusinesses].sort((a, b) => {
        const distanceA = calculateDistance(userLocation, a.coordinates);
        const distanceB = calculateDistance(userLocation, b.coordinates);

        return distanceA - distanceB;
      });
    } else {
      return filteredBusinesses; //default sort order
    }
  }

  function clearFilters() {
    setSearchValue('');
    setSelectedCategory('All');
    setSelectedSort('None');
  }

  //calculate the businesses to render based on the pagination
  const startIndex = (page - 1) * numEntriesPerPage;
  const endIndex = startIndex + numEntriesPerPage;
  const currentPageBusinesses = sortedBusinesses.slice(startIndex, endIndex);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pb: 5,
        pt: { xs: 22, md: 10 },
      }}
    >
      <Typography variant="h3" component="h1" sx={{ py: 3 }}>
        Ottawa Greek Business Directory
      </Typography>
      <FilterBar
        categoryFilter={selectedCategory}
        setCategoryFilter={setSelectedCategory}
        sortFilter={selectedSort}
        setSortFilter={setSelectedSort}
        userLocation={userLocation}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        clearFilters={clearFilters}
      />

      {allBusinessInfo.length === 0 || filteredBusinesses.length === 0 ? (
        // we have no businesses
        <Container sx={{ display: 'flex', flexDirection: 'column', py: 15 }}>
          <Typography variant="h3" component="h1">
            No business info available.
          </Typography>
        </Container>
      ) : (
        // show businesses as usual
        <>
          <Typography variant="h4" component="h3" sx={{ py: 2 }}>
            {filteredBusinesses.length} results for "{selectedCategory}"
          </Typography>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 2,
              justifyItems: 'center',
            }}
          >
            {currentPageBusinesses.map((business: Business) => (
              <BusinessCard
                key={business.id}
                id={business.id}
                name={business.name}
                categories={business.categories}
                description={business.description}
                address={business.address}
                image={business.image}
              ></BusinessCard>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Pagination
              size="large"
              variant="outlined"
              color="primary"
              count={Math.ceil(sortedBusinesses.length / numEntriesPerPage)}
              page={page}
              onChange={(event, value) => {
                setPage(value);
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default HomePage;
