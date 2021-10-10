import handler from '../../../../handler';
import middleware from '../../../../middleware/middleware';

const BASE_URL = process.env.BACKEND_HOST;

handler.use(middleware)

handler.post(async(req, res) => {
	try {
		const files = req.files
		const body = req.body

		console.log("api files", files)
		console.log("api body", body)
		// do stuff with files and body
		res.status(200).json({});
	} catch (err) {
		res.status(400).json({error: err.message});
	}
});


export const config = {
    api: {
      bodyParser: false,
    },
  }
  
export default handler;