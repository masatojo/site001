//テストコード
window.addEventListener('load', function(){
      consolog.log("test");
    var url = "https://worldtimeapi.org/api/timezone/Asia/Tokyo";
    let r = new XMLHttpRequest();
    r.open('GET', url);
    r.responseType = 'json';
    r.send();

    r.onreadystatechange = () => {
        if (r.readyState == 4 && r.status == 200) {
            const jsonStr = JSON.stringify(r.response);
            const obj = JSON.parse(jsonStr);
            var time = document.getElementById("time");
            var date = new Date(obj["unixtime"] * 1000);//付け足したやつなので変になったら消しておいてください
            //time.innerHTML = obj["unixtime"]*;
            time.innerHTML= date
        }
    }
});

window.onload = function() {
    consolog.log("test");
    var url = "https://worldtimeapi.org/api/timezone/Asia/Tokyo";
    let r = new XMLHttpRequest();
    r.open('GET', url);
    r.responseType = 'json';
    r.send();

    r.onreadystatechange = () => {
        if (r.readyState == 4 && r.status == 200) {
            const jsonStr = JSON.stringify(r.response);
            const obj = JSON.parse(jsonStr);
            var time = document.getElementById("time");
            var date = new Date(obj["unixtime"] * 1000);//付け足したやつなので変になったら消しておいてください
            //time.innerHTML = obj["unixtime"]*;
            time.innerHTML= date
        }
    }
}

  window.userAddress = null;
    window.onload = async () => {
      // Init Web3 connected to ETH network
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
      } else {
        alert("No ETH brower extension detected.");
      }

      // Load in Localstore key
      window.userAddress = window.localStorage.getItem("userAddress");
      showAddress();
    };

    // Use this function to turn a 42 character ETH address
    // into an address like 0x345...12345
    function truncateAddress(address) {
      if (!address) {
        return "";
      }
      return `${address.substr(0, 5)}...${address.substr(
        address.length - 5,
        address.length
      )}`;
    }

    // Display or remove the users know address on the frontend
    function showAddress() {
      if (!window.userAddress) {
        document.getElementById("userAddress").innerText = "";
        document.getElementById("logoutButton").classList.add("hidden");
        return false;
      }

      document.getElementById(
        "userAddress"
      ).innerText = `ETH Address: ${truncateAddress(window.userAddress)}`;
      document.getElementById("logoutButton").classList.remove("hidden");
    }

    // remove stored user address and reset frontend
    function logout() {
      window.userAddress = null;
      window.localStorage.removeItem("userAddress");
      showAddress();
    }

    // Login with Web3 via Metamasks window.ethereum library
    async function loginWithEth() {
      if (window.web3) {
        try {
          // We use this since ethereum.enable() is deprecated. This method is not
          // available in Web3JS - so we call it directly from metamasks' library
          const selectedAccount = await window.ethereum
            .request({
              method: "eth_requestAccounts",
            })
            .then((accounts) => accounts[0])
            .catch(() => {
              throw Error("No account selected!");
            });
          window.userAddress = selectedAccount;
          window.localStorage.setItem("userAddress", selectedAccount);
          showAddress();
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("No ETH brower extension detected.");
      }
    }
