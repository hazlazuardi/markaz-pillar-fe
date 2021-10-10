import handler from '../../../../handler';
import middleware from '../../../../middleware/middleware';

const BASE_URL = process.env.BACKEND_HOST;
handler.use(middleware)

handler.post(async (req, res) => {
	try {
		const files = req.files
		const body = req.body
		req.body = {
			...body,
			"thumbnail": files.thumbnail
		}
		console.log('api req', req)
		console.log("api header", req.headers)
		console.log("api files", files)
		console.log("api body", body)

		// edit the req

		// do stuff with files and body
		await fetch(`${BASE_URL}/admin/markaz`, req, req.headers)
			.then(preResponse => {
				console.log("pre")
				preResponse.json()
					.then(response => {
						console.log("api response", response)
					})
					.catch(error => {
						console.log('api re error', error)
					})
			})
			.catch(error => {
				console.log('api pre error', error)
			})

		res.status(200).json({});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});


export const config = {
	api: {
		bodyParser: false
	},
}

export default handler;