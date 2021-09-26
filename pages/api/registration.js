import handler from '../../handler';

const BASE_URL = process.env.BACKEND_HOST;

export default handler
    .post(async (req, res) => {
        const data = req.body;
        await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(r => {
            if (r.status === 201) {
                res.status(201).json(r);
                console.log(r)
            } else {
                res.status(400).json(r)
                console.log(r)
            }
        })
            .catch(error => {
                console.log(error)
            });
    });
