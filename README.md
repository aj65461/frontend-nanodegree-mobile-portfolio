## Website Performance Optimization portfolio project

##To view this site, simply click on the following link:

http://aj65461.github.io/frontend-nanodegree-mobile-portfolio/

From there you can click on any of the pages, copy their URLs, and then enter them into Google's PageSpeed Insights linked here:

https://developers.google.com/speed/pagespeed/insights/

### Optimizations

The goal of this project was to analyze the Critical Rendering Path of a provided portfolio page and to make optimizations that would:
* Achieve a PageSpeed score of 90 on index.html
* Ensure a consistent frame rate at 60fps when when scrolling in pizza.html
* Impact content efficiency
* Improve time to resize pizzas to less than 5ms in pizza.html

## Outline of Optimizations I made
* Re-sized images using Photoshop to better fit the layout of the page
* Inlined critical CSS
* Used a Javascript file with an async tag that contained all necessary Javascript files, as well as a Javascript file that would load the remaining CSS after the page was rendered, thus removing render-blocking CSS and Javascript.
* For main.js I moved some variables and querySelectors outside their associated for-loops because it was not necessary to have them recalculated as you scroll down the page.
* Removed the scroll event from the updatePositions function and made use of requestAnimationFrame.
* Changed the number of pizzas that were being appended to the page.
* Utilized Gruntjs to automate image compression, CSS and Javascript minification, and run mobile and desktop performance tests using Google PageSpeed Insights.


