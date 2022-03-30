export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
  }

  export function tokenPriceAVAX() {
    try{
    let url = "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd";
    return new Promise((resolve) => { 
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        try{
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
              let priceJson = JSON.parse(xmlHttp.responseText)
              priceJson = +priceJson['avalanche-2']['usd'];
              resolve(priceJson)
          }
        }catch(err){
          console.log(err);
          resolve(0)
        }
      }
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    })
  }catch(err){
    console.log(err);
    return 0;
  }
  }