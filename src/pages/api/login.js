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
            
            preResponse.json()
                .then(response => {
                    
                    // use preResponse status since it's consistent (Note for BE team!)
                    res.status(preResponse.status).json(response);
                })
                .catch(error => {
                    console.log(error)    
                });
        })
            .catch(error => {
                
            });
    });