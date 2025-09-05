$(document).ready(function () {



    $('.main_btn').click(function () {
        $('.main').toggleClass('slide');
    });



  // 앞으로 가기 버튼 클릭

        // 뒤로 가기 버튼 클릭
        $('.main_btn_back').on('click', function () {
            $('.main').removeClass('slide');
        });












    // 브랜드 소개 아래서 위로 등장효과 (일회만 실행할 경우) ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    // const items = document.querySelectorAll(".brand ul li");

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add("visible");
    //             observer.unobserve(entry.target); // 요소 한 번만 실행하고 감지 종료
    //         }
    //     });
    // }, {
    //     threshold: 0.1
    // });

    // items.forEach((item, index) => {
    //     item.style.transitionDelay = `${index * 0.3}s`;
    //     observer.observe(item);
    // }); 


    // 브랜드 소개 아래서 위로 등장효과 (스크롤마다 실행할 경우 ) ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const $items = $(".brand ul li");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = $(entry.target);

            if (entry.isIntersecting) {
                const index = $items.index($target);
                $target.css("transition-delay", `${index * 0.3}s`);
                $target.addClass("visible");
            } else {
                $target.removeClass("visible");
                $target.css("transition-delay", "0s");
            }
        });
    }, {
        threshold: 0.1
    });

    $items.each(function () {
        observer.observe(this);
    });









    // 비디오부분 이미지 205장 마우스무브 설정ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


    let imgs = '';

    // 1부터 205까지 반복
    for (let a = 1; a <= 205; a++) {
        let padded = a.toString().padStart(3, '0'); // 3자리수로 맞추기
        imgs += `<img src="img/video/cap/dyson_airwrap_${padded}.jpg" alt="">`;
    }

    // 이미지들을 .video 섹션에 삽입
    $('.video').html(imgs);

    // 처음엔 첫 번째 이미지만 보이기
    $('.video img').hide();
    $('.video img').eq(0).show();

    // 마우스 움직이면 이미지 변경
    $('body').mousemove(function (e) {
        let x = e.pageX;
        let wid = $(window).width();

        let pic = Math.floor((x / wid) * 205);

        if (pic >= 205) pic = 204;
        if (pic < 0) pic = 0;

        $('.video img').hide();
        $('.video img').eq(pic).show();
    });





    // 서브페이지 연결하기.

    $('.gnb li').eq(0).click(function (e) {

        e.preventDefault();
        $('#wrap').fadeOut()
        $('#sub01').fadeIn()

    }); 



    // 로그인페이지 연결하기
    $('.util li').eq(0).click(function (e) {

        e.preventDefault();
        $('#wrap').fadeOut()
        $('#sub02').fadeIn()

    });

    $('.util li').eq(1).click(function (e) {

        e.preventDefault();
        $('#wrap').fadeOut()
        $('#sub02').fadeIn()

    });




    // logo를 클릭했을 때, 메인페이지 나타나기

    $('.logo').click(function () {
        $('#sub01').fadeOut()
        $('#wrap').fadeIn()

    });


    // 장바구니 나왔다들어가기.
    // 하나의 요소당 이벤트는 1번?1개만 걸수있음.
    let click = 0
    $('.icon').click(function () {
        click++;
        if (click == 2) click = 0;
        console.log(click)

        if (click == 1) {
            $(this).parent('.shopping').addClass('on')
        }
        else {
            $(this).parent('.shopping').removeClass('on')

        }
        // 이 조건은 신호등과 같다. 기계들이 돌아가는것에는 코드들이 들어간다.
        // 빨간불일떄 누르면 초록불이되라 등.

    });


    // 장바구니의 수치 올라가기
    let cartNum = 0;

    $('.cart p').click(function (e) {
        e.preventDefault()
        cartNum++;
        $('.icon span').text(cartNum)



    });



    // 탑버튼 설정ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {  // 200px 이상 스크롤 시 버튼 보임
            $('#topBtn').fadeIn();
        } else {
            $('#topBtn').fadeOut();
        }
    });

    $('#topBtn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 500);  // 0.5초 동안 맨 위로 부드럽게 스크롤
    });












})