import { useCallback, useState, useRef } from 'react'
import Dropzone from '../../../../component/modules/Dropzone'
import Container from '@mui/material/Container'
import cuid from 'cuid'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {useAppContext} from '../../../../context/AppContext'

const BASE_URL = process.env.BACKEND_HOST;

function AdminMarkazEdit() {
  const {state, dispatch} = useAppContext()
  const { currentAccessToken } = state;
  const [thumbnail, setThumbnail] = useState();
  const [markaz, setMarkaz] = useState({
    name: "",
    background: "",
    category: "",
    address: ""
  })
  const form = useRef(null)

  const onDrop = useCallback(acceptedFiles => {
    console.log('acceptedFiles', acceptedFiles[0])
    const reader = new FileReader();
    reader.onload = function (e) {
      setThumbnail(acceptedFiles[0]);
    };
    reader.readAsDataURL(acceptedFiles[0]);
    console.log('file', acceptedFiles[0])
    return acceptedFiles[0]
  }, []);


  const handleChangeMarkaz = ({ target }) => {
    const { name, value } = target;
    setMarkaz((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // API Route usage
    const data = new FormData()
    const markazBlob = new Blob([JSON.stringify(markaz)], {type : 'application/json'});
    data.append("thumbnail", thumbnail)
    data.append("markaz", markazBlob)
    // Display the key/value pairs
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    } 
    
    console.log(BASE_URL)
    await fetch(`${BASE_URL}/admin/markaz`, {
      body: data,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': `Bearer ${currentAccessToken}`
      },
      method: 'POST'
    }).then(preResponse => {
      preResponse.json().then(response => {
        console.log(response)
      })
    })
  }

  console.log('image', thumbnail)
  return (
    <div>
      <Container>
        <form ref={form} onSubmit={handleSubmit}>
          <Dropzone name="thumbnail" onDrop={onDrop} accept={"application/pdf"} />
          <TextField
            name="name"
            label="Markaz Name"
            fullWidth
            onChange={handleChangeMarkaz}
          />
          <TextField
            name="background"
            label="Background"
            fullWidth
            onChange={handleChangeMarkaz}
          />
          <TextField
            name="category"
            label="Markaz Category"
            fullWidth
            onChange={handleChangeMarkaz}
          />
          <TextField
            name="address"
            label="Markaz Address"
            fullWidth
            onChange={handleChangeMarkaz}
          />
          <Button type="submit" variant="outlined" color="primary">
            Save
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default AdminMarkazEdit
