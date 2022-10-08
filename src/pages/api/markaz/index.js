export default function handler(_req, res) {
    return res.status(200).json(response)
}

const response = {
    "timestamp": "2021-10-09T19:20:17.999",
    "statusCode": 200,
    "message": "OK",
    "result": [
        {
            "id": 3,
            "slug": "markaz-beneran",
            "name": "markaz beneran",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be/static/215463_3wGYGh3U.jpg",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "background": "pembinaan islami"
        },
        {
            "id": 1,
            "slug": "markaz-jakarta",
            "name": "markaz jakarta",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be/static/215463_SAFiGpQd.jpg",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "background": "pembinaan islami"
        },
        {
            "id": 2,
            "slug": "markaz-depok",
            "name": "markaz depok",
            // "thumbnailURL": "file:///C:/Programming/PPL/pillar-be/static/215463_ZzcwKTKC.jpg",
            "thumbnailURL": 'https://source.unsplash.com/random',
            "background": "pembinaan islami"
        }
    ],
    "count": 3,
    "page": 0,
    "totalElement": 3,
    "totalPage": 1
}