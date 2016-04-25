$(document).ready(function() {
  $('#welcomeLeft, #welcomeRight , #mainInfoUp').css('opacity', 0);
  $('#welcomeLeft, #welcomeRight').waypoint(function () {
  $('#welcomeLeft').addClass('fadeInLeft'),
  $('#welcomeRight').addClass('fadeInRight');
}, { offset: '60%' });

  $('#mainInfoUp').waypoint(function () {
  $('#mainInfoUp').addClass('fadeInUp');
  }, { offset: '60%' });

  $('#myHeader').addClass('fadeInRight');

});
