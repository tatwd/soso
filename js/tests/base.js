window.onload = function() {
    
    // menu click event begin

    menuMobilePlay();

    // menu click event end
    // -----------------------
    // caro-ctrl event begin
     
    caroCtrlPlay();

    // caro-ctrl event end
    // -----------------------
    // back top begin
    
    backTopPlay();

    // back top end
}

// menuMobilePlay

function menuMobilePlay() {
    var menuMobile = $('menu-mobile');
    var menuNormal = $('menu-normal');
    var isClicked  = false;

    menuMobile[0].onclick = function(ev) {
        ev = ev || window.event;
        ev.cancelBubble = true;
  
        if(!isClicked) {
            menuNormal[0].style.display = 'block';
        } else {
            menuNormal[0].style.display = 'none';            
        }
        isClicked = !isClicked;
    }

    window.onresize = function () {
        if(this.innerWidth > 600 ) {
            menuNormal[0].style.display = 'block';
        } else if(!isClicked) {
            menuNormal[0].style.display = 'none';
        }
    }
}

// caroCtrlPlay

function caroCtrlPlay() {
    var caro = $('soso-caro');
    var caroCtrl = $('caro-ctrl');

    caro[0].onmouseover = function () {
        for (var i = caroCtrl.length - 1; i >= 0; i--) {
            caroCtrl[i].style.display = 'block';
        }
    };

    caro[0].onmouseout = function () {
        for (var i = caroCtrl.length - 1; i >= 0; i--) {
            caroCtrl[i].style.display = 'none';
        }
    };
}

// backTopPlay

function backTopPlay() {
    var bkTop = $('soso-backtop');
    var valId = null;

    // 监听滑条移动
    window.onscroll = function(){
        if(this.scrollY > this.innerHeight / 2){
            bkTop[0].style.display = 'block';
        }else{
            bkTop[0].style.display = 'none';
        }
    };
    
    bkTop[0].onclick = function(ev){
        ev = ev || window.event;
        ev.cancelBubble = true;

        var scX = window.scrollX;
        var scY = window.scrollY;

        valId = setInterval(function(){ //创建定时器返回顶部
            scY -= 150;
            window.scrollTo(scX,scY);
            if(scY <= 0){
                clearInterval(valId);
            }
        },30);
    };
}

// get element

function $(ele_str) {
    return document.getElementById(ele_str) || document.getElementsByClassName(ele_str);
}