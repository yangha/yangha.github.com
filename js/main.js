$(function () {
    FastClick.attach(document.body);

    $('.me__img_wrap').on('click', function () {
        $('.main__content').addClass('photo');
        setTimeout(function () {
            $('.camera').hide()
            $('.main__content').addClass('switch');
        }, 400);
    });
    WeixinApi.ready(function() {
        var imgList = [];
        $('.page-life img').each(function (index, item) {
            imgList.push($(item).attr('src'));
            $(item).on('click', function () {
                var src = $(this).attr('src');
                WeixinApi.imagePreview(src, imgList);
            });
        });
    });
});
