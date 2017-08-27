window.onload = function() {
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

function $(ele_str) {
    return document.getElementById(ele_str) || document.getElementsByClassName(ele_str);
}