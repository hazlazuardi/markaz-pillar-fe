import React, {useCallback, useState} from 'react'
import useSWR from 'swr'
import { axiosMain } from '../axiosInstances';
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import { dispatchTypes } from '../context/AppReducer';
import Link from "next/link";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import { useMediaQuery } from "@mui/material";

import styles from "../styles/Home.module.css";
import FilterComponent from "../component/modules/FilterComponent";
import ActivityCard from "../component/modules/ActivityCard";


const fetcher = (url) => axiosMain.get(url).then((res) => res.data);
export default function Profile() {

    const { state, dispatch } = useAppContext();
    const { currentUser, currentUserRole } = state;
    const router = useRouter();

    const [tabIndex, setTabIndex] = useState(0);
    const [statusFilter, setStatusFilter] = useState();
    const [page, setPage] = useState(0)
    const [typeFilter, setTypeFilter] = useState("ALL")

    const matches = useMediaQuery("(max-width:600px)");
    const size = matches ? "small" : "medium";

    const handleLogout = () => {
        dispatch({
            type: dispatchTypes.LOGOUT,
        });
        router.push("/login");
    };

    const { data, error, mutate } = useSWR(router.isReady && currentUser ?
        `/user/activity?page=${page}&n=10&type=${typeFilter}${statusFilter != null ? "&status=" + statusFilter : ""}` : null,
        fetcher,
    );

    const handleChangeStatus = (event) => {
        setStatusFilter(event.target.value);
        mutate();
    };

    const handlePagination = useCallback(
        (event, value) => {
        setPage(value-1);
        },
        [setPage]
    );

    const radioProfile = [
        {
            title: "Status",
            value: statusFilter,
            onChange: handleChangeStatus,
            labels: [
                { value: "DITERIMA", label: "Diterima" },
                { value: "DITOLAK", label: "Ditolak" },
                {
                    value: "MENUNGGU_KONFIRMASI",
                    label: "Menunggu Konfirmasi",
                },
            ],
        },
    ];

    const Filter = useCallback(() => {
        return (
        <FilterComponent
            data-testid="filterChipButton-at-admin-or-user-template"
            mutate={mutate}
            size={size}
            variant={"kegiatan"}
            FilterRadioObject={radioProfile}
        />
        );
    }, [size, mutate, radioProfile]);

    const handleTabIndex = (event, tab) => {
        setTabIndex(tab);
        if (tab == 0) {
            setTypeFilter("ALL");
            setStatusFilter("");
            mutate();
        } else if (tab == 1) {
            setTypeFilter("TRANSACTION");
            setStatusFilter("");
            mutate();
        } else if (tab == 2) {
            setTypeFilter("VOLUNTEER");
            setStatusFilter("");
            mutate();
        }
    };

    const renderDonasi = () => {
        return data.result.filter(activity => activity.type == "TRANSACTION").map(activity => (
            <ActivityCard
                type={"Donasi"}
                name={activity.data.targetName}
                status={activity.data.status}
                date={activity.data.createdAt}
                secInfo={activity.data.amount}
                recipientType={activity.data.targetType}
                key={activity.id}
                targetId={activity.data.targetId}
            />
        ))
    }

    const renderVolunteer = () => {
        return data.result.filter(activity => activity.type == "VOLUNTEER").map(activity => (
            <ActivityCard
                type={"Volunteer"}
                name={activity.data.name}
                status={activity.data.status}
                date={activity.data.createdAt}
                secInfo={activity.data.program.location}
                recipientType={"VOLUNTEER"}
                key={activity.id}
                targetId={activity.data.program.id}
            />
        )) 
    }

    const showActivities = () => {
        if(typeFilter == "ALL") {
            return [renderDonasi(), renderVolunteer()]
        } else if (typeFilter == "TRANSACTION") {
            return renderDonasi()
        } else if (typeFilter == "VOLUNTEER") {
            return renderVolunteer()
        }
    }
    
    return (
        <Container maxWidth="lg" className={styles.container}>
        <Grid container spacing={0} direction="column" alignItems="center" mb={5}>
            <Grid item xs={12}>
            {currentUser && (
                <Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Avatar sx={{ width: 100, height: 100, mb: "1em" }}>
                    {currentUser[0].toUpperCase()}
                    </Avatar>
                </Box>
                <Typography
                    sx={{ wordWrap: "break-word" }}
                    textAlign="center"
                    variant="h5"
                >
                    {currentUser.split("@")[0]}
                </Typography>
                <Typography sx={{ wordWrap: "break-word" }} textAlign="center">
                    {currentUserRole.split("_")[1]}
                </Typography>
                <Button
                    fullWidth
                    color="error"
                    sx={{ mt: "2em" }}
                    size="large"
                    variant="text"
                    onClick={handleLogout}
                >
                    Keluar
                </Button>
                </Box>
            )}

            {!currentUser && (
                <Box>
                <Typography
                    sx={{ wordWrap: "break-word", margin: 1 }}
                    textAlign="center"
                >
                    Anda Belum Log In
                </Typography>
                <Link href="/login" passHref>
                    <Button
                    fullWidth
                    sx={{ mb: "1em" }}
                    variant="contained"
                    color="primary"
                    size="large"
                    >
                    Masuk
                    </Button>
                </Link>
                <Link href="/registration" passHref>
                    <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    size="large"
                    >
                    Daftar
                    </Button>
                </Link>
                </Box>
            )}
            </Grid>
        </Grid>

        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography>
                Kegiatan Saya <Filter />
            </Typography>
            </Grid>

            <Grid item xs={12} mt={2}>
            <Box>
                <Tabs
                value={tabIndex}
                onChange={handleTabIndex}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                >
                <Tab label="Semua Kegiatan" value={0} />
                <Tab label="Donasi" value={1} />
                <Tab label="Volunteer" value={2} />
                </Tabs>
            </Box>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        data != null ? showActivities() : 
                        <Grid item p={1}> 
                            <Typography> No activities yet </Typography>
                        </Grid>
                    }
                </Grid>
            </Grid>

            <Grid
            item
            xs={12}
            mt={5}
            sx={{ display: "flex", justifyContent: "flex-end" }}
            >
            <Pagination
            data-testid="pagination-at-profile-page"
            boundaryCount={1}
            count={data != null ? data.totalPage : 1}
            page={page + 1}
            onChange={handlePagination}
            />
            </Grid>
        </Grid>
    </Container>
    )
}
