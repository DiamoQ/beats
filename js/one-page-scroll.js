const sections = $("section");
const display = $(".main");
const sideMenu = $(".fixed-menu");
const sideLink = $(".fixed-menu__link")
const activeItem = $(".fixed-menu__link--active");
const sideActiveMenu = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScrool = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error("передано неверное значение в countSelectionPosition");
    return 0;
  }

  return position;
}

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");

  if (menuTheme == "white") {
    sideLink.addClass("fixed-menu__link--white");
    activeItem.removeClass("fixed-menu__link--white");
  } else if (menuTheme == "black") {
    sideLink.addClass("fixed-menu__link--black");
    activeItem.removeClass("fixed-menu__link--black");
  } else {
    sideLink.removeClass("fixed-menu__link--white");
    sideMenu.removeClass("fixed-menu__link--black");
  };
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {

  if (inScrool) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScrool = true;

  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  });
  resetActiveClassForItem(sections, sectionEq, "active");

  setTimeout(() => {
    inScrool = false;
    resetActiveClassForItem(sideActiveMenu, sectionEq, "fixed-menu__item--active");
  }, transitionOver + mouseInertiaOver);
};


const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index())
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index())
      }
    }
  }
};

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", e => {

  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == "input" || tagName == "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38:
      scroller("prev");
      break;

    case 40:
      scroller("next");
      break;
  }
});

$(".wrapper").on("touchmove", e => e, preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

if (isMobile) {
  //https://www.npmjs.com/package/jquery-touchswipe

  $("body").swipe({

    swipe: function (
      event,
      direction,
    ) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if (direction == "up") scrollDirection = "next";
      if (direction == "down") scrollDirection = "prew";

      scroller[scrollDirection]();
    },
  });
}

