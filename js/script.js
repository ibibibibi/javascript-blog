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

// const optFilmSelector = '.film',
//   optTitleSelector = '.film-title',
//   optTitleListSelector = '.titles',
//   optFilmTagsSelector = '.film-tags .list',
//   optFilmAuthorsSelector = '.film .film-author',
//   optAuthorsListSelector = '.authors.list',
//   optTagsListSelector = '.tags .list',
//   optCloudClassCount = '4',
//   optCloudClassPrefix = 'tag-size-';

const opt = {
  titleSelector = '.film',
  optTitleListSelector = '.titles',
  FilmTagsSelector = '.film-tags .list',
  filmAuthorsSelector = '.film .film-author',
  futhorsListSelector = '.authors.list',
  tagsListSelector = '.tags .list',
  cloudClassCount = '4',
  cloudClassPrefix = 'tag-size-'
};

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    //console.log(titleList);

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

        const filmTitleSelector = film.querySelector(optTitleSelector);
        const filmTitle = filmTitleSelector.innerHTML;
          // console.log(filmTitle);

      /* create HTML of the link */

        const linkHTML = '<li><a href="#' + filmId + ' "><span> ' + filmTitle + ' </span></a></li>';
          // console.log(linkHTML);

      /* insert link into titleList */

        html = html + linkHTML;
       //titleList.innerHTML = titleList.innerHTML + linkHTML;
    }

    titleList.innerHTML = html;
      
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
  // console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

/*CALCULATE TAGS PARAMS*/
/*CALCULATE TAGS PARAMS*/
/*CALCULATE TAGS PARAMS*/

function calculateTagsParams(tags){

  const params = {
    max: '0',
    min: '999999'
  };

  for(let tag in tags){
    // console.log(tag + ' is used ' + tags[tag] + ' times');
    
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }

    //params.max = Math.max(tags[tag], params.max);
    //console.log(params.max)
    //params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

  /* CALCULATE TAG CLASS */

function calculateTagClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optcloudClassCount - 1) + 1);
  const classValue = optcloudClassPrefix + classNumber;
  console.log(classValue);

  return classValue;
}

/* GENERATING TAGS*/

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  
  let allTags = {};

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
        // console.log(filmTagsArray)

      /* START LOOP: for each tag */

        for(let tag of filmTagsArray){
          // console.log(tag)
  
        /* generate HTML of the link */
  
        const linkHTML = '<li><a href="#tag-' + tag + '"><span> ' + tag + ' </span></a></li>';
        //console.log(linkHTML);

        /* add generated code to html variable */

        html = html + linkHTML;
        // console.log(html);
        //console.log (allTags);
        /* [NEW] check if this link is NOT already in allTags */
      
          if(!allTags.hasOwnProperty(tag)){
        
          /* [NEW] add generated code to allTags array */
            
            allTags[tag] = 1;
        } else {

          allTags[tag]++;

        }
      
      /* END LOOP: for each tag */
      }

      /* [NEW] find list of tags in right column */
      
        const tagList = document.querySelector('.tags');

      /* [NEW][NEW] create var for all links HTML code*/

        const tagsParams = calculateTagsParams(allTags);
        //console.log('tagsParams:', tagsParams);

        let allTagsHTML = '';

      /* [NEW][NEW] START LOOP: for each tag in allTags */
      
        for(let tag in allTags){

          /* [NEW][NEW] generate code of a link and add it to allTagsHTML */

          //const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
          
          //console.log('tagLinkHTML:', tagLinkHTML);

          allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';

          //allTagsHTML += tagLinkHTML;
          

      /* [NEW][NEW] END LOOP: for each tag in allTags: */
        }
      
      /* [NEW][NEW] add html from allTags to tagList */

        tagList.innerHTML = allTagsHTML;

      /* insert HTML of all the links into the tags wrapper */
        
        tagsWrapper.innerHTML = html;
        //console.log(tagsWrapper)

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
    //console.log(href) 

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

    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    //console.log(tagLinks)

  /* START LOOP: for each link */

    for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
    }
}

addClickListenersToTags();

/*GENERATING AUTHORS*/
/*GENERATING AUTHORS*/
/*GENERATING AUTHORS*/

function generateAuthors() {

  let allAuthors = {};

  /* find all films */
  
    const authorsList = document.querySelector(optAuthorsListSelector);
    
    const films = document.querySelectorAll(optFilmSelector);
    //console.log(films);

  

  /* START LOOP: for every film: */
  
    for(let film of films){
    
      /* find authors wrapper */
    
        const authorWrapper = film.querySelector(optFilmAuthorsSelector);

      /* get authors from data-author attribute */

        const author = film.getAttribute('data-author');
        //console.log(author);

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
        //console.log(linkHTML);

      /* check if author is not already on the list */
      
        if(!allAuthors.hasOwnProperty(author)){
          allAuthors[author] = 1;
        } else {
          allAuthors[author]++;
        }

      

      /* generate author name under the film title */
        //html = html + linkHTML;
       // console.log(html)

      /* insert HTML of all the links into the authors wrapper */
    
        authorWrapper.insertAdjacentHTML('beforeend', linkHTML);
  
        //console.log(authorWrapper)

    /* END LOOP: for every film: */
    }

    /* make html variable with empty string */

    let authorsHtml = '';

    for(let author in allAuthors){
      authorsHtml += '<li><a href="#author-' + author + '">' + author + '</a></li>'
    }

  authorsList.innerHTML = authorsHtml;

  const authors = document.querySelectorAll('.authors a')
  //console.log (authors);

  for(let author of authors){
    author.addEventListener('click', authorClickHandler);
  }

}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
  
    const clickedElement = this;
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
  
    const href = clickedElement.getAttribute('href');
  
    /* make a new constant "author" and extract author from the "href" constant */
  
    const author = href.replace('#author-', '');
  
    /* find all author links with class active */
  
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  
      /* START LOOP: for each active author link */
  
        for (let authorLink of authorLinks){
  
        /* remove class active */
  
        authorLink.classList.remove('active');
  
      /* END LOOP: for each active tag link */
  
      }
  
    /* find all author links with "href" attribute equal to the "href" constant */
  
      const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
    /* START LOOP: for each found author link */
  
      for(let hrefAuthorLink of hrefAuthorLinks){
  
    /* add class active */
  
      hrefAuthorLink.classList.add('active');
  
    /* END LOOP: for each found author link */
  
      }
  
    /* execute function "generateTitleLinks" with article selector as argument */
  
      generateTitleLinks('[data-author="' + author + '"]');
  
  }