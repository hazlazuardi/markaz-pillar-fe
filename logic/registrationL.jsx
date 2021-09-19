import { useState } from 'react'

export default function RegistrationL() {
    const [value, setValue] = useState({
        email: '',
        username: '',
        namaLengkap: '',
        nomorTelepon: '',
        alamat: '',
        password: '',
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(value);
        // register(value).then((res) => {
        //   dispatch({ type: 'snackbarSuccess', payload: `Welcome, ${value.username}` })
        //   redirectImmediate("/login");
        // }).catch((error) => {
        //   console.log('salah login', error);
        //   if (error.response.status === 400) {
        //     dispatch({ type: 'snackbarError', payload: 'Please fill all of the fields' })
        //   }
        //   if (error.response.status === 403) {
        //     dispatch({ type: 'snackbarError', payload: 'User already exists' })
        //   }
        // });
    };

    return {
        value,
        handleChange,
        handleSubmit
    }
}