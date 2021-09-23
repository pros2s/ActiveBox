$(function(){
  const nav = $("#navigation")
  const burger = $("#burger")
  const header = $("#header")
  const intro = $("#intro")
  let introH = intro.innerHeight()
  let scrollpos = $(window).scrollTop()

  const upButton = $("#upBut")
  
  // Fixed header
  const emergence =  () => {
    scrollpos > introH ? header.addClass("fixed") : header.removeClass("fixed")
    scrollpos > 613 ? upButton.addClass("toUp") : upButton.removeClass("toUp")
  }

  $(window).on("scroll load resize", function() {
    introH = intro.innerHeight()

    nav.removeClass("Menu")

    scrollpos = $(this).scrollTop()
    emergence()
  });


  // Smooth scroll
  $("[data-scroll]").on("click", function (event) {
    event.preventDefault()
    let elementID = $(this).data("scroll");
    let elementPosition = $(elementID).offset().top

    nav.removeClass("Menu")

    $("html, body").animate({
      scrollTop: elementPosition - 65
    }, 500);
  });

  // Smooth scroll to the top
  $("[data-up]").on("click", () => {
    $("html, body").animate({
      scrollTop: 0
    }, 500);
  });

  // Open burger menu on phones
  burger.on("click", function(event) {
    event.preventDefault()
    
    nav.toggleClass("Menu")
  })

  // Reviws slider (https://kenwheeler.github.io/slick/)
  let slider = $("#reviewsSlider")

  slider.slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true,
  });
});