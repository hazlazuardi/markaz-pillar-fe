import { useEffect, useState } from 'react';
import RegistrationTemplate from '../component/templates/registration';
import { useRouter } from 'next/router'
import { useAppContext } from '../context/AppContext';

export default function Registration() {
    const router = useRouter();

    const { state } = useAppContext();
    const { currentUser } = state;

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
        "statusText": {}
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
            .then(preResponse => {
                console.log("pre Response", preResponse)
                if (preResponse.status === 201) {
                    console.log("registered", preResponse)
                    router.push("/login")
                } else {
                    preResponse.json()
                        .then(response => {
                            console.log("post Response", response)
                            if (response.statusCode === 400) {
                                console.log("Bad request", response)
                                setError({
                                    status: response.statusCode,
                                    statusText: response.result
                                })
                            } else {
                                console.log("Unknown error", response)
                            }
                        }).catch(error => {
                            console.log("post error", error);
                        })
                }
            })
            .catch(error => {
                console.log("Server error", error)
            })

    }
    useEffect(() => {
        if (currentUser) {
            router.push("/landing")
        }
    }, [router, currentUser])
    return (
        <>
            <RegistrationTemplate value={value} error={error} handleChange={handleChange} handleSubmit={handleSubmit} />
        </>
    )

}