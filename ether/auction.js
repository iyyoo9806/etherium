//cancel, destruct 부분은 못하였음

// var web3 = new Web3();
var web3 = new Web3('ws://localhost:7545');
 
// web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));

var bidder;
var currentHighestBid = 0;
var currentHighestBidder = null;


//=   web3.eth.getAccounts(); // web3.eth.accounts[0];
web3.eth.getAccounts().then(function (acc) {
  console.log(acc);
  web3.eth.defaultAccount = acc[0];
  bidder = acc[0];

  var accountSelect = document.getElementById("accountSelect");
  for (var i = 0; i < acc.length; i++) {
    var option = document.createElement("option");
    option.text = acc[i];
    accountSelect.add(option);
  }

  auctionContract.methods.auction_end().call().then((result) => {
    var unixTimestamp = result; // 스마트 계약에서 반환된 유닉스 타임스탬프
    var date = new Date(unixTimestamp * 1000); // 밀리초 단위로 변환 후 Date 객체 생성
  
    // 날짜 및 시간을 원하는 형식으로 포맷
    var formattedDate = date.toLocaleString(); // 원하는 로케일에 따라 포맷을 조정할 수 있음
  
    // 결과를 HTML 엘리먼트에 설정
    document.getElementById("auction_end").innerHTML = formattedDate;
  });

  auctionContract.methods.highestBidder().call().then( (result)=>{
    document.getElementById("HighestBidder").innerHTML=result;
    }); 
        
    auctionContract.methods.highestBid().call().then( (result)=>{
    console.log("highest bid info: ", result)
    var bidEther = web3.utils.fromWei(web3.utils.toBN(result), 'ether');
    document.getElementById("HighestBid").innerHTML=bidEther;
    
    }); 
      auctionContract.methods.STATE().call().then( (result)=>{
    document.getElementById("STATE").innerHTML=result;
    
    }); 
    
      auctionContract.methods.Mycar().call().then( (result)=>{
        
      
        document.getElementById("car_brand").innerHTML=result[0];
        document.getElementById("registration_number").innerHTML=result[1];
      
    }); 
    
    auctionContract.methods.bids(bidder).call().then( (result) => {
        var bidEther = web3.utils.fromWei(web3.utils.toBN(result), 'ether');
        document.getElementById("MyBid").innerHTML=bidEther;
    
        console.log(bidder);
     
    }); 
});

// web3.eth.defaultAccount = bidder;
var auctionContract =  new web3.eth.Contract(
   [
  {
    "constant": true,
    "inputs": [],
    "name": "Mycar",
    "outputs": [
      {
        "name": "Brand",
        "type": "string"
      },
      {
        "name": "Rnumber",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get_owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "bid",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "cancel_auction",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "bids",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "auction_start",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "highestBidder",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "destruct_auction",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "auction_end",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "STATE",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "highestBid",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_biddingTime",
        "type": "uint256"
      },
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_brand",
        "type": "string"
      },
      {
        "name": "_Rnumber",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "highestBidder",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "highestBid",
        "type": "uint256"
      }
    ],
    "name": "BidEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "withdrawer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawalEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "message",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "CanceledEvent",
    "type": "event"
  }
]
  );


var contractAddress = '0x5528FA4BE0Ff84Ed0Eb0A9dc191A471ffAbdF6a1';
// var auction = auctionContract.at(contractAddress); 
auctionContract.options.address = '0x5528FA4BE0Ff84Ed0Eb0A9dc191A471ffAbdF6a1';

function bid() {
  var myBid = document.getElementById('value').value;
  var myBidWei = web3.utils.toWei(myBid, "ether");
  var currentMyBid;
  
  auctionContract.methods.bids(bidder).call().then( (result) => {
    var bidEther = web3.utils.toBN(result);
    currentMyBid = bidEther;
  });

  // 현재 입찰가와 최고 입찰가를 가져오기
  auctionContract.methods.highestBid().call().then(function (result) {
    var currentHighestBidWei = web3.utils.toBN(result);
    console.log(currentHighestBidWei);

    // 문자열을 숫자로 변환
    var myBidWeiBN = web3.utils.toBN(myBidWei);

    // 현재 입찰가와 비교
    if (myBidWeiBN.add(currentMyBid).lte(currentHighestBidWei)) {
      //더한것이(add) 작거나 같다면(lte)
      alert("현재 입찰가가 최고 입찰가보다 작거나 같습니다.");
    } else {
      // 입찰가가 최고 입찰가보다 큰 경우 입찰 진행
      auctionContract.methods.bid().send({
        from: bidder,
        value: myBidWei,
        gas: 200000
      }).then(function (result) {
        console.log(result);

        // 최고 입찰자 및 입찰가 갱신
        // 최고 입찰가는 비드의 누적으로 되게 만듬
        currentHighestBid = myBidWeiBN.add(currentMyBid);
        currentHighestBidder = bidder;
        document.getElementById("HighestBidder").innerHTML = currentHighestBidder;
        document.getElementById("HighestBid").innerHTML = web3.utils.fromWei(currentHighestBid.toString(), 'ether');
        document.getElementById("biding_status").innerHTML = "Successfull bid, transaction ID : " + result.transactionHash;

        auctionContract.methods.bids(bidder).call().then( (result) => {
          var bidEther = web3.utils.fromWei(web3.utils.toBN(result), 'ether');
          document.getElementById("MyBid").innerHTML = bidEther;
          console.log(bidder);
        }); 
      });
    }
  });
}

function login() {
  var accountSelect = document.getElementById("accountSelect");
  var selectedAccount = accountSelect.value; // 선택한 계정 가져오기
  bidder = selectedAccount; // bidder를 선택한 계정으로 업데이트
  document.getElementById("bidderAddress").innerHTML = bidder; // 선택한 계정 정보 표시

  auctionContract.methods.bids(bidder).call().then( (result) => {
  
    var bidEther = web3.utils.fromWei(web3.utils.toBN(result), 'ether');
    document.getElementById("MyBid").innerHTML=bidEther;

    console.log(bidder);
 
}); 

}


function init(){
 // setTimeout(() => alert("아무런 일도 일어나지 않습니다."), 3000);
}
   
var auction_owner=null;
auctionContract.methods.get_owner().call().then((result)=>{
  
      auction_owner=result;
     if(bidder!=auction_owner)
     $("#auction_owner_operations").hide();

})

  
function cancel_auction(){
  // .auction_end().call().
// auctionContract.methods.cancel_auction().call().then( (result)=>{
//   console.log(result)
// });
auctionContract.methods.cancel_auction().send({from: '0x3211BA2b204cdb231EF5616ec3cAd26043b71394', gas: 200000}).then((res)=>{
// auctionContract.methods.cancel_auction().call({from: '0x3211BA2b204cdb231EF5616ec3cAd26043b71394'}).then((res)=>{
console.log(res);
}); 
}


function Destruct_auction(){
// auctionContract.methods.destruct_auction().call().then( (result)=>{
//   console.log(result) //The auction is still open when now() time < auction_end time
// });
auctionContract.methods.destruct_auction().send({from: '0x3211BA2b204cdb231EF5616ec3cAd26043b71394', gas: 200000}).then((res)=>{
console.log(res);
}); 

}
  
auctionContract.events.BidEvent(/*{highestBidder:"A",highestBid:"888"},*/function(error, event){ 
      console.log(event); 
  })
  .on("connected", function(subscriptionId){
      console.log(subscriptionId);
  })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
      $("#eventslog").html(event.returnValues.highestBidder + ' has bidden(' + event.returnValues.highestBid + ' wei)');

  })
  .on('changed', function(event){
      // remove event from local database
      console.log(event);
  })

 auctionContract.events.CanceledEvent( function(error, event){ 
  console.log(event); 
  })
  .on("connected", function(subscriptionId){
      console.log(subscriptionId);
  })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
   $("#eventslog").html(event.returnValues.message+' at '+event.returnValues.time);
  })
  .on('changed', function(event){
      // remove event from local database
  })
  .on('error', function(error, receipt){ // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
   
  });