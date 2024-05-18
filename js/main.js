
$(window).scroll(function () {
	var scrollY = ($(window).scrollTop() / ($(document).height() - $(window).height()) * 100).toFixed(3);
	$(".progressBar").css({
	"width": scrollY + "%"
	});
});


//게시글 들어왔을때 nav+스크롤 진행 활성화
$(window).scroll(function () {
	let top = document.getElementById("top");
	let navHeight = $("#top").height();
	let thumHeight = $("#thum").height();
	let scrollY = $(window).scrollTop();

	if (scrollY > navHeight) {
		top.style.opacity = '0';
	} else {
		top.style.opacity = '1';
	}
	//스크롤 위치가 네비 높이랑 썸네일 높이 더한것보다 커지면 네비 나타나고 스크롤 진행바 나타내기
	if (scrollY > navHeight + thumHeight) {
		top.style.opacity = '1';
		top.style.position = 'fixed';
		top.style.backgroundColor = 'rgba(255, 255, 255, 0)';
	}
});

$(function(){
	$('#top_btn').click(function(e){
		e.preventDefault();
		$('html, body').animate({'scrollTop': 0}, 500);
	});

	$("#header .tabs").click(function(e){
		e.preventDefault();
		$("body").toggleClass("fixed");
		$(".total").toggleClass("active");
	});

	$(".total .close").click(function(e){
		e.preventDefault();
		$(".total").removeClass("active");
		$("body").removeClass("fixed");
	});

	const keytextString=[
		{
			en: "CREATE SEMANTIC PAGES",
			ko: "Create semantic pages that increase web accessibility"
		},
		{
			en: "JAVASCRIPT AND LIBRARIES",
			ko: "Using JavaScript implementations and libraries"
		},
		{
			en: "GIT SYSTEM USING GITHUB",
			ko: "Git system collaboration using GitHub"
		},
		{
			en: "USER INTERFACE USING JQUERY",
			ko: "User interface implementation using JQuery"
		}
	];

	let videoUrl=["particle1.mp4", "particle2.mp4", "particle3.mp4", "particle4.mp4"];
	let videoTotal=videoUrl.length;
	let videoN=0;
	let video=document.getElementById("my_video");
	video.muted=true;
	let svgOffset=29;

	function videoDimmed(){
		$(".media video").hide().css({opacity: 0});
		$(".media .keytext strong").text(keytextString[videoN].en);
		$(".media .keytext span").text(keytextString[videoN].ko);
		$(".media .keytext").removeClass("active");
		$(".media .controller").removeClass("active");
		$(".media .controller .count li").removeClass("active");

		$(".media video").show().animate({opacity: 1}, 300, function(){
			video.play();
			$(".media .keytext").addClass("active");
			$(".media .controller").addClass("active");
			$(".media .controller .count li").eq(videoN).addClass("active");
			$(".media .controller svg").css({left: svgOffset+(videoN*28)});
			$(".media .controller .num").html(`<span>${videoN+1}</span> / ${videoTotal}`);
		});
	}

	video.addEventListener("loadeddata", function(){
		videoDimmed();
	});

	video.addEventListener("ended", function(){
		if(videoN < videoTotal-1){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		video.pause();
		videoPath="video/"+videoUrl[videoN];
		$("#my_video").attr({src: videoPath});
	});

	$(".media .controller .prev").click(function(e){
		e.preventDefault();

		(videoN > 0) ? videoN-- : videoN=videoTotal-1;
		video.pause();
		videoPath="video/"+videoUrl[videoN];
		$("#my_video").attr({src: videoPath});
	});

	$("#page1 .media .controller li").click(function(e){
		e.preventDefault();
		videoN=$(this).index();
		video.pause();
		videoPath="video/"+videoUrl[videoN];
		$("#my_video").attr({src: videoPath});
	});

	$(".media .controller .next").click(function(e){
		e.preventDefault();

		(videoN < (videoTotal-1)) ? videoN++ : videoN=0;
		video.pause();
		videoPath="video/"+videoUrl[videoN];
		$("#my_video").attr({src: videoPath});
	});


	const linkArray=["#page1", "#page2", "#page3", "#footer"];
	let n=0;
	let wint;
	let pageN = 0;
	let pos = 0;



	$("#gnb li").click(function(e){
		e.preventDefault();
		n=$(this).index();

		let target=$(linkArray[n]);
		pos=target.offset().top;
		$("html").animate({scrollTop: pos}, 600);
	});

	$(".total li").click(function(e){
		e.preventDefault();

		$("body").removeClass("fixed");
		$(".total").removeClass("active");

		n=$(this).index();
		let target=$(linkArray[n]);
		pos=target.offset().top;

		setTimeout(function(){
			$("html").animate({scrollTop: pos}, 600);
		}, 1000);
	});

	$(window).scroll(function(){
		
		if($(window).scrollTop() > $()) {
			$("#header").addClass("dark");
		}else {
			$("#header").removeClass("dark");
		}
	});

	function scrollInteraction(t){
		if(t < $("#page1").offset().top){
			n=0;
		}
		else if(t < $("#page2").offset().top){
			n=1;
		}
		else if(t < $("#page3").offset().top){
			n=2;
		}
		else if(t < $("#footer").offset().top){
			n=3;

			if($(window).height()+t == $(document).height()){
				n=4;
			}
		}
		else{
			n=4;
		}

		// topBtn
		//250 넘으면 버튼이 보여짐
		if(t > 250) { 
			$('#top_btn').addClass('active');
			$(".top").addClass("active");
		}else {
			$('#top_btn').removeClass('active');
			$(".top").removeClass("active");
		}

		if($(window).scrollTop() > $("#page2").offset().top-20) {
			$("#header").addClass("dark");
		}else {
			$("#header").removeClass("dark");
		}
	}

	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true, //loop, once
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		},
		scroll: {
			element: window,
			callback: (offset, dir) => scrollInteraction(offset.y)
		}
	});

	trigger.add("section[id^=page], #footer");

	//
	let tabArray=[];
	let tab1=0;
	let tab2=0;
	let tabLeft=30;

	$(window).resize(function(){
		tabLeft=$("#page3 .category .list").offset().left;
	});

	$(window).trigger("resize");

	$(window).scroll(function(){
		wint=$(window).scrollTop();

		if(wint > $("#page3 .top").offset().top+200){
			$("#page3 .category").addClass("fixed");
		}else{
			$("#page3 .category").removeClass("fixed");
		}
	});

	$("#page3 .category .list li").each(function(i){
		tabArray.push($(this).find("a").width());
	});

	function tabInteraction(){
		$("#page3 .category .line").css({
			left: $("#page3 .category .list li").eq(tab1).offset().left-tabLeft,
			width: tabArray[tab1]
		});
	};

	tabInteraction();

	$("#page3 .category .list li").hover(
		function(){
			tab1=$(this).index();
			tabInteraction();
		},
		function(){
			tab1=tab2;
			tabInteraction();
		}
	);
	$("#page3 .category .list li").click(function(e){
		e.preventDefault();
		tab2=$(this).index();
		let targety=$("#page3 > .content > ul > li").eq(tab2).offset().top-165;

		$("html").animate({scrollTop: targety}, 600);
	});
});
