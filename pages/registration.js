import { useEffect, useState } from 'react';
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
        // API Route usage
        await fetch('/api/registration', {
            body: JSON.stringify(value),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => {
                if (response.status === 201) {
                    console.log("Success before", response)
                    setError({
                        "status": 201,
                        "statusText": ""
                    })
                    console.log("Success register", response)
                    router.push("/login")
                } else {
                    // Update the helper text if server error
                    response.json().then(data => {
                        console.log("page", data)
                        setError({
                            "status": 500,
                            "statusText": "Server Error"
                        })
                    })
                }
            });

    }
    useEffect(() => {
        localStorage.clear();
    }, [])
    return (
        <>
            <RegistrationTemplate value={value} error={error} handleChange={handleChange} handleSubmit={handleSubmit} />
        </>
    )

}