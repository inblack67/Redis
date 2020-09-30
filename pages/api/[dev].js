import handler from "../../src/handler";
import redis from 'redis'
import axios from 'axios'
import 'colors'

const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

export default handler
  .use((req, res, next) => {
    const { dev } = req.query;
    client.get(dev, (err, data) => {
      if (err) {
        console.error(err)
      }
      if (data) {
        console.log(`I won`.green.bold);
        res.json({ success: true, dev, url: data });
      }
      else {
        next();
      }
    })
  })
  .get(async (req, res, next) => {

    const { dev } = req.query;
    console.log(`Making requests`.red.bold);
    const response = await axios.get(`https://api.github.com/users/${dev}`);

    const url = response.data.html_url;

    client.setex(dev, 3600, url);

    return res.status(200).json({ success: true, dev, url });
  })
