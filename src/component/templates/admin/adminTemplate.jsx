import React from 'react'

export default function adminTemplate(props) {
    const {children, searchBarName, markazOrSantri, view1, view2} = props;
      
    const [value, setValue] = useState(10);

    const [error, setError] = useState({
    "status": 201,
    "statusText": ""
    })

    const [page, setPage] = useState(0)

    const [searchTerm, setSearchTerm] = useState("")

    const [allData, setAllData] = useState([])

    const [data, setData] = useState([])

    const getAllData = async (event) => {
        await fetch(`${BASE_URL}/${markazOrSantri.toLowerCase()}/search`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        }).then(preResponse => {
            preResponse.json().then(data => {
                setAllData(data.result)
            })
        })
    }

    const getData = async (event) => {
        await fetch(`${BASE_URL}/${markazOrSantri.toLowerCase()}/search?page=${page}&n=${value}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        }).then(preResponse => {
            preResponse.json().then(data => {
                setData(data)
            })
        })
    }

    useEffect(() => {
        if(allData.length == 0){
            getAllData()
        }
        getData()
      }, [page, value])

    

    return (
        <Container maxWidth="lg" className={styles.container}>
            <Grid container spacing={3} sx={{display: 'flex', justifyContent:"center"}}>
                <Grid item xs={12}>
                <Typography variant="h6" component="h2">
                    Daftar {markazOrSantri} <FilterAltOutlinedIcon/>
                </Typography>
                </Grid>
                <Grid item align='Left' lg={12} sm={12}>
                <Typography variant="subtitle1" component="subtitle1">
                    Show
                    <FormControl sx={{ m: 1}}>
                        <Select
                        value={value}
                        onChange={e => {
                            setSearchTerm("")
                            setValue(e.target.value)
                        }}
                        displayEmpty
                        name="numOfEntries"
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        </Select>

                    </FormControl>
                    Entries
                </Typography>
                </Grid>
                <Grid item lg={12} sm={12} className={styles.flexing} pr={2}>
                    <Grid container spacing={0}>
                        {/* <Grid item xs={2}><Button>{view1}</Button></Grid> */}
                        {/* <Grid item xs={2}><Button>{view2}</Button></Grid> */}
                        {view1}
                        {view2}
                        <Grid item xs={8} align='Right'>
                            <form action="/" method="get">
                                <label htmlFor="header-search">
                                    <span className="visually-hidden"></span>
                                </label>
                                <input
                                    type="text"
                                    id="header-search"
                                    placeholder={searchBarName}
                                    name="s"
                                    className="search"
                                    value={searchTerm}
                                    onChange={(event) => {setSearchTerm(event.target.value)}}
                                />
                                <button type="submit" className={styles.btn2}>
                                    Cari
                                </button>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    allData.filter((val) => {
                        if(searchTerm == "") {
                            return val
                        }
                        else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
                    }).map((val, key) => {
                        return(
                            <Card key={val.id} 
                            image={val.thumbnailURL} 
                            name={val.name} 
                            desc={val.background}
                            />
                        )
                    })
                }
                <Grid item xs={12} mt={5} className={styles.flexEnd}>
                    <Pagination count={5} page={page + 1} onChange={(event, value) => {
                            setSearchTerm("")
                            setPage(value-1)}
                        }/>
                </Grid>
            </Grid>
        </Container>
    )
}
