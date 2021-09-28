const axios = require('axios');

async function apiDataHandler(req, res) {
    try {
        let data = await axios.get("https://fruit-api-301.herokuapp.com/getFruit");
        let filteredData = data.data.fruits.map((obj) => {
            return new FavList(obj);
        })
        res.send(filteredData);
    } catch (error) {
        console.log(error);
        res.status(500).send('not found')
    }
}


class FavList {
    constructor(obj) {
        this.name = obj.name;
        this.image = obj.image;
        this.price = obj.price;
    }
}

module.exports = apiDataHandler;