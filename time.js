//テストコード
window.addEventListener('load', async function () {
    var date = await getDate();
    console.log(date);

    //Canvas
    var image = new Image();
    image.src = 'image002.png';
     //image.style.width = '50%';
    image.onload = (function () {
        //画像ロードが完了してからキャンバスの準備をする
        var canvas = document.getElementById("testCanvas");
        var ctx = canvas.getContext('2d');
        //キャンバスのサイズを画像サイズに合わせる
        canvas.width = image.width;
        canvas.height = image.height;
        //キャンバスに画像を描画（開始位置0,0）
        ctx.drawImage(image, 0, 0);
        ctx.font = '32px serif';
        ctx.fillStyle = '#404040';
        //文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
        ctx.textBaseline = 'center';
        ctx.textAlign = 'center';
        //座標を指定して文字を描く（座標は画像の中心に）
        var x = (canvas.width / 2);
        var y = (canvas.height / 2);
        console.log(canvas.width / 2);
        console.log(canvas.height / 2);
        ctx.fillText(date, x, y);
    });
});

function getDate() {
    return new Promise(resolve => {
        var date;
        const url = "https://worldtimeapi.org/api/timezone/Asia/Tokyo";
        let r = new XMLHttpRequest();
        r.open('GET', url);
        r.responseType = 'json';
        r.send();
        console.log("呼び出し1");

        r.onreadystatechange = function () {
            console.log("呼び出し2");
            if (r.readyState == 4 && r.status == 200)
            {
                const jsonStr = JSON.stringify(r.response);
                const obj = JSON.parse(jsonStr);
                let time = document.getElementById("time");
                date = new Date(obj["unixtime"] * 1000);//付け足したやつなので変になったら消しておいてください
                //time.innerHTML = obj["unixtime"]*;
                time.innerHTML = date
                console.log(date);
                resolve(date);
            }
        };
    });
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
