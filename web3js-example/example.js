
var Web3 = require('web3');

const infuraAddress = "";
const smartcontractAdddress = "";

var web3 = new Web3(new Web3.providers.WebsocketProvider(infuraAddress));

// getCode :이더리움에 배포된 내 스마트 컨트랙트의 주소의 바이트값을 그대로 가져옴
web3.eth.getCode(smartcontractAdddress, function(error, result) {
	if (!error) {
		console.log(result);
	}
});