

 let zipcode = document.querySelector("#EntityFormControl_346be0c67d47ed11bba3002248627c71_EntityFormView > div.tab.clearfix > div > div > fieldset > table > tbody > tr:nth-child(4) > td.clearfix.cell.text.form-control-cell > div.control");
  zipcode.insertAdjacentHTML('beforeend', '<button type="button" id="searchBtn">郵便番号検索</button>');
  zipcode.insertAdjacentHTML('beforeend', '<span id="error"></span>');


  let search = document.querySelector("#searchBtn");
  search.addEventListener('click', () => {
    let api = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=';
    let error = document.getElementById('error');
    let input = document.getElementById('crb66_postalcode');
    let address = document.getElementById('crb66_address');
    let param = input.value.replace("-", ""); 
    let url = api + param;
    fetchJsonp(url, {
        timeout: 10000, 
      })
      .then((response) => {
        error.textContent = ''; 
        return response.json();
      })
      .then((data) => {
        if (data.status === 400) { 
          error.textContent = data.message;
        } else if (data.results === null) {
          error.textContent = '郵便番号から住所が見つかりませんでした。';
        } else {
          address.value = data.results[0].address1 + data.results[0].address2 + data.results[0].address3;
        }
      })
      .catch((ex) => { //例外処理
        console.log(ex);
      });
  }, false);
