var Web3 = require('web3');

const infuraAddress = "";
const smartcontractAdddress = "";

// websocket은 실시간으로 데이터 통신 - http와 다른점
var web3 = new Web3(new Web3.providers.WebsocketProvider(infuraAddress));

// web3.eth.getBalance(smartcontractAddress, function(err, result) {
//     console.log(result);
// });

web3.eth.subscribe('newBlockHeaders', (error, result) => {
	if (!error) {
        console.log('no error');
        
	} else {
		console.log('error', error);
	}
}).on('data', function (transaction) {
	console.log('block: ', transaction);
});

