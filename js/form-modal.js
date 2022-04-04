$('.form').submit((e) => {
  e.preventDefault ();

  const form = $(e.currentTarget);
  const names = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to =form.find("[name='to']");

  const modal = $('#hiddenWindow');
  const content = modal.find('.hidden-window__content');

  [names, phone, comment, to].forEach ((field) => {
    field.removeClass("input-error");
    if (field.val().trim() == "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  if (errorFields.length == 0) {
      const request = $.ajax({
      url:"https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: names.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
    });
    request.done((data) => {
      content.text(data.message);
    }); 
    request.fail((data) => {
      content.text(data.responseJSON.message);
      // класс ошибки на модальное окно
    }); 
    request.always(() => {
      $.fancybox.open({
        src: "#hiddenWindow",
        type: "inline"
    });
  });
}
});

$(".app-submit-btn").click ((e) => {
  e.preventDefault();
  $.fancybox.close();
})
