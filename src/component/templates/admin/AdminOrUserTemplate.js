import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { AppBar, Chip, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Tab, useMediaQuery } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SwipeableViews from 'react-swipeable-views';
import { SwipeableEnableScroll } from '../../../component/SwipeableEnableScroll'
import { useTheme } from '@mui/material/styles';
import { Box } from "@mui/system";

function AdminOrUserTemplate(props) {
    const {
        isAdmin,
        variant,
        GridView,
        TableView,
        entries,
        setEntries,
        page,
        setPage,
        data,
        error,
        children
    } = props;

    const [doAnimateHeight, setDoAnimateHeight] = useState(true)

    // *******************************************************
    // Show Entries
    // *******************************************************
    const handleChangeEntries = useCallback(event => {
        setEntries(event.target.value);
        setPage(1)
        // disable it until API Calls done
        setDoAnimateHeight(false)

    }, [setEntries, setPage])


    // *******************************************************
    // Pagination
    // *******************************************************
    const matchXs = useMediaQuery('(max-width:600px)')
    const handlePagination = (event, value) => {
        setPage(value);
        // disable it until API Calls done
        setDoAnimateHeight(false);

    };

    // *******************************************************
    // Tabs
    // *******************************************************
    const theme = useTheme()
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabIndex = (event, tab) => {
        setTabIndex(tab);
        setDoAnimateHeight(false)
    };
    const handleChangeTabIndex = tab => {
        setTabIndex(tab);
        setDoAnimateHeight(false)
    };

    useEffect(() => {
        return () => {
            setDoAnimateHeight(true);
        }
    }, [entries, page, tabIndex])

    const axis = theme.direction === 'rtl' ? 'x-reverse' : 'x'
    if (error) return "An error has occurred.";
    if (!data) return "Loading...";
    return (
        <>
            {/* Header */}
            <Typography data-testid='titlePage-at-admin-or-user-template' variant="h4" sx={{ textTransform: 'capitalize' }} color="initial">Daftar {variant}</Typography>
            <Box>
                <TextField
                    data-testid='searchbar-at-admin-or-user-template'
                    label="Cari Markaz"
                    placeholder='Markaz Depok'
                    margin='normal'
                    fullWidth
                    size='small' />
                <Chip
                    data-testid='filterChipButton-at-admin-or-user-template'
                    label='Filter'
                    icon={<FilterList />}
                />
            </Box>
            {GridView && TableView ? (<TabContext value={tabIndex} >
                <AppBar position='relative' color="transparent" elevation={0} >
                    <TabList onChange={handleTabIndex}>
                        <Tab data-testid='tab-grid-at-admin-or-user-template' label='Grid' value={0} />
                        <Tab data-testid='tab-table-at-admin-or-user-template' label='Table' value={1} />
                    </TabList>
                </AppBar>
                <SwipeableViews
                    axis={axis}
                    index={tabIndex}
                    onChangeIndex={handleChangeTabIndex}
                    animateHeight={doAnimateHeight}
                    ignoreNativeScroll
                >
                    <TabPanel data-testid='gridView-at-admin-or-user-template' value={tabIndex} index={0} dir={theme.direction}>
                        {GridView}
                    </TabPanel>
                    <TabPanel data-testid='tableView-at-admin-or-user-template' value={tabIndex} index={1} dir={theme.direction}>

                        <SwipeableEnableScroll>
                            {TableView}
                        </SwipeableEnableScroll>

                    </TabPanel>
                </SwipeableViews>
            </TabContext>
            ) : (
                <Box mt='2em'>
                    {GridView || TableView}
                </Box>)}
            {/* Pagination */}
            {!!children && (
                <Box mt='2em'>
                    {children}
                </Box>
            )}
            <Stack sx={{ bottom: '0em' }} spacing={2} alignItems='center' >
                <FormControl fullWidth sx={{ m: '1em', maxWidth: 375 }} >
                    <InputLabel id="entries-select-label">Show Entries</InputLabel>
                    <Select
                        data-testid='showEntries-at-admin-or-user-template'
                        labelId="entries-select-label"
                        id="entries-select"
                        value={entries}
                        label="Show Entries"
                        onChange={handleChangeEntries}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                <Pagination data-testid='pagination-at-admin-or-user-template' size={matchXs ? 'small' : 'medium'} boundaryCount={1} count={data.totalPage} page={page} onChange={handlePagination} />
            </Stack>
            <Link href="markaz/create" underline="none">
                <Fab
                    data-testid='fab-at-admin-or-user-template'
                    sx={{ position: "fixed", right: "2em", bottom: "3em" }}
                    color="primary"
                    aria-label="add"
                >
                    <AddIcon />
                </Fab>
            </Link>
        </>
    )
}


AdminOrUserTemplate.propTypes = {
    data: PropTypes.any,
    variant: PropTypes.string,
    GridView: PropTypes.elementType.isRequired,
    TableView: PropTypes.elementType,
    entries: PropTypes.number.isRequired,
    setEntries: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired
}

export default AdminOrUserTemplate;
