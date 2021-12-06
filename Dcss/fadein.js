/*
スクロール出現
*/
// スクロール出現用関数（.offs ⇄ .ons）
function scr_ani(scr,offs_max){
  var
  window_h = $(window).height(),
  offs_length = $('.offs').filter(':visible').length,
  ons_length = $('.ons').filter(':visible').length,
  wh_pos = 20;// 対象コンテンツの上端が画面下からどれくらい入ったら反応するか。画面高さに対する割合（%）
  if(offs_length){
    var first_item = offs_max - offs_length;
    for (var i=0; i<offs_length; i++) {
      var data_scr = first_item + i;
      var offs = $('.offs[data-scr="' + data_scr + '"]');
      var target = offs.offset().top;
      var trigger = target - (window_h + scr - window_h * wh_pos / 100);
      if(trigger < 0){
        offs.removeClass('offs').addClass('ons');
      }else{
        break;
      }
    }
  }
  if(ons_length){
    var last_item = ons_length - 1;
    for (var i=0; i<ons_length; i++) {
      var data_scr = last_item - i;
      var ons = $('.ons[data-scr="' + data_scr + '"]');
        var target = ons.offset().top;
      var trigger = target - (window_h + scr);
      if(trigger > 0){
        ons.removeClass('ons').addClass('offs');
      }else{
        break;
      }
    }
  }
};

$(function(){

  // スクロール出現アイテムにナンバリング（hide要素には適用されません）
  var cnt = 0;
  for (var i=0; i<$('.offs').length; i++) {
    if($('.offs').eq(i).is(':visible')){
      $('.offs').eq(i).attr('data-scr',cnt);
      cnt++;
    }
  }
  // 対象要素の個数
  var offs_max = $('.offs').filter(':visible').length;

  // （リロード時など）ロード時にすでにスクロールされている場合に対応
  var scr = $(window).scrollTop();
  scr_ani(scr,offs_max);


  /************
  スクロール時
  ************/
  $(window).on('scroll', function(){
    var scr = $(window).scrollTop();
    scr_ani(scr,offs_max);
  });// end scroll

});