import nextConnect from 'next-connect'
import 'colors'
import redis from 'redis'

const REDIS_PORT = process.env.PORT || 6379;
export const client = redis.createClient(REDIS_PORT);

export default nextConnect({
    onError(err, req, res, next) {
        return res.status(501).json({ success: false, error: err.message });
    },
    onNoMatch(req, res) {
        return res.status(400).json({ success: false });
    }
})