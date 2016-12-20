#WD Carusel

##Description

This plugin allows you to quickly make adaptive roundabout on any project.

##Initialization

````javaScript
$('.wd-carusel').WDCarusel();
````

##Demo
````html
<div class="wd-carusel">
  <div class="wd-carusel__item"><img src="images/img.png"></div>
  <div class="wd-carusel__item"><img src="images/img.png"></div>
  <div class="wd-carusel__item"><img src="images/img.png"></div>
  <div class="wd-carusel__item"><img src="images/img.png"></div>
  <div class="wd-carusel__item"><img src="images/img.png"></div>
  <div class="wd-carusel__item"><img src="images/img.png"></div>
  <div class="wd-carusel__item"><img src="images/img.png"></div>
  <div class="wd-carusel__item"><img src="images/img.png"></div>
</div>
````
[view demo](https://codepen.io/Zveromag/pen/PbRMVd)

##Options

options and defaults values

````javaScript
//sets the padding elements
itemPadding : 5

//it allows you to change the appearance of controls
arrowLeft : 'image'
arrowRight : 'image'

//sets the looping mode
infinite : false

//automatic scrolling mode
autoplay : false

//automatic scrolling delay
autoplayDelay : 3000

//stops the automatic scrolling when you hover
stopInHover : false

//it allows you to set your container to integrate controls
containerNav : ''

//defines the behavior of elements in adaptability
responsive : [
  {
    breakpoint: 1170,
    items: 5
  },
  {
    breakpoint: 960,
    items: 4
  },
  {
    breakpoint: 768,
    items: 3
  },
  {
    breakpoint: 480,
    items: 2
  },
  {
    breakpoint: 320,
    items: 1
  }
]
````
