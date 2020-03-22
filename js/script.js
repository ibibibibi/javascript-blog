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
  // console.log('clickedElement:', clickedElement);

  /*remove class 'active' from all films */

  const activeFilms = document.querySelectorAll('.films article.active');
  
  for (let activeFilm of activeFilms) {
  activeFilm.classList.remove('active');
  }

  /*get 'href' attribute from the clicked link*/

  const filmSelector = clickedElement.getAttribute('href');
  // console.log(filmSelector);

  /*find the correct film using the selector (value of 'href' attribute) */

  const targetFilm = document.querySelector(filmSelector);
  // console.log(targetFilm);

  /*add class 'active' to the correct film */

  targetFilm.classList.add('active');
}

/*GENERATING TITLE LINKS*/

const optFilmSelector = '.film',
  optTitleSelector = '.film-title',
  optTitleListSelector = '.titles',
  optFilmTagsSelector = '.film-tags .list';
  optFilmAuthorsSelector = '.film .film-author';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
  
    titleList.innerHTML = '';

  /* for each film */

    const films = document.querySelectorAll(optFilmSelector + customSelector);
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
  // console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

/* GENERATING TAGS*/

function generateTags(){
  /* find all articles */
  
    const films = document.querySelectorAll(optFilmSelector);
    // console.log(films);

    /* START LOOP: for every article: */
      
      for(let film of films){

      /* find tags wrapper */
        // console.log('film', film)
        const tagsWrapper = film.querySelector(optFilmTagsSelector);
        // console.log(tagsWrapper);
  
      /* make html variable with empty string */

        let html = '';

      /* get tags from data-tags attribute */

        const filmTags = film.getAttribute('data-tags');
        // console.log(filmTags);
  
      /* split tags into array */
  
        const filmTagsArray = filmTags.split(' ');

      /* START LOOP: for each tag */

        for(let tag of filmTagsArray){
          // console.log(tag)
  
        /* generate HTML of the link */
  
        const linkHTML = '<li><a href="#tag-' + tag + '"><span> ' + tag + ' </span></a></li>';
        
        // console.log(linkHTML);

        /* add generated code to html variable */

        html = html + linkHTML;
        // console.log(html);
      
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
        
        tagsWrapper.innerHTML = html;
        // console.log(tagsWrapper)

    /* END LOOP: for every article: */
      }
  }
  
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
 
   event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  
    const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log(href) 

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

    for (let tagLink of tagLinks){

    /* remove class active */

      tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */

    }

  /* find all tag links with "href" attribute equal to the "href" constant */

      const hrefTagLinks = document.querySelectorAll('a.active[href="' + href + '"]');

  /* START LOOP: for each found tag link */

      for(let hrefTagLink of hrefTagLinks){

    /* add class active */

      hrefTagLink.classList.add('active');

  /* END LOOP: for each found tag link */

      }

  /* execute function "generateTitleLinks" with article selector as argument */

      generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

    const links = document.querySelectorAll('a[href^="#tag-"]');
    console.log(links)

  /* START LOOP: for each link */

    for(let link of links){

    /* add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
    }
}

addClickListenersToTags();

/*GENERATING AUTHORS*/
/*GENERATING AUTHORS*/
/*GENERATING AUTHORS*/

function generateAuthors() {

  /* find all films */
  
  const films = document.querySelectorAll(optFilmSelector);
    console.log(films);

  /* START LOOP: for every film: */
  
    for(let film of films){

    /* find authors wrapper */
    
    const authorsWrapper = film.querySelector(optFilmAuthorsSelector);
    console.log(authorsWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get authors from data-author attribute */

    const author = film.getAttribute('data-author');
    console.log(author);

    /* generate HTML of the link */

    const linkHTML = '<li><a href="#author-' + author + '"><span> ' + author + ' </span></a></li>';
    console.log(linkHTML);

    /* add generated code to html variable */

    html = html + linkHTML;
    console.log(html);
  
    /* insert HTML of all the links into the tags wrapper */
    
    authorWrapper.innerHTML = html;
    console.log(tagsWrapper)

  /* END LOOP: for every article: */
  }


  const authorListWrapper = document.querySelector(optAuthorsListSelector);
  console.log (authorsListWrapper);

  const authors = document.querySelectorAll('.authors a')
  console.log (authors);

  for(let author of authors){
    author.addEventListener('click', authorClickHAndler);
  }

}

generateAuthors();