$(document).ready(function () {

  // 스크롤 화살표 클릭 시 #about 섹션으로 부드럽게 이동
  $('.scroll-arrow').on('click', function () {
    $('html, body').animate({
      scrollTop: $('#about').offset().top
    }, 800);
  });


  // 오프닝 애니메이션 + 이후 GNB 표시 제어
  window.onload = () => {
    const line = document.getElementById('centerLine');
    const left = document.getElementById('leftExpand');
    const right = document.getElementById('rightExpand');
    const wrapper = document.querySelector('.reveal-wrapper');

    // 1단계: 선 등장
    setTimeout(() => {
      line.style.opacity = '1';
    }, 200);

    // 2단계: 선 길어짐
    setTimeout(() => {
      line.style.height = '100%';
    }, 700);

    // 3단계: 좌우 열림
    setTimeout(() => {
      left.style.width = '50%';
      right.style.width = '50%';
    }, 1900);

    // 4단계: 콘텐츠 나타남 + 오프닝 제거
    setTimeout(() => {
      document.body.classList.add('show');
      wrapper.style.display = 'none';

      // GNB 초기 숨김
      $('.gnb').hide();

      // #home 섹션의 높이 계산
      const homeSectionHeight = $('#home').outerHeight();

      // 스크롤 감지
      $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();

        // #home 영역에서는 GNB 숨기고, 그 이후에는 표시
        if (scrollTop >= homeSectionHeight) {
          $('.gnb').fadeIn();
        } else {
          $('.gnb').fadeOut();
        }
      });
    }, 3500); // 오프닝 종료 시점
  };


  // 초기 로드 시 첫 번째 프로젝트 표시
  $('.project_list').first().addClass('active');


  //탭 메뉴 클릭 시 해당 프로젝트 표시
  $('.tab_menu li').on('click', function () {
    var index = $(this).index();

    $('.tab_menu li').removeClass('on');
    $(this).addClass('on');

    $('.project_list').removeClass('active');
    $('.project_list').eq(index).addClass('active');
  });


  // 각 구간 진입시 해당하는 메뉴 표시
  const $menuItems = $(".gnb li");
  const $sections = $("section");

  $(window).on("scroll", function () {
    let scrollPos = $(window).scrollTop() + ($(window).height() / 2);

    $sections.each(function (index) {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();

      if (scrollPos >= top && scrollPos < bottom) {
        $menuItems.removeClass("on");
        $menuItems.eq(index).addClass("on");
        return false; // each 반복 중단
      }
    });
  });

 // Concept View 클릭시 해당 모달 열기
    $('.con_view').click(function() {
        var modalId = $(this).data('modal');
        $('#' + modalId).fadeIn(300);

    });
    
    // 닫기 버튼 클릭시 모달 닫기
    $('.close').click(function() {
        $(this).closest('.modal').fadeOut(300);

    });
    
    // 모달 배경 클릭시 닫기
    $('.modal').click(function(e) {
        if ($(e.target).is('.modal')) {
            $(this).fadeOut(300);

        }
    });
    
    // ESC 키로 닫기
    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $('.modal').fadeOut(300);

        }
    });


});
