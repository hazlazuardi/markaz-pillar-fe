export default function handler(_req, res) {
    const { id } = _req.query
    return res.status(200).json(response)
}

const response = {
    "timestamp": "2021-10-09T18:36:00.2025248",
    "statusCode": 200,
    "message": "OK",
    "result": {
        "id": 1,
        "name": "markaz jakarta",
        "slug": "markaz-jakarta",
        "category": "MARKAZ_IKHWAN",
        "background": "pembinaan islami",
        //   "thumbnailURL": "file:///C:/Programming/PPL/pillar-be/static/215463_SAFiGpQd.jpg",
        "thumbnailURL": 'https://source.unsplash.com/random',
        "address": "jalan kebenaran",
        "donationCategories": null,
        "description": null,
        "nominal": null,
        "donated": null,
        "contactPerson": null
    }
}