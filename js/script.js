'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');
  // console.log(clickedElement);
  // console.log(event);

  /* remove class 'active' from all films links */

  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for (let activeLink of activeLinks) {
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  //console.log('clickedElement:', clickedElement);

  /*remove class 'active' from all films */

  const activeFilms = document.querySelectorAll('.films film.active');
  
  for (let activeFilm of activeFilms) {
  activeFilm.classList.remove('active');
  }

  /*get 'href' attribute from the clicked link*/

  const filmSelector = clickedElement.getAttribute('href');
  //console.log(filmSelector);

  /*find the correct film using the selector (value of 'href' attribute) */

  const targetFilm = document.querySelector(filmSelector);
  console.log(targetFilm);

  /*add class 'active' to the correct film */

  targetFilm.classList.add('active');
}

const optFilmSelector = '.film',
  optTitleSelector = '.film-title',
  optTitleListSelector = '.titles',
  optFilmTagsSelector = '.film-tags .film';

function generateTitleLinks(){

  /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
  
    titleList.innerHTML = '';

  /* for each film */

    const films = document.querySelectorAll(optFilmSelector);
      // console.log(films);
      
      let html = '';

      for(let film of films){
        
      /* get the film id */

        const filmId = film.getAttribute('id');
          // console.log(filmId);
    
      /* find the title element *//* get the title from the title element */

        const filmTitle = film.querySelector(optTitleSelector).innerHTML;
          // console.log(filmTitle);

      /* create HTML of the link */

        const linkHTML = '<li><a href="#' + filmId + ' "><span> ' + filmTitle + ' </span></a></li>';
          // console.log(linkHTML);

      /* insert link into titleList */

        html = html + linkHTML;
       /* titleList.innerHTML = titleList.innerHTML + linkHTML; */
    }

    titleList.innerHTML = html;
      
}
generateTitleLinks();
const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

/* GENERATING TAGS*/

  function generateTags(){
    /* find all articles */
  
    const films = document.querySelectorAll(optFilmSelector);
    console.log(films);

    /* START LOOP: for every article: */
      
      for(let film of films){

      /* find tags wrapper */

        const titleList = film.querySelector(optFilmTagsSelector);
  
      /* make html variable with empty string */

        let html = '';

      /* get tags from data-tags attribute */

        const filmTags = film.getAttribute('data-tags');
        console.log(filmTags);
  
      /* split tags into array */
  
      /* START LOOP: for each tag */
  
        /* generate HTML of the link */
  
        /* add generated code to html variable */
  
      /* END LOOP: for each tag */
  
      /* insert HTML of all the links into the tags wrapper */
  
    /* END LOOP: for every article: */
      }
  }
  
generateTags();