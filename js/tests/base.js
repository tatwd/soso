window.onload = function() {
    
    // menu click event begin

    menuMobilePlay();

    // menu click event end
    // -----------------------
    // caro-play begin
    
    caroPlay();

    // caro-play end
    // --------------------------
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
        stopBubble(ev);
  
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

// caroPlay

function caroPlay() {
    var caro = $('soso-caro')
    var caroItem  = caro[0].getElementsByClassName('item'); 
    var caroCtrls = $('caro-ctrl');
    var caroIndex = $('caro-index')[0].getElementsByClassName('index'); 
    var curent = 0;

    // 淡入 
    function fadeIn() {
        caroItem[curent].classList.add('active');
        caroIndex[curent].classList.add('active');
    }
    // 淡出
    function fadeOut() {
        caroItem[curent].classList.remove('active');
        caroIndex[curent].classList.remove('active');
    }

    // 前进
    function go() {
        fadeOut();

        curent++;
        if(curent >= caroItem.length) {
            curent = 0;
        }

        fadeIn();
    }

    // 返回
    function bk() {
        fadeOut();

        if(curent == 0) {
            curent = caroItem.length;
        }
        curent--;

        fadeIn();
    }

    var inter = setInterval(go, 4000);

    // 鼠标移入
    caro[0].onmouseover = function(ev) {
        stopBubble(ev)

        clearInterval(inter);

        for (var i = caroCtrls.length - 1; i >= 0; i--) {
            caroCtrls[i].style.display = 'block';
        }
    };
    
    // 鼠标移出
    caro[0].onmouseout = function(ev) {
        stopBubble(ev);

        inter = setInterval(go, 2000);

        for (var i = caroCtrls.length - 1; i >= 0; i--) {
            caroCtrls[i].style.display = 'none';
        }
    };

    caroCtrls[0].onclick = function(ev) {
        stopBubble(ev);

        bk();
    };

    caroCtrls[1].onclick = function(ev) {
        stopBubble(ev);

        go();
    };
}

// backTopPlay

function backTopPlay() {
    var bkTop = $('soso-backtop');
    var valId = null;

    // 监听滑条移动
    window.onscroll = function(){
        var scrollTop = getScrollTop();
        
        if(scrollTop > 50) {
            bkTop[0].style.display = 'block';
        }else{
            bkTop[0].style.display = 'none';
        }
    };
    
    bkTop[0].onclick = function(ev){
        stopBubble(ev);

        var scrollTop = getScrollTop();

        //创建定时器返回顶部
        valId = setInterval(function() {
            scrollTop -= 150;

            window.scrollTo(0, scrollTop);

            if(scrollTop <= 0) {
                clearInterval(valId);
            }
        },30);
    };
}

// get scrollTop

function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}

// stopBubble

function stopBubble(ev) {
    ev = ev || window.event;
    ev.cancelBubble = true;
}

// get element

function $(ele_str) {
    return document.getElementById(ele_str) || document.getElementsByClassName(ele_str);
}