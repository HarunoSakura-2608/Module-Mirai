module.exports.config = {
    name: "dogfact",
    version: "1.0.0",
    hasPermision: 0,
    credit: "Nguyễn Quang Minh",
    description: "dog fact",
    commandCategory: "info",
    usages: "",
    cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
	const res = await axios.get(`https://some-random-api.ml/animal/dog`);
	console.log(res.data);
	var data = res.data;
	const translate = await axios.get(encodeURI(`https://lawerpr0ject.herokuapp.com/other/translate?text=${data.fact}&to=vi`));
	var fact = translate.data.trans;
	let callback = function() {
            return api.sendMessage({
                body:`===🐶Dog fact🐶===\n\nFact: ${fact}`,
                attachment: fs.createReadStream(__dirname + `/cache/image.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
        };
		return request(encodeURI(data.image)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
		} catch (err) {
        console.log(err)
        return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
    }
}
