var bodyDir = $("body").css("direction");
console.log(bodyDir);
var dirAr;
if (bodyDir == "rtl") {
  dirAr = true;
} else {
  dirAr = false;
}



$(document).ready(function () {
  // إزالة الـ Loader بعد تحميل الموقع
  window.addEventListener("load", function () {
    setTimeout(() => {
      document.getElementById('lottie-loader').style.display = 'none';
    }, 1000); // تأخير 1 ثانية لإزالة الـ Loader
  });
  
  $("#filter").click(function () {
    $(".filter").toggleClass("filter-toggle");
  });
  $(".filter-header .btn-close").click(function () {
    $(".filter").toggleClass("filter-toggle");
  });

  $(".toggle-side-menu-classification").click(function () {
    $(".classification").toggleClass("show");
    $(".overlay-sidemenu").toggleClass("show");
  });
  $(".close-side-menu-classification").click(function () {
    $(".classification").removeClass("show");
    $(".overlay-sidemenu").removeClass("show");
  });

  const inputElements = [...document.querySelectorAll("input.code")];
  inputElements.forEach((ele, index) => {
    ele.addEventListener("keydown", (e) => {
      if (e.keyCode === 8 && e.target.value === "")
        inputElements[Math.max(0, index - 1)].focus();
    });
    ele.addEventListener("input", (e) => {
      inputElements[index].focus();
      const [first, ...rest] = e.target.value;
      e.target.value = first ?? ""; // first will be undefined when backspace was entered, so set the input to ""
      const lastInputBox = index === inputElements.length - 1;
      const didInsertContent = first !== undefined;
      if (didInsertContent && !lastInputBox) {
        inputElements[index + 1].focus();
        inputElements[index + 1].value = rest.join("");
        inputElements[index + 1].dispatchEvent(new Event("input"));
      }
    });
  });

  function onSubmit(e) {
    e.preventDefault();
    const code = inputElements.map(({ value }) => value).join("");
    console.log(code);
  }

  // select estate display
  if ($(".estate-display").length > 0) {
    const items = document.querySelectorAll(".estate-display button");
    console.log(items);
    document
      .querySelector(".estate-display")
      .addEventListener("click", ({ target }) => {
        for (const item of items)
          item.classList.toggle("active", target === item);
        console.log("vgdjhj");
        if ($(".estate-display #single-tab").hasClass("active")) {
          $(".our-estates").addClass("single");
        } else {
          $(".our-estates").removeClass("single");
        }
      });
  }

  /* -------------- upload profile pic ---------------- */
  if ($(".profile-pic").length > 0) {
    const imgDiv = document.querySelector(".profile-pic");
    const img = document.querySelector("#photo");
    const file = document.querySelector("#file");
    const uploadBtn = document.querySelector("#uploadBtn");

    //if user hover on img div

    imgDiv.addEventListener("mouseenter", function () {
      uploadBtn.style.display = "block";
    });

    //if we hover out from img div

    imgDiv.addEventListener("mouseleave", function () {
      uploadBtn.style.display = "none";
    });

    //when we choose a pic to upload

    file.addEventListener("change", function () {
      const choosedFile = this.files[0];
      if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          img.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(choosedFile);
      }
    });
  }
  $("select").niceSelect();

  $(".owl-carousel").owlCarousel({
    // loop: true,
    margin: 22,
    rtl: dirAr,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1.3,
      },
      600: {
        items: 2,
      },
      992: {
        items: 3.3,
      },
    },
  });
});

$(function () {
  $("#your-rate").rateYo({
    starWidth: "15px",
    ratedFill: "#FFC107",
    rating: 0,
    fullStar: true,
    rtl: dirAr,
  });
}).on("rateyo.change", function (e, data) {
  var rating = data.rating;
  $("#your-rate").next().val(rating);
});

var navbar = document.getElementsByClassName("main-nav");
var sticky = navbar[0].offsetHeight + 61.36;

// make nav bar static on scroll
if ($("#home").length > 0) {
  window.addEventListener("scroll", function () {
    if (this.document.documentElement.scrollTop >= sticky) {
      $(navbar).css("position", "fixed");
    } else {
      $(navbar).css("position", "sticky");
    }
  });
}

// counter
window.addEventListener("scroll", function () {
  if ($(".counters").length > 0) {
    var counters = document.querySelectorAll(".counter");
    var counterStart = counters[0].offsetTop - 500;
    var speed = 200;
    if (this.document.documentElement.scrollTop > counterStart) {
      counters.forEach((counter) => {
        var upTo = function () {
          var target = Number(counter.getAttribute("data-target"));
          var count = Number(counter.innerText);
          var inc = Math.ceil(target / speed);
          setTimeout(upTo, 300);

          if (count < target) {
            counter.innerText = '+' + count + inc ;
          } else counter.innerText = '+' + target;
        };
        upTo();
      });
    }
  }
});


$('input[name="purpose"]').change(function () {
  if ($(this).attr("id") == "land") {
    $(".project").hide();
  } else $(".project").show();
});

$(".fav").click(function () {
  $(this).find("i").toggleClass("fa-solid fa-regular");
});

$('.pass').click(function(){
    $(this).toggleClass("bi-unlock bi-lock");
    var pass = $(this).next()[0]
    console.log(pass);
    if (pass.type == "password") {
      pass.setAttribute("type", "text");
    } else {
    pass.setAttribute("type", "password");
}
})

// price slider

var $slider = $("#slider");
var $fill = $(".bar .fill");

function setBar() {
  var barWidth = ($slider.val() / $slider.attr("max")) * 100;
  $fill.css("width", barWidth + "%");
}

$slider.on("input", setBar);

setBar();

// ----- scroll top ------

var btn = $("#scroll-top");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

var changeSlide = 4; // mobile -1, desktop + 1
// Resize and refresh page. slider-two slideBy bug remove
var slide = changeSlide;
if ($(window).width() < 600) {
  var slide = changeSlide;
  slide--;
} else if ($(window).width() > 999) {
  var slide = changeSlide;
  slide++;
} else {
  var slide = changeSlide;
}

$(".one").owlCarousel({
  nav: false,
  items: 1,
  autoplay: 5000,
  rtl: dirAr,
});
$(".two").owlCarousel({
  nav: false,
  margin: 15,
  rtl: dirAr,
  responsive: {
    0: {
      items: changeSlide - 1,
      slideBy: changeSlide - 1,
    },
    600: {
      items: changeSlide,
      slideBy: changeSlide,
    },
    1000: {
      items: changeSlide + 1,
      slideBy: changeSlide + 1,
    },
  },
});
var owl = $(".one");
owl.owlCarousel();
owl.on("translated.owl.carousel", function (event) {
  $(".right").removeClass("nonr");
  $(".left").removeClass("nonl");
  if ($(".one .owl-next").is(".disabled")) {
    $(".slider .right").addClass("nonr");
  }
  if ($(".one .owl-prev").is(".disabled")) {
    $(".slider .left").addClass("nonl");
  }
  $(".slider-two .item").removeClass("active");
  var c = $(".slider .owl-item.active").index();
  $(".slider-two .item").eq(c).addClass("active");
  var d = Math.ceil((c + 1) / slide) - 1;
  $(".slider-two .owl-dots .owl-dot").eq(d).trigger("click");
});
$(".right").click(function () {
  $(".slider .owl-next").trigger("click");
});
$(".left").click(function () {
  $(".slider .owl-prev").trigger("click");
});
$(".slider-two .item").click(function () {
  var b = $(".item").index(this);
  $(".slider .owl-dots .owl-dot").eq(b).trigger("click");
  $(".slider-two .item").removeClass("active");
  $(this).addClass("active");
});
var owl2 = $(".two");
owl2.owlCarousel();
owl2.on("translated.owl.carousel", function (event) {
  $(".right-t").removeClass("nonr-t");
  $(".left-t").removeClass("nonl-t");
  if ($(".two .owl-next").is(".disabled")) {
    $(".slider-two .right-t").addClass("nonr-t");
  }
  if ($(".two .owl-prev").is(".disabled")) {
    $(".slider-two .left-t").addClass("nonl-t");
  }
});
$(".right-t").click(function () {
  $(".slider-two .owl-prev").trigger("click");
});
$(".left-t").click(function () {
  $(".slider-two .owl-next").trigger("click");
});

function ImgUpload() {
  var imgWrap = "";
  var imgArray = [];

  $(".upload__inputfile").each(function () {
    $(this).on("change", function (e) {
      imgWrap = $(this).closest(".upload__box").find(".upload__img-wrap");
      var maxLength = $(this).attr("data-max_length");

      var files = e.target.files;
      var filesArr = Array.prototype.slice.call(files);
      var iterator = 0;
      filesArr.forEach(function (f, index) {
        if (!f.type.match("image.*")) {
          return;
        }

        if (imgArray.length > maxLength) {
          return false;
        } else {
          var len = 0;
          for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i] !== undefined) {
              len++;
            }
          }
          if (len > maxLength) {
            return false;
          } else {
            imgArray.push(f);

            var reader = new FileReader();
            reader.onload = function (e) {
              var html =
                "<div class='upload__img-box'><div style='background-image: url(" +
                e.target.result +
                ")' data-number='" +
                $(".upload__img-close").length +
                "' data-file='" +
                f.name +
                "' class='img-bg'><div class='upload__img-close'></div></div></div>";
              imgWrap.append(html);
              iterator++;
            };
            reader.readAsDataURL(f);
          }
        }
      });
    });
  });

  $("body").on("click", ".upload__img-close", function (e) {
    var file = $(this).parent().data("file");
    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].name === file) {
        imgArray.splice(i, 1);
        break;
      }
    }
    $(this).parent().parent().remove();
  });
}

ImgUpload();
