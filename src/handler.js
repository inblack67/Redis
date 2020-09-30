import nextConnect from 'next-connect'
import 'colors'

export default nextConnect({
    onError(err, req, res, next) {
        return res.status(501).json({ success: false, error: err.message });
    },
    onNoMatch(req, res) {
        return res.status(400).json({ success: false });
    }
})