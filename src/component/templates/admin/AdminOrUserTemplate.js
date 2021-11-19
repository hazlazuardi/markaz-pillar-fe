import React, { useCallback, useEffect, useState } from "react";
import debounce from 'lodash.debounce'
import PropTypes from "prop-types";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  AppBar,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  useMediaQuery,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SwipeableViews from "react-swipeable-views";
import { SwipeableEnableScroll } from "../../../component/SwipeableEnableScroll";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import FilterMarkaz from "../../../component/modules/FilterMarkaz";
import FilterMarkazMobile from "../../../component/modules/FilterMarkazMobile";
import FilterSantri from "../../../component/modules/FilterSantri";
import FilterSantriMobile from "../../../component/modules/FilterSantriMobile";
// import FilterListIcon from '@mui/icons-material/FilterList';
// import Chip from "@mui/material/Chip";

function AdminOrUserTemplate(props) {
  const {
    variant,
    GridView,
    TableView,
    searchTerm,
    setSearchTerm,
    entries,
    setEntries,
    page,
    setPage,
    data,
    error,
    hrefCreate,
    ageFilter,
    setAgeFilter,
    nameFilter,
    setNameFilter,
    locationFilter,
    setLocationFilter,
    categoryFilter,
    setCategoryFilter,
    categoryFilter2,
    setCategoryFilter2,
    categoryFilter3,
    setCategoryFilter3,
    mutate,
    disableSearch
  } = props;

  const isAdmin = GridView && TableView;

  const [doAnimateHeight, setDoAnimateHeight] = useState(false);

  // *******************************************************
  // Show Entries
  // *******************************************************
  const handleChangeEntries = useCallback(
    (event) => {
      setEntries(event.target.value);
      setPage(1);
      // disable it until API Calls done
      setDoAnimateHeight(false);
    },
    [setEntries, setPage]
  );

  // *******************************************************
  // Pagination
  // *******************************************************
  const matchXs = useMediaQuery("(max-width:600px)");
  const handlePagination = useCallback((event, value) => {
    setPage(value);
    // disable it until API Calls done
    setDoAnimateHeight(false);
  }, [setPage]);

  // *******************************************************
  // Tabs
  // *******************************************************
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabIndex = (event, tab) => {
    setTabIndex(tab);
    setDoAnimateHeight(false);
  };
  const handleChangeTabIndex = (tab) => {
    setTabIndex(tab);
    setDoAnimateHeight(false);
  };

  // *******************************************************
  // Search
  // *******************************************************
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilter = useCallback(debounce(query => {
    if (!query) return setSearchTerm("")
    setPage(1)
    setSearchTerm(query)
  }
    , 500), [])

  const handleSearch = useCallback(event => {
    const query = event.target.value
    debouncedFilter(query)
  }, [debouncedFilter])

  useEffect(() => {
    setDoAnimateHeight(false);
    return () => {
      setDoAnimateHeight(true);
    };
  }, [entries, page, tabIndex, searchTerm]);

  const matches = useMediaQuery("(max-width:600px)");
  const size = matches ? "small" : "medium";
  const axis = theme.direction === "rtl" ? "x-reverse" : "x";


  // *******************************************************
  // Filter Component
  // *******************************************************
  // const [openFilter, setOpenFilter] = useState(false)
  const Filter = useCallback(() => {
    if (variant == "markaz" && size == "small") {
      return (
        <FilterMarkazMobile
          data-testid="filterChipButton-at-admin-or-user-template"
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categoryFilter2={categoryFilter2}
          setCategoryFilter2={setCategoryFilter2}
          categoryFilter3={categoryFilter3}
          setCategoryFilter3={setCategoryFilter3}
          mutate={mutate}
        />
      );
    } else if (variant == "markaz" && size == "medium") {
      return (
        <FilterMarkaz
          data-testid="filterChipButton-at-admin-or-user-template"
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categoryFilter2={categoryFilter2}
          setCategoryFilter2={setCategoryFilter2}
          categoryFilter3={categoryFilter3}
          setCategoryFilter3={setCategoryFilter3}
          mutate={mutate}
        />
      );
    } else if (variant == "santri" && size == "small") {
      return (
        <FilterSantriMobile
          data-testid="filterChipButton-at-admin-or-user-template"
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          mutate={mutate}
        />
      );
    } else {
      return (
        <FilterSantri
          data-testid="filterChipButton-at-admin-or-user-template"
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          mutate={mutate}
        />
      );
    }
  }, [ageFilter, categoryFilter, categoryFilter2, categoryFilter3, locationFilter, mutate, nameFilter, setAgeFilter, setCategoryFilter, setCategoryFilter2, setCategoryFilter3, setLocationFilter, setNameFilter, size, variant])

  // *******************************************************
  // Header Component
  // *******************************************************
  const Header = useCallback(() => {
    return (
      <>
        {/* Header */}
        <Typography
          data-testid="titlePage-at-admin-or-user-template"
          variant="h4"
          component='h2'
          sx={{ textTransform: "capitalize" }}
          color="initial"
        >
          Daftar {variant}
        </Typography>
        {!disableSearch && (
          <>
            <TextField
              data-testid="searchbar-at-admin-or-user-template"
              label={"Cari " + variant}
              placeholder={"Cari " + variant}
              onChange={handleSearch}
              margin="normal"
              fullWidth
              size="small"
            />
            {/* <Chip icon={<FilterListIcon />} label="Filter" color='primary' onClick={() => setOpenFilter(true)} /> */}
            <Filter />
          </>
        )}
      </>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSearch, variant, ageFilter, categoryFilter, categoryFilter2, categoryFilter3, locationFilter, mutate, nameFilter, setAgeFilter, setCategoryFilter, setCategoryFilter2, setCategoryFilter3, setLocationFilter, setNameFilter, size])

  // *******************************************************
  // Body Component
  // *******************************************************
  const Body = useCallback(() => {
    return (
      <>
        {data.totalElement !== 0 && isAdmin ? (
          <TabContext value={tabIndex}>
            <AppBar position="relative" color="transparent" elevation={0}>
              <TabList onChange={handleTabIndex}>
                <Tab
                  data-testid="tab-grid-at-admin-or-user-template"
                  label="Grid"
                  value={0}
                />
                <Tab
                  data-testid="tab-table-at-admin-or-user-template"
                  label="Table"
                  value={1}
                />
              </TabList>
            </AppBar>
            <SwipeableViews
              axis={axis}
              index={tabIndex}
              onChangeIndex={handleChangeTabIndex}
              animateHeight={doAnimateHeight}
              ignoreNativeScroll
            >
              <TabPanel
                data-testid="gridView-at-admin-or-user-template"
                value={tabIndex}
                index={0}
                dir={theme.direction}
              >
                {GridView}
              </TabPanel>
              <TabPanel
                data-testid="tableView-at-admin-or-user-template"
                value={tabIndex}
                index={1}
                dir={theme.direction}
              >
                <SwipeableEnableScroll>{TableView}</SwipeableEnableScroll>
              </TabPanel>
            </SwipeableViews>
          </TabContext>
        ) : (
          <Box mt="2em" data-testid={GridView ? "gridView-at-admin-or-user-template" : "tableView-at-admin-or-user-template"} >
            {!!data && data.totalElement !== 0 ? (
              GridView || TableView
            ) : (
              <Box mb="2em">
                <Typography>No data found</Typography>
              </Box>
            )}
          </Box>
        )}
        {/* Pagination */}
        {!!data && data.totalElement !== 0 && (
          <Stack sx={{ bottom: "0em" }} spacing={2} alignItems="center">
            <FormControl fullWidth sx={{ m: "1em", maxWidth: 375 }}>
              <InputLabel id="entries-select-label">Show Entries</InputLabel>
              <Select
                data-testid="showEntries-at-admin-or-user-template"
                labelId="entries-select-label"
                id="entries-select"
                value={entries}
                label="Show Entries"
                onChange={handleChangeEntries}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={100000}>Show All</MenuItem>
              </Select>
            </FormControl>
            <Pagination
              data-testid="pagination-at-admin-or-user-template"
              size={matchXs ? "small" : "medium"}
              boundaryCount={1}
              count={data.totalPage}
              page={page}
              onChange={handlePagination}
            />
          </Stack>
        )}
      </>
    )
  }, [GridView, TableView, axis, data, doAnimateHeight, entries, handleChangeEntries, handlePagination, isAdmin, matchXs, page, tabIndex, theme.direction])

  if (error) return "An error has occurred.";
  return (
    <>
      <Header />
      {!!data ? <Body /> : null}
      {/* {openFilter && <Filter /> } */}
      {hrefCreate && (
        <Link href={hrefCreate} underline="none">
          <Fab
            data-testid="fab-at-admin-or-user-template"
            sx={{ position: "fixed", right: "2em", bottom: "3em" }}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Link>
      )}
    </>
  );
}

AdminOrUserTemplate.propTypes = {
  data: PropTypes.any,
  variant: PropTypes.string,
  GridView: PropTypes.elementType.isRequired,
  TableView: PropTypes.elementType,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  entries: PropTypes.number.isRequired,
  setEntries: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  hrefCreate: PropTypes.string,
};

export default AdminOrUserTemplate;
