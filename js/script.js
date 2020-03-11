'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event)
  /* remove class 'active' from all films links */

  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for (let activeLink of activeLinks) {
  activeLink.classList.remove('active');
}
  /* add class 'active' to the clicked link */
  /*remove class 'active' from all films */

  const activeArticles = document.querySelectorAll('.posts article.active');
  
  for (let activeArticle of activeArticles) {
  activeArticle.classList.remove('active');
  }
  /*get 'href' attribute from the clicked link*/
  /*find the correct article using the selector (value of 'href' attribute) */
  /*add class 'active' to thecorrect article */
}