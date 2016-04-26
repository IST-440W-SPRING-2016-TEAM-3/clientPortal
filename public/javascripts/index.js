$(document).ready(function() {
  $('#welcomeLeft, #welcomeRight , #mainInfoUp').css('opacity', 0);
  $('#welcomeLeft, #welcomeRight').waypoint(function () {
  $('#welcomeLeft').addClass('fadeInLeft'),
  $('#welcomeRight').addClass('fadeInRight');
  }, { offset: '60%' });

  $('#mainInfoUp').waypoint(function () {
  $('#mainInfoUp').addClass('fadeInUp');
  }, { offset: '60%' });


  $('#contentTwoLeft, #contentTwoRight').waypoint(function () {
  $('#contentTwoLeft').addClass('fadeInLeft'),
  $('#contentTwoRight').addClass('fadeInRight');
  }, { offset: '60%' });

  $('#doctorLeft, #doctorRight').waypoint(function () {
  $('#doctorLeft').addClass('fadeInLeft'),
  $('#doctorRight').addClass('fadeInRight');
  }, { offset: '60%' });

  $('#contactLeft, #contactRight').waypoint(function () {
  $('#contactLeft').addClass('fadeInLeft'),
  $('#contactRight').addClass('fadeInRight');
  }, { offset: '60%' });

  $('#myHeader').addClass('fadeInRight');

});
