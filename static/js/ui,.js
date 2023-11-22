var titleControl = L.control({ position: "topleft" });

titleControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "title-control");
  this.ele.id = "title";
  this.ele.className = "title-Logo";
  this.ele.innerHTML = "<img src='../static/logo/logo2.png' width='20%' height='auto' alt='title_logo'>";
  return this.ele;
};

titleControl.addTo(map);



//検索窓
var searchBarControl = L.control({ position: "topright" });

searchBarControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "search-bar-control");
  this.ele.id = "search-bar";
  this.ele.className = "search-bar";
  this.ele.innerHTML = "<form id='search-form' action=''><input id='sbox' type='text' placeholder='検索したいキーワードを入力' /><button id='sbtn' type='submit'><i class='fas fa-search'></i></button></form>";
  this.ele.style.zIndex = 999;
  return this.ele;
};

searchBarControl.addTo(map);

//サークルメニュー
var circularMenuControl = L.control({ position: "topright" });

circularMenuControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "circular-menu-control");
  this.ele.id = "circularMenu";
  this.ele.className = "circular-menu";
  this.ele.style.zIndex = 1000;

  var floatingBtn = L.DomUtil.create("a", "floating-btn", this.ele);
  floatingBtn.onclick = function () {
    document.getElementById('circularMenu').classList.toggle('active');
  };

  var customIcon = L.DomUtil.create("button", "", floatingBtn);
  customIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';

  var itemsWrapper = L.DomUtil.create("menu", "items-wrapper", this.ele);

  var menuItem1 = L.DomUtil.create("a", "menu-item", itemsWrapper);
  menuItem1.onclick = function () {
    opencloseSidebar1();
    draggoff();
  };
  menuItem1.innerHTML = '<button><i class="fa-solid fa-plus"></i></button>';

  var menuItem2 = L.DomUtil.create("a", "menu-item", itemsWrapper);
  menuItem2.onclick = function () {
    opencloseSidebar2();
  };
  menuItem2.innerHTML = '<button><i class="fa-solid fa-filter"></i></button>';

  var menuItem3 = L.DomUtil.create("a", "menu-item", itemsWrapper);
  menuItem3.innerHTML = '<button><i class="fa-solid fa-question"></i></button>';

  return this.ele;
};

circularMenuControl.addTo(map);

// サイドバーコントロール
var sidebarControl = L.control({ position: "topright" });

sidebarControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "sidebar-control");
  this.ele.id = "sidebar1";
  this.ele.className = "sidebar";
  this.ele.style.zIndex = 1500;
  this.ele.innerHTML = `
    <a class="closebtn" onclick="opencloseSidebar1()">×</a>
    <form method="POST" enctype="multipart/form-data" onsubmit="return requiredRadio()">
    <p><span class="required">*</span>は必須項目です</p>
    <p>場所名 <span class="required">*</span></p>
      <div class="cp_iptxt">
        <i class="fa-solid fa-location-dot"></i><input class="sidebox" type="text" name="location" placeholder="場所名を入力してね！" />
      </div>
      <p>コンテンツ <span class="required">*</span></p>
      <div class="cp_iptxt">
        <i class="fa-solid fa-tag"></i><input class="sidebox" type="text" name="content" placeholder="コンテンツの名前を入力してね！" />
      </div>
      <p>位置情報付きの写真 <span class="required">*</span></p>
      <div id="calculator">
        <div class="element" data-element="file_upload01" data-conditionalelement="undefined"
          data-conditionalelementvalue="undefined"><label style="color:#333333">file_upload01</label>
          <input id="fileinput" class="calc-prop" data-identifier="file_upload01" data-isrequired="false" type="file" name="file" accept=".jpg">
        </div>
      </div>
      <p>ピンの種類 <span class="required">*</span></p>
      <div class="sideimg">
        <input id="pinType1" type="radio" value="oshikey.png" name="pinType">
        <label for="pinType1"><img src="../static/ico/oshikey.png"></label>
        <input id="pinType2" type="radio" value="goods.png" name="pinType">
        <label for="pinType2"><img src="../static/ico/goods.png"></label>
        <input id="pinType3" type="radio" value="place.png" name="pinType">
        <label for="pinType3"><img src="../static/ico/place.png"></label>
      </div>
      <p>タグ <span class="required">*</span></p>
      <div class="sideimg">
        <input id="tagType1" type="radio" value="anime.png" name="tagType">
        <label for="tagType1"><img src="../static/ico/anime.png" alt="アニメ"></label>

        <input id="tagType2" type="radio" value="manga.png" name="tagType">
        <label for="tagType2"><img src="../static/ico/manga.png" alt="漫画"></label>

        <input id="tagType3" type="radio" value="novel.png" name="tagType">
        <label for="tagType3"><img src="../static/ico/novel.png" alt="小説"></label>

        <input id="tagType4" type="radio" value="film.png" name="tagType">
        <label for="tagType4"><img src="../static/ico/film.png" alt="映画"></label>

        <input id="tagType5" type="radio" value="drama.png" name="tagType">
        <label for="tagType5"><img src="../static/ico/drama.png" alt="ドラマ"></label>

        <input id="tagType6" type="radio" value="other.png" name="tagType">
        <label for="tagType6"><img src="../static/ico/other.png" alt="その他"></label>

      </div>
      <div class="remarks">
        <p>備考</p>
        <textarea type="text" name="remarks" placeholder="例：3月末に撤去予定です"></textarea>
        <input type="submit" value="送信">
      </div>
    </form>`;

  return this.ele;
};

sidebarControl.addTo(map);

// 絞り込みサイドバーコントロール
var filterSidebarControl = L.control({ position: "topright" });

filterSidebarControl.onAdd = function (map) {
  this.ele = L.DomUtil.create("div", "filter-sidebar-control");
  this.ele.id = "sidebar2";
  this.ele.className = "sidebar";
  this.ele.innerHTML = `
    <a class="closebtn" onclick="opencloseSidebar2()">×</a>
    <p>ピンの種類</p>
    <div class="sideimg">
      <img src="../static/ico/test.png" alt="オシキー" />
      <img src="../static/ico/test.png" alt="グッズ" />
      <img src="../static/ico/test.png" alt="聖地" />
    </div>
    <p>タグ（複数選択可）</p>
    <div class="sideimg">
      <img src="../static/ico/test.png" alt="アニメ" />
      <img src="../static/ico/test.png" alt="漫画" />
      <img src="../static/ico/test.png" alt="小説" />
      <img src="../static/ico/test.png" alt="映画" />
      <img src="../static/ico/test.png" alt="ドラマ" />
      <img src="../static/ico/test.png" alt="その他" />
    </div>
    <div class="remarks">
      <img src="../static/ico/test.png" alt="絞り込み" />
    </div>`;

  this.ele.style.zIndex = 1501;

  return this.ele;
};

filterSidebarControl.addTo(map);



//以下関数
function opencloseSidebar1() {
  $("#sidebar1").slideToggle("");
}

function opencloseSidebar2() {
  $("#sidebar2").slideToggle("");
}

$(function () {
  $('#calculator .element input[type=number]').change(function () {
    if ($('#calculator .element input[type=number]').val() == 0) {
      $('.section-product-detail__btn-cart').addClass('active');
    } else {
      $('.section-product-detail__btn-cart').removeClass('active');
    }
  });
});

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

$('input').change(function () {
  var file01 = $('#fileinput[data-identifier="file_upload01"]')[0].files[0];
  var file02 = $('#fileinput[data-identifier="file_upload02"]')[0].files[0];
  $('#fileName01').html(file01.name + ' (' + bytesToSize(file01.size) + ')');
  $('#fileName02').html(file02.name + ' (' + bytesToSize(file02.size) + ')');
});

//サイドバーの各要素を選択必須にする
function requiredRadio() {
  var locationInput = document.getElementsByName("location")[0];
  var contentInput = document.getElementsByName("content")[0];
  var fileInput = document.getElementById("fileinput");
  var pinTypes = document.getElementsByName("pinType");
  var tagTypes = document.getElementsByName("tagType");

  var pinSelected = false;
  var tagSelected = false;

  if (locationInput.value.trim() === "") {//無入力・空白の場合
    swal({
      title: "場所名を入力してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }

  if (contentInput.value.trim() === "") {//無入力・空白の場合
    swal({
      title: "コンテンツの名前を入力してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }

  if (!fileInput.files || fileInput.files.length === 0) {
    swal({
      title: "位置情報付きの画像を選択してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }
  //ラジオボタンの選択確認
  for (var i = 0; i < pinTypes.length; i++) {
    if (pinTypes[i].checked) {
      pinSelected = true;
      break;
    }
  }

  for (var i = 0; i < tagTypes.length; i++) {
    if (tagTypes[i].checked) {
      tagSelected = true;
      break;
    }
  }

  if (!pinSelected) {
    swal({
      title: "ピンの種類を選択してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }

  if (!tagSelected) {
    swal({
      title: "タグを選択してね！",
      icon: "error",
      button: "OK",
    });
    return false;
  }

  return true;
}

//画像が入力された際に、位置情報の有無を確認する
//function gpsCheck(input) {
// 位置情報の取得
//var file = input.files[0];
//var reader = new FileReader();

//reader.onload = function (e) {
//var exif = EXIF.readFromBinaryFile(new BinaryFile(e.target.result));
//var hasLocationInfo = exif && exif.GPSLatitude && exif.GPSLongitude;

//if (!hasLocationInfo) {
//swal({
//title: "画像に位置情報がありません！",
//icon: "error",
//button: "OK",
//});
//}
//};
//}
