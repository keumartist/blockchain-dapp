## DApp 만들기
CryptoZombies 정리

### Solidity 기본
* view : 함수가 데이터를 보기만 하고 변경하지 않는다는 뜻
  * `function sayHello() public view returns (string)`
* msg.sender : 현재 함수를 호출한 사람(혹은 스마트 컨트랙트)의 주소를 가리키는 전역 변수
  * 솔리디티에서 함수 실행은 항상 외부 호출자가 시작함. 컨트랙트는 누군가가 컨트랙트의 함수를 호출할 때까지 블록체인 상에서 아무 것도 안하고 있기 때문에. 항상 msg.sender가 있어야 함
* mapping : key-value 형태의 자료 구조
  * ` mapping (address => uint) public itemToOwner; `
* require : 특정 조건이 참이 아닐 때 함수가 에러 메시지를 발생하고 실행을 멈춤
  * ` require(keccak(_name) == keccak('vitalik')`
  * solidity는 스트링 비교 기능을 기본으로 갖고 있지 않기 때문에 keccak 함수를 통해 비교함
* Storage와 Memory
  * Storage : 블록체인 상에 영구적으로 저장되는 변수 - 컴퓨터의 하드디스크와 유사
  * Memory : 임시적으로 저장되는 변수. 함수 블록 내에서만 저장됨 - 컴퓨터의 메모리오 유사
  * solidity는 보통 두 변수를 자동으로 할당하지만, 때로는 직접 설정해줘야 한다
  ```solidity
    function eatSandwich(uint _index) public {
   
     // Sandwich mySandwich = sandwiches[_index];
     // 위 코드에서 `storage`나 `memory`를 명시적으로 선언해야 한다는 경고 메시지 발생 
     // 그러므로 `storage` 키워드를 활용하여 다음과 같이 선언해야 한다:
     Sandwich storage mySandwich = sandwiches[_index];
     // ...이 경우, `mySandwich`는 저장된 `sandwiches[_index]`를 가리키는 포인터
     // 그리고 
     mySandwich.status = "Eaten!";
     // ...이 코드는 블록체인 상에서 `sandwiches[_index]`을 영구적으로 변경

     // 단순히 복사를 하고자 한다면 `memory`를 이용하면 된다: 
     Sandwich memory anotherSandwich = sandwiches[_index + 1];
     // ...이 경우, `anotherSandwich`는 단순히 메모리에 데이터를 복사하는 것이 된다. 
     // 그리고 
     anotherSandwich.status = "Eaten!";
     // ...이 코드는 임시 변수인 `anotherSandwich`를 변경하는 것으로 
     // `sandwiches[_index + 1]`에는 아무런 영향을 끼치지 않는다. 그러나 다음과 같이 코드를 작성할 수 있다: 
     sandwiches[_index + 1] = anotherSandwich;
     // ...이는 임시 변경한 내용을 블록체인 저장소에 저장하고자 하는 경우이다.
    }
  ```  
* modifier : 함수 제어자
  * 함수 정의부 끝에 해당 함수의 작동 방식을 바꾸도록 제어자의 이름을 붙임
  ```solidity
  modifier onlyOwner() {
  require(msg.sender == owner);
  _;
  }
  
  contract MyContract is Ownable {
   event LaughManiacally(string laughter);

   function likeABoss() external onlyOwner {
     LaughManiacally("Muahahahaha");
   }
  }
  ```
* 시간 단위(Time units)
  * now : 유닉스 타임스탬프 (since 1970.01.01)
  * seconds, minutes, hours, days, weeks, years 등 단위 존재. 이들은 그에 해당하는 길이 만큼의 초 단위 uint 숫자로 변환된다. 즉 1 minutes는 60, 1 hours는 3600(60초 x 60 분), 1 days는 86400
  
### Smart Contract의 특징
* 컨트랙트의 불변성
  * 컨트랙트로 배포한 최초의 코드는 블록체인에 영구적으로 존재하게 된다. 이것이 바로 솔리디티에 있어서 보안이 굉장히 큰 이슈인 이유이다.
  * 한 번 검증한 코드는 언제나 검증된 대로 실행될 것이라고 확신할 수 있다.
* 외부 의존성
  * 만약 내 컨트랙트에 넣은 다른 컨트랙트의 주소가 있는데, 그 컨트랙트의 문제가 발생해도 나의 컨트랙트 코드를 수정할 방법이 없다.
  * 그래서 내 DApp의 코드를 일부 수정할 수 있도록 짜는게 중요하다.
* 가스
  * 이더리움 DApp이 사용하는 연료
  * 솔리디티에서는 사용자들이 DApp의 함수를 실행할 때마다 '가스'라고 불리는 화폐를 지불한다. 사용자는 이더(ETH, 이더리움의 화폐)를 이용해서 가스를 사기 때문에, DApp 함수를 실행하려면 사용자들은 ETH를 소모해야만 한다
  * 함수를 실행하는 데에 얼마나 많은 가스가 필요한지는 그 함수의 로직(논리 구조)이 얼마나 복잡한지에 따라 달라진다. 각각의 연산은 소모되는 가스 비용(gas cost)이 있고, 그 연산을 수행하는 데에 소모되는 컴퓨팅 자원의 양이 이 비용을 결정한다. 함수의 전체 가스 비용은 그 함수를 구성하는 개별 연산들의 가스 비용을 모두 합친 것과 같다.

