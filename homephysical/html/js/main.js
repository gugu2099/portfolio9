$(function(){
  var swiper = new Swiper(".mySwiper", {
    autoplay: {
      delay: 4000
    },
    speed : 1500,
    loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    

  $('#test').on('keyup', function(e){
    if(e.keyCode == 13){
        e.preventDefault();
        $('#btn').click();
    }
  });

  $('#test').focus(function(){
    $(this).attr('placeholder','')
  });
  $('#test').blur(function(){
    $(this).attr('placeholder','원하시는 상품을 검색하세요');
  });


  $('#btn').click(function(){
    if($('#test').val() != ''){
        let data = $('#test').val();
    }else{
        alert('상품명을 검색해주세요');
        $('#test').focus();
        $('.wrap1').html('');
    }
  });


  //스크롤바 시작
  $(window).on('scroll' , function(){
    let scrollY = window.scrollY;

    let totalY = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let percent = (scrollY / totalY) * 100;

    $('.p-bar').css('width', percent + '%');
  });

  $(window).on('scroll',function(){
    let scrollHeight2 = window.scrollY;
    
    let thisHeight2 = document.documentElement.scrollHeight;
    
    let clHeight2 = document.querySelector('html').clientHeight;

    if(scrollHeight2 + clHeight2 > thisHeight2 -1){
        // alert('좋은 하루 되세요')
    }

  });
  //스크롤바 끝

  // Top시작

  $('#top').click(function(e){
    e.preventDefault();
    $('html, body').animate({'scrollTop': 0}, 500); //스크롤 넘으면 버튼이 보여짐
  });

  
  $(window).scroll(function(){
    if($(window).scrollTop() > 500) { //250 넘으면 버튼이 보여짐
      $('#top').removeClass('DisN');
    }else {
      $('#top').addClass('DisN');
    }
  });
  
  // Top끝

  // AOS, WOW 시작

  AOS.init();
  new WOW().init();
  
  // AOS, WOW 끝

});


