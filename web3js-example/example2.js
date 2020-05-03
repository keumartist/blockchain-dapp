var Web3 = require('web3');

const infuraAddress = "";
const smartcontractAdddress = "";

var web3 = new Web3(new Web3.providers.WebsocketProvider(infuraAddress));

web3.eth.subscribe('logs', {
	address: smartcontractAdddress,
	topics : [null]
}, function(error, result) {
	if (error) {
		console.log("error", error);
	}
}).on("connected", function(subscriptionId) {
	console.log("subscrpitionId : ", subscriptionId);
}).on("data", function(log) {
	console.log("log", log);
});

// topic[1]은 deposit이 발생했다는 사인을 keccak256 함수를 통해 보내주는 것
// topic[2]은 address indexed from 에 해당하는 내 지갑 주소 16진수!