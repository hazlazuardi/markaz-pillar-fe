import handler from '../../handler';

const BASE_URL = process.env.BACKEND_HOST;

export default handler
    .post(async (req, res) => {
        const data = req.body;
        await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(r => {
            console.log("api res before", r)
            if (r.status === 201) {
                res.status(201).json(r)
            } else {
                console.log("api res error before", r)
                r.json().then(data => {
                    console.log("api res error after", data)
                    res.status(500).send(data)
                    console.log("api", data)
                })
            }
        })
            .catch(error => {
                console.log(error)
                console.log("api res error before", r)
                r.json().then(data => {
                    console.log("api res error after", data)
                    res.status(500).send(data)
                    console.log("api", data)
                })
            });
    });