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
        }).then(r => {
            if (r.status === 200) {
                r.json();
                console.log(r)
            } else {
                res.status(401).json(r)
                console.log(r)
            }
        }).then(data => {
            res.status(200).json(data)
            console.log("data", data)
        })
            .catch(error => {
                console.log(error)
            });
    });