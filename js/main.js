$(document).ready(function() {
  let animationNumbers = document.querySelectorAll('.animation-numbers')
  function animPie() {
    let circularProgress = $(".pie__item .interest")
    let progressStartValue = 0,    
    color = circularProgress.parent().parent().hasClass("pie__block-blue")?"var(--blue)":"var(--red)"
    speed = 30;
    let progress = setInterval(() => {
      progressStartValue++;
      $(circularProgress).each(function() {
        let progressValue = $(this).children()
        let progressEndValue = $(progressValue).attr('value')
        if(progressStartValue <= progressEndValue){
          progressValue.children().text(progressStartValue);
          $(this).css('background',`conic-gradient(${color} ${progressStartValue * 3.6}deg, #ededed 0deg)`)
        }
      })
      if(progressStartValue==100){
        clearInterval(progress);
      }
    }, speed);
  }
  function animValue(item) {
    for (let i = 0; i < item.childNodes.length; i++) {
      let elem = item.childNodes[i];
      if(elem.childNodes.length==0){
        continue
      }
      if(elem.classList.contains('interest')){
        let endValue = elem.childNodes[1].getAttribute("value");
        let speed = 3000/endValue;
        let text = elem.childNodes[1].childNodes[0];
        let progressStartValue = 0;
        let progress = setInterval(() => {
          progressStartValue++;
          if(progressStartValue <= endValue){
            text.textContent = `${progressStartValue}`
          }else{
            clearInterval(progress);
          }
        }, speed);
      }
    }
  }
  if (animationNumbers.length>0) {
    window.addEventListener("scroll", animOnScroll)
    function animOnScroll() {
      for (let index = 0; index < animationNumbers.length; index++) {
        const animItem = animationNumbers[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart=2;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if((scrollY > animItemOffset - animItemPoint)&& scrollY <animItemOffset + animItemHeight){
          if(!animItem.classList.contains('anim')){
            if(animItem.classList.contains('pie__block')){
              animPie(animItem)
            }else{
              for (let i = 0; i < animItem.childNodes.length; i++) {
                animValue(animItem.childNodes[i])
              }
            }
          }
          animItem.classList.add('anim');
        }
      }
    }
    function offset(el) {
      const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
  }


  $(".menu-burger").click(function () {
    if($('body').hasClass("menu-open")){
      $('body').removeClass("menu-open")
    }else{
      $('body').addClass("menu-open")
    }
  })
  $(".dropdown-menu .close").click(function () {
    if($('body').hasClass("menu-open")){
      $('body').removeClass("menu-open")
    }else{
      $('body').addClass("menu-open")
    }
  })

  let backgroundGalery__imgItem = $(".background-galery__img-item")
  $('.background-galery__img-list').css('width',`${100*backgroundGalery__imgItem.length}vw`)
  $.each(backgroundGalery__imgItem,function(index,value){
    let backgroundIimage=$(value).children().attr('src');
    $(value).css('background-image',`url(${backgroundIimage})`);
  });

  // if($('.scroll__list-block')){
  //   let count = $('.scroll__list-block').children().length;
  //   $('.scroll__list-block').css('width',`calc(${120*count}%`)
  // }
})
