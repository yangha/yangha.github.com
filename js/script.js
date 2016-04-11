(function($, win){

    //article style
    if(/\/\d/.test(location.href)){
        $('.outer').addClass('detail');
    }

    //scroll
    var top = 5;
    $(window).on('scroll', function(){
        if($(window).scrollTop() > top){
            $('#header').addClass('slide');
        }else{
            $('#header').removeClass('slide');
        }
        top = $(window).scrollTop();
    })

  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  $('#main-nav-toggle').on('click', function(e){
      e.stopPropagation();
      $("#container").toggleClass('nav-show');
  });
  $('#wrap').on('click', function(){
      if($("#container").hasClass('nav-show')){
          $("#container").removeClass('nav-show');
      }
  });




  //自适应布局
  var doc = win.document;
  var docEl = doc.documentElement;
  var tid;

  function refreshRem() {
      var width = docEl.getBoundingClientRect().width;
      if (width > 500) { // 最大宽度
          width = 500;
      }
      if (width < 320) {//最小宽度
          width = 320;
      }

      var rem = width / 320 * 100; // 将屏幕宽度分成10份， 1份为1rem
      docEl.style.fontSize = rem + 'px';


      //var height = docEl.getBoundingClientRect().height;
      //if (height > 700) { // 最大高度
      //    height = 700;
      //}
      //if (height < 480) { //最小高度
      //    height = 480;
      //}
      var rem = width / 320 * 100; // 将屏幕宽度分成10份， 1份为1rem
      docEl.style.fontSize = rem + 'px';
  }

  //窗口变化和页面显示的时候需要重新渲染
  win.addEventListener('resize', function () {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function (e) {
      if (e.persisted) {
          clearTimeout(tid);
          tid = setTimeout(refreshRem, 300);
      }
  }, false);

  refreshRem();

})(jQuery, window);
