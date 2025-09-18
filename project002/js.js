$(document).ready(function () {
    // .main_btn 클릭 시 .main에 slide 클래스 토글
    $('.main_btn').click(function () {
        // 슬라이드 전환
        $('.main').addClass('slide');
    });

    // 뒤로 가기 버튼 클릭
    $('.main_btn_back').on('click', function () {
        // 다시 첫 번째 이미지로 돌아가기
        $('.main').removeClass('slide');
    });


    // 브랜드 소개 아래서 위로 등장효과 (스크롤마다 실행)
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

    // 컬러섹션 애니메이션 설정ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const $lineImage = $('#colorLineImage');
    const $lineWrapper = $('#colorLineWrapper');

    $(window).on('scroll', function () {
        const windowHeight = $(window).height();
        const elementTop = $lineWrapper.offset().top;
        const elementBottom = elementTop + $lineWrapper.outerHeight();

        // 뷰포트에서 50% 이상 보이는지 확인
        if (elementBottom >= $(window).scrollTop() + windowHeight / 2 && elementTop <= $(window).scrollTop() + windowHeight / 2) {
            if (!$lineImage.hasClass('color-expand-x')) {
                $lineImage.addClass('color-expand-x');
            }

            setTimeout(function () {
                if (!$lineImage.hasClass('color-expand-y')) {
                    $lineImage.addClass('color-expand-y');
                }
            }, 500); // 좌우 확장 시간과 동일
        } else {
            $lineImage.removeClass('color-expand-x color-expand-y');
        }
    });

    // 비디오부분 이미지 205장 마우스무브 설정
    let imgs = '';
    for (let a = 1; a <= 205; a++) {
        let padded = a.toString().padStart(3, '0');
        imgs += `<img src="img/video/cap/dyson_airwrap_${padded}.jpg" alt="">`;
    }
    $('.video').html(imgs);

    $('.video img').hide();
    $('.video img').eq(0).show();

    $('body').mousemove(function (e) {
        let x = e.pageX;
        let wid = $(window).width();
        let pic = Math.floor((x / wid) * 205);
        pic = Math.min(Math.max(pic, 0), 204); // 0 <= pic <= 204
        $('.video img').hide();
        $('.video img').eq(pic).show();
    });

    // 서브페이지 연결ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    $('.gnb li').eq(0).click(function (e) {
        e.preventDefault();
        $('#wrap').fadeOut();
        $('#sub01').fadeIn();
    });


    // 로그인 페이지 연결ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    $('.util li').eq(0).click(function (e) {
        e.preventDefault();

        // 메인 화면을 숨기고 로그인 페이지 표시
        $('#wrap').fadeOut(300, function () {
            // fadeOut()이 끝난 후에 로그인 페이지 노출
            $('#sub02').fadeIn(300);
        });
    });

    $('.util li').eq(1).click(function (e) {
        e.preventDefault();

        // 메인 화면을 숨기고 로그인 페이지를 표시
        $('#wrap').fadeOut(300, function () {
            // fadeOut()이 끝난 후에 로그인 페이지 노출
            $('#sub02').fadeIn(300);
        });
    });




    // logo 클릭 시 메인페이지로 돌아가기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    $('.logo').click(function () {
        $('#sub01').fadeOut();
        $('#wrap').fadeIn();
    });

    // 장바구니 나왔다 들어가기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    $('.icon').click(function () {
        $(this).parent('.shopping').toggleClass('on');
    });


    // 장바구니 닫기 (x 버튼 클릭 시)
    $('.cart-header .close-btn').click(function () {
        $('.shopping').removeClass('on');  // 장바구니 창을 닫는다.
        cartNum = 0;  // 장바구니 수량 초기화
        $(".icon span").text(cartNum);  // 아이콘의 수량도 초기화
    });

    // 장바구니 수치 올라가기
    let cartNum = 0;

    // 장바구니 항목 추가
    $('.add-to-cart').click(function (e) {
        e.preventDefault();
        const productName = $(this).data('product-name');
        const productPrice = $(this).data('product-price');
        const productId = $(this).data('product-id');
        addItemToCart(productName, productPrice, productId);
    });

    // 장바구니 항목 추가 함수
    function addItemToCart(name, price, id) {
        const tableBody = $(".cart-table tbody");
        const newItem = `
            <tr data-product-id="${id}">
                <td>${name}</td>
                <td>${price}</td>
                <td><button class="remove-item">삭제</button></td>
            </tr>
        `;
        tableBody.append(newItem);
        updateCartCount();
        updateTotal();
    }

    // 장바구니 수량 갱신
    function updateCartCount() {
        const cartItemCount = $(".cart-table tbody tr").length;
        $(".icon span").text(cartItemCount);
    }

    // 장바구니 총 합계 갱신
    function updateTotal() {
        let total = 0;
        $(".cart-table tbody tr").each(function () {
            const price = $(this).find("td:nth-child(2)").text().replace("원", "").trim();
            total += parseInt(price);
        });
        $(".total-section .pri").text("총 합계금액 " + total);
    }

    // 장바구니 항목 삭제
    $(document).on('click', '.remove-item', function () {
        $(this).closest('tr').remove();
        updateCartCount();
        updateTotal();
    });

    // 전체삭제 버튼 클릭 시 장바구니 초기화
    $(".btn-delete").click(function () {
        $(".cart-table tbody").empty();
        updateCartCount();
        updateTotal();
    });

    // 결제하기 버튼 클릭 시
    $(".btn-pay").click(function () {
        $("#sub02").show(); // 로그인 페이지로 이동
    });

    $(".btn-pay").click(function () {
        $("#sub02").fadeIn();
        $("body").css("overflow", "hidden"); // 스크롤 방지
    });

    // 로그인창의 로고클릭시 메인으로 이동
    $(".login_logo").click(function () {
        window.location.href = "index.html";
    });



    // 탑버튼 설정ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#topBtn').fadeIn();
        } else {
            $('#topBtn').fadeOut();
        }
    });

    $('#topBtn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });





    // 이벤트 섹션 설정ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    // 스크롤 시 애니메이션 실행
    function animateOnScroll() {
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();

        //화면에 들어오면 애니메이션 시작
        $('.event_01, .event_02, .event_03').each(function () {
            var elementOffset = $(this).offset().top;

            // 요소가 화면에 50% 이상 보일 때 애니메이션 실행
            if (scrollTop + windowHeight * 0.5 > elementOffset) {
                // 애니메이션 시작
                $(this).addClass('show');
            }
        });
    }

    // 스크롤 시 애니메이션 실행
    $(window).on('scroll', function () {
        animateOnScroll();
    });

    // 처음 애니메이션 실행
    animateOnScroll();


    // 네이버 로그인 연동
var naver_id_login = new naver_id_login("XN7o8u2SfR4iAdSpZGPj", "YOUR_CALLBACK_URL");
var state = naver_id_login.getUniqState();
naver_id_login.setButton("green", 1, 60);
naver_id_login.setDomain("YOUR_SERVICE_URL");
naver_id_login.setState(state);
naver_id_login.setPopup();
naver_id_login.init_naver_id_login();




});
