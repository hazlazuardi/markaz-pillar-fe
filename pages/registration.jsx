import { useState } from 'react';
import RegistrationTemplate from '../component/templates/registration';
import { useRouter } from 'next/dist/client/router';

export default function Registration() {
    const router = useRouter();

    const [value, setValue] = useState({
        "email": "",
        "username": "",
        "fullName": "",
        "password": "",
        "phoneNum": "",
        "address": ""
    });
    const [error, setError] = useState({
        "status": 201,
        "statusText": ""
    })

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch('/api/registration', {
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => {
                if (response.status === 201) {
                    console.log("Created", response)
                    setError({
                        "status": 201,
                        "statusText": ""
                    })
                    router.push("/login")
                } else {
                    console.log("Error", response.status)
                    setError({
                        "status": response.status,
                        "statusText": response.statusText
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

    console.log("errorState", error)

    return (
        <>
            <RegistrationTemplate value={value} error={error} handleChange={handleChange} handleSubmit={handleSubmit} />
        </>
    )

}