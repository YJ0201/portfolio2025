$(document).ready(function() {
    // 자동 넘김 간격: 20초 (20000ms)로 변경됨
    const AUTO_SLIDE_INTERVAL = 20000; 


    // 메뉴 풍선 애니메이션ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    const $menuItems = $('.header .gnb .menu ul li:not(.logo)');
    
    $menuItems.on('mouseenter', function() {
        const $balloons = $(this).find('.balloon');
        
        $balloons.eq(0).css('animation', 'fly1 3s ease-out 0.01s forwards');
        $balloons.eq(1).css('animation', 'fly2 3.2s ease-out 0.5s forwards');
        $balloons.eq(2).css('animation', 'fly3 2.8s ease-out 0.7s forwards');
        $balloons.eq(3).css('animation', 'fly4 3.5s ease-out 1.0s forwards');
        $balloons.eq(4).css('animation', 'fly5 2.9s ease-out 1.2s forwards');
    }).on('mouseleave', function() {
        $(this).find('.balloon').css('animation', '');
    });


    // cast 설정 /스크롤 화살표 클릭 시 다음 섹션으로 이동ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const $scrollArrow = $(".scroll-arrow");
    
    if ($scrollArrow.length) {
        $scrollArrow.on("click", function() {
            const $nextSection = $("#Home").next();
            if ($nextSection.length) {
                $('html, body').animate({
                    scrollTop: $nextSection.offset().top
                }, 800);
            }
        });
    }

    
    // Cast 페이지 전환 기능 (자동 슬라이드 추가)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    const $pages = $('#Cast .main_txt ul li');
    const $prevBtn = $('#prevBtn');
    const $nextBtn = $('#nextBtn');
    const totalPages = 5;
    let currentPage = 0;
    let autoSlideTimer; // 자동 슬라이드 타이머 변수

    // 초기 버튼 상태 업데이트ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    function updateButtons() {
        $prevBtn.prop('disabled', currentPage === 0);
        $nextBtn.prop('disabled', currentPage === totalPages - 1);
        
        // 마지막 페이지에서 자동 슬라이드 중지ㅡㅡㅡㅡ
        if (currentPage === totalPages - 1) {
            clearInterval(autoSlideTimer);
        }
    }
    
    // 다음 페이지로 이동 (자동/수동 공통 로직)
    function changePage(direction) {
        let newPage = currentPage + direction;

        if (newPage >= 0 && newPage < totalPages) {
            // 현재 페이지 페이드아웃
            $pages.eq(currentPage).css('opacity', '0');
            
            setTimeout(function() {
                // on 클래스 전환과 새로운 페이지 표시
                $pages.eq(currentPage).removeClass('on');
                currentPage = newPage;
                $pages.eq(currentPage).addClass('on');
                
                // 새 페이지 페이드인
                setTimeout(function() {
                    $pages.eq(currentPage).css('opacity', '1');
                }, 50);

                updateButtons();
            }, 300);
            
            return true; // 페이지 전환 성공
        }
        return false; // 페이지 전환 실패 (마지막 페이지 등)
    }

    // 자동 슬라이드 함수
    function startAutoSlide() {
        // 기존 타이머 있다면 클리어
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
        }
        
        // 새로운 타이머 설정
        autoSlideTimer = setInterval(function() {
            // 마지막 페이지가 아니면 다음 페이지로 이동
            if (currentPage < totalPages - 1) {
                changePage(1); // 다음 페이지로 이동
            } else {
                // 마지막 페이지 도달 시 타이머 중지
                clearInterval(autoSlideTimer);
            }
        }, AUTO_SLIDE_INTERVAL); // 👈 20초 적용
    }

    // 이벤트 바인딩
    if ($pages.length > 0 && $prevBtn.length && $nextBtn.length) {
        
        // 버튼 클릭 시 수동 전환 및 타이머 재시작
        $nextBtn.on('click', function() {
            if(changePage(1)) {
                startAutoSlide(); // 페이지 넘긴 후 타이머 재시작
            }
        });
        
        $prevBtn.on('click', function() {
            if(changePage(-1)) {
                startAutoSlide(); // 페이지 넘긴 후 타이머 재시작
            }
        });

        // 초기 상태 설정
        updateButtons();
        
        // 자동 슬라이드 시작
        startAutoSlide();
    }
});