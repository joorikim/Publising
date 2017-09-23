var buttonClassName = 'scroll-trigger';var navClassName = 'header';function getTargetClassElement(element, className) {    var parentElement = null;    while(element.parentElement) {        if(twCom.fn.hasClass(element, className)) {            parentElement = element;            break;        }        element = element.parentElement;    }    return parentElement;}//offsetTop 구하는 함수 offsetParent 포함function getOffsetTop( el ) {    var offsetLeft = 0;    do {        if ( !isNaN( el.offsetTop ) ) {            offsetLeft += el.offsetTop;        }    } while( el = el.offsetParent );    return offsetLeft;}window.addEventListener('click', function (e) {    var target = e.srcElement || e.target;    target = getTargetClassElement(target, buttonClassName);    if(!target) return false;    var id = target.getAttribute('data-target') || '';    var navElement = getTargetClassElement(target, navClassName);    var eventElement = document.getElementById(id);    if(!navElement) {        var windowWidth = window.innerWidth;        if(windowWidth >= 1000) {            navElement = document.querySelector('.tw-navbar');        }else {            navElement = document.querySelector('.mobile-header');        }    }    if(eventElement && navElement) {        var navHeight = navElement.offsetHeight;        var eventTop = getOffsetTop(eventElement);        twCom.fn.scrollAnimate((eventTop - navHeight), null, 1500);    }});function getScrollTabPostion(targets, scrollY) {    var top = 0, bottom = 0, index = 0;    for(var i = 0, len = targets.length; i < len; i++) {        top = targets[i].offsetTop;        bottom = targets[i].offsetTop + targets[i].offsetHeight;        if(top <= scrollY &&  bottom > scrollY) {            index = i;            break;        }    }    return (index) * 100 + '%';}// 현재 scrollTop 을 반환하는 함수function position() {    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;}var mobileHeader = document.querySelector('.mobile-header');function imageCheck(imgList) {    var windowWidth = window.innerWidth;    var src = '';    for(var i = 0, len = imgList.length; i < len; i++) {        if (windowWidth >= 1000) {            src = imgList[i].getAttribute('data-pc-src');        } else {            src = imgList[i].getAttribute('data-mobile-src');        }        imgList[i].setAttribute('src', src);        src = '';    }}if(mobileHeader) {    var tabs = mobileHeader.querySelectorAll('.tab');    var activeLine = mobileHeader.querySelector('.active-line-container');    var tabsLen = tabs.length;    var targetArr = [];    var navHeight = mobileHeader.offsetHeight;    for(var i = 0; i < tabsLen; i++) {        var targetElement = document.querySelector('#'+ tabs[i].getAttribute('data-target'));        if(targetElement) {            targetArr.push(targetElement);        }    }    var targetImages = document.querySelectorAll('.reload-img');    window.addEventListener('resize', function() {        navHeight = mobileHeader.offsetHeight;        imageCheck(targetImages);    });    imageCheck(targetImages);    var isIntab = false;    var scrollY = 0, targetOffsetTop = 0, targetLastOffsetTop = 0;    function scrollEvent() {            if( !(tabsLen > 0 && navHeight > 0 && activeLine) ) return false;            scrollY = window.scrollY;            targetOffsetTop = getOffsetTop(targetArr[0]) - navHeight;            targetLastOffsetTop = (getOffsetTop(targetArr[targetArr.length - 1]) + targetArr[targetArr.length - 1].offsetHeight) - navHeight;            if( (scrollY >= targetOffsetTop && scrollY <= targetLastOffsetTop) && !isIntab) {                activeLine.style['opacity'] = 1;                isIntab = true;            }else if( (scrollY < targetOffsetTop || scrollY > targetLastOffsetTop) && isIntab ){                activeLine.style['opacity'] = 0;                isIntab = false;            }            if(isIntab) {                activeLine.style['transform'] = 'translateX(' + getScrollTabPostion(targetArr, (position() + navHeight)) +')' ;            }    }    window.addEventListener('scroll',scrollEvent);    scrollEvent();}