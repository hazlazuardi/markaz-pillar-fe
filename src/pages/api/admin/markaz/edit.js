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
		
		
		
		

		// edit the req

		// do stuff with files and body
		await fetch(`${BASE_URL}/admin/markaz`, req, req.headers)
			.then(preResponse => {
				
				preResponse.json()
					.then(response => {
						
					})
					.catch(error => {
						
					})
			})
			.catch(error => {
				
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