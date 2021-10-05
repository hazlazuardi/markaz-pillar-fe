import handler from '../../handler';

const BASE_URL = process.env.BACKEND_HOST;

export default handler
    .post(async (req, res) => {
        const data = req.body;
        await fetch(`${BASE_URL}/authenticate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(preResponse => {
            // console.log("api res before", preResponse)
            preResponse.json()
                .then(response => {
                    // console.log("api res after", response)
                    // use preResponse status since it's consistent (Note for BE team!)
                    res.status(preResponse.status).send(response);
                })
                .catch(error => {
                    console.log("api error", error)
                });
        })
            .catch(error => {
                console.log(error)
            });
    });