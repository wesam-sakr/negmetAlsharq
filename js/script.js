// $('.owl-carousel').removeClass('owl-rtl')
// $('html').attr('dir', 'ltr');
// $('html').attr('lang', 'en');
// $('link[href="css/bootstrap.rtl.min.css"]').attr('href', 'css/bootstrap.min.css');

// تحديد لغة الموقع
var bodyDir = $("body").css("direction");
console.log(bodyDir);
var dirAr;
if (bodyDir == "rtl") {
  dirAr = true;
} else {
  dirAr = false;
}
$(document).ready(function () {
  
  $('#lang').on('click', function() {
    $('html').attr('dir', $('html').attr('dir') === 'ltr' ? 'rtl' : 'ltr');
    $('html').attr('lang', $('html').attr('lang') === 'en' ? 'ar' : 'en');
    $('#lang-text').text($('html').attr('lang') === 'en' ? 'AR' : 'EN' );
    $('.owl-carousel').toggleClass('owl-rtl');
    $('#bootstrap-style').attr('href', $('html').attr('lang') === 'en' ? 'css/bootstrap.min.css' : 'css/bootstrap.rtl.min.css');
  });

  const circle = document.querySelector('.center');
const Outer = document.querySelector('.outerCircle'); 

document.addEventListener('mousemove',(e) => {
  circle.style.top = `${e.clientY}px`;
  circle.style.left = `${e.clientX}px`;
  Outer.style.top = `${e.clientY}px`;
  Outer.style.left = `${e.clientX}px`;
});

document.addEventListener('click',() => {
  Outer.classList.add('click');
  setTimeout(() => {
    Outer.classList.remove('click');
  },300)  
});

const Elements = [
  "BUTTON",
  "A",
  "INPUT",
  "SELECT"
]
document.addEventListener('mouseover',(e) => {
   if(Elements.includes(e.target.tagName)){
        Outer.classList.add('hover');
   }else{
     Outer.classList.remove('hover');
   }
});

  // Scroll to the top of the page
  window.addEventListener('scroll', () => {
    document.getElementById('scrollUp').style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  // change input by purpose
  $('input[name="purpose"]').change(function () {
    if ($(this).attr("id") == "land") {
      $(".project").hide();
    } else $(".project").show();
  });

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
              counter.innerText = '+' + count + inc;
            } else counter.innerText = '+' + target;
          };
          upTo();
        });
      }
    }
  });

  // toggle fav
  $(".fav").click(function () {
    $(this).find("i").toggleClass("fa-solid fa-regular");
  });

  // toggle password type
  $('.pass').click(function () {
    $(this).children('i').toggleClass("bi-unlock bi-lock");
    var pass = $(this).closest('.input-group').find('input')[0];
    console.log(pass);
    if (pass.type == "password") {
      pass.setAttribute("type", "text");
    } else {
      pass.setAttribute("type", "password");
    }
  })


  // عند الضغط على زر التبديل، نحدد العنصر المستهدف ونبدل الكلاس "show"
  $("[data-toggle]").click(function () {
    let target = $(this).data("toggle");
    $(target).toggleClass("show");
  });

  // عند الضغط على زر الإغلاق، نحذف الكلاس "show" من العنصر المستهدف
  $("[data-close]").click(function () {
    let target = $(this).data("close");
    $(target).removeClass("show");
  });



  // side filter in responseve  
  // $("#filter").click(function () {
  //   $(".filter").toggleClass("show");
  // });
  // $(".filter-header .btn-close").click(function () {
  //   $(".filter").toggleClass("show");
  // });

  // side profile nav in responseve  
  // $(".toggle-profile-nav").click(function () {
  //   $(".profile-nav").toggleClass("show");
  // });
  // $(".close-profile-nav").click(function () {
  //   $(".profile-nav").removeClass("show");
  // });

  // side classification in responseve  
  // $(".toggle-side-menu-classification").click(function () {
  //   $(".classification").toggleClass("show");
  // });
  // $(".close-side-menu-classification").click(function () {
  //   $(".classification").removeClass("show");
  // });

  // verification code OTP
  if ($('#verification-input').length > 0) {
    const inputs = Array.from(document.getElementById("verification-input").children);
    function getFirstEmptyIndex() {
      return inputs.findIndex((input) => input.value === "");
    }
    inputs.forEach((input, i) => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
          if (input.value === "" && i > 0) {
            inputs[i - 1].value = "";
            inputs[i - 1].focus();
          }

          for (let j = i; j < inputs.length; j++) {
            let value = inputs[j + 1] ? inputs[j + 1].value : "";
            inputs[j].setRangeText(value, 0, 1, "start");
          }
        }

        if (e.key === "ArrowLeft" && i > 0) {
          inputs[i - 1].focus();
        }

        if (e.key === "ArrowRight" && i < inputs.length - 1) {
          inputs[i + 1].focus();
        }
      });

      input.addEventListener("input", (e) => {
        input.value = "";

        const start = getFirstEmptyIndex();
        inputs[start].value = e.data;

        if (start + 1 < inputs.length) inputs[start + 1].focus();
      });

      input.addEventListener("paste", (e) => {
        e.preventDefault();

        const text = (event.clipboardData || window.clipboardData).getData("text");
        const firstEmpty = getFirstEmptyIndex();
        const start = firstEmpty !== -1 ? Math.min(i, firstEmpty) : i;

        for (let i = 0; start + i < inputs.length && i < text.length; i++) {
          inputs[start + i].value = text.charAt(i);
        }

        inputs[Math.min(start + text.length, inputs.length - 1)].focus();
      });

      input.addEventListener("focus", () => {
        const start = getFirstEmptyIndex();
        if (start !== -1 && i > start) inputs[start].focus();
      });
    });
  }

  // upload profile pic 
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

  // carousels
  $(".owl-carousel").owlCarousel({
    margin: 22,
    rtl: dirAr,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1.3,
      },
      600: {
        items: 2.3,
      },
      992: {
        items: 3.3,
      },
    },
  });

  // nise select
  $("select").niceSelect();
});




