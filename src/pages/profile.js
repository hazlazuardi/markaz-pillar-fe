import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import { dispatchTypes } from "../context/AppReducer";
import { useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styles from "../styles/Home.module.css";
import ActivityCard from "../component/modules/ActivityCard";
import FilterComponent from "../component/modules/FilterComponent";
import { axiosMain } from "../axiosInstances";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function Profile(props) {
  const { state, dispatch } = useAppContext();
  const { currentUser, currentUserRole } = state;
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const [activities, setActivities] = useState([]);
  const { allActivity } = props;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [statusFilter, setStatusFilter] = useState();
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [show, setShow] = useState();

  const { data, error, mutate } = useSWR(
    `/user/activity?page=${page - 1}&n=${entries}${
      !!typeFilter ? "&type=" + typeFilter : ""
    }${!!statusFilter ? "&status=" + statusFilter : ""}`,
    fetcher,
  );

  useEffect(() => {
    mutate();
  }, [statusFilter, typeFilter, mutate]);


  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: dispatchTypes.LOGOUT,
    });
    router.push("/login");
  };

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

  const handleChangeStatus = (event) => {
    setStatusFilter(event.target.value);
    mutate();
  };

  const matches = useMediaQuery("(max-width:600px)");
  const size = matches ? "small" : "medium";
  const variant = "kegiatan";

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
  }, [variant, size]);

  const allActivities =
    activities.length != 0 ? (
      activities.map((activity) => {
        if (activity.type == "TRANSACTION") {
          return (
            <ActivityCard
              type={"Donasi"}
              name={activity.data.targetName}
              status={activity.data.status}
              date={activity.createdAt}
              secInfo={activity.data.amount}
              recipientType={activity.data.targetType}
              key={activity.id}
              targetId={activity.targetId}
            />
          );
        } else {
          return (
            <ActivityCard
              type={"Volunteer"}
              name={activity.data.program.name}
              status={activity.data.status}
              date={activity.createdAt}
              secInfo={activity.data.program.location}
              recipientType={"volunteer"}
              key={activity.id}
              targetId={activity.targetId}
            />
          );
        }
      })
    ) : (
      <Grid item lg={6} xs={12}>
        <Typography>No activities yet</Typography>
      </Grid>
    );


    
  useEffect(() => {
    const { newData, mutate } = useSWR(
        `/user/activity?page=${page - 1}&n=${entries}${
          !!typeFilter ? "&type=" + typeFilter : ""
        }${!!statusFilter ? "&status=" + statusFilter : ""}`,
        fetcher,
        { fallbackData: allActivity, refreshInterval: 30000 }
      );
    setActivities(newData.result)
}, [tabIndex, statusFilter])

    useEffect(() => {
        if (data != null) setActivities(data.result);
    }, [data]);

console.log(activities)

//   const showData = () => {
//     if (tabIndex == 0) {
//         setShow(allActivities)
//     //   return allActivities;
//     } else if (tabIndex == 1) {
//         setShow(donations)
//     //   return donations;
//     } else if (tabIndex == 2) {
//         setShow(volunteers)
//     //   return volunteers;
//     } else {
//       return "No activities yet";
//     }
//   };

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
              <Tab label="Pengajar" value={3} />
              <Tab label="Kelas" value={4} />
            </Tabs>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* {showData()} */}
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          mt={5}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Pagination count={5} />
        </Grid>
      </Grid>
    </Container>
  );
}

export async function getStaticProps() {
    const staticAllActivityResponse = await axiosMain.get("/user/activity?n=1000");
    const staticAllActivity= staticAllActivityResponse.data;
    return {
      props: {
        allActivity: staticAllActivity,
      },
      revalidate: 10,
    };
  }
