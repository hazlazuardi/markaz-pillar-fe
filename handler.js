import nextConnect from "next-connect";

export default nextConnect({
    onError(req, res) {
        res.status(501).body("Something went wrong")
    },
    onNoMatch(req, res) {
        res.status(405).body("Method not allowed")
    }
});