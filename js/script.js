'use strict';

const templates = {
  filmLink:   Handlebars.compile(document.querySelector('#template-film-link').innerHTML),
  tagLink:    Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML)
}

function titleClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  /* remove class 'active' from all films links */

  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /*remove class 'active' from all films */

  const activeFilms = document.querySelectorAll('.films article.active');
  
  for (let activeFilm of activeFilms) {
    activeFilm.classList.remove('active');
  }

  /*get 'href' attribute from the clicked link*/

  const filmSelector = clickedElement.getAttribute('href');

  /*find the correct film using the selector (value of 'href' attribute) */

  const targetFilm = document.querySelector(filmSelector);

  /*add class 'active' to the correct film */

  targetFilm.classList.add('active');
}

/*GENERATING TITLE LINKS*/
/*GENERATING TITLE LINKS*/
/*GENERATING TITLE LINKS*/

const opt = {
  filmSelector        : '.film',
  titleSelector       : '.film-title',
  titleListSelector   : '.titles',
  filmTagsSelector    : '.film-tags .list',
  filmAuthorsSelector : '.film .film-author',
  authorsListSelector : '.authors.list',
  tagsListSelector    : '.tags .list',
  cloudClassCount     : 4,
  cloudClassPrefix    : 'tag-size-',
  cloudClassCountAuthor     : 3,
  cloudClassPrefixAuthor    : 'author-size-'
};

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(opt.titleListSelector);

  titleList.innerHTML = '';

  /* for each film */

  const films = document.querySelectorAll(opt.filmSelector + customSelector);
      
  let html = '';

  for(let film of films){
    
    /* get the film id */

    const filmId = film.getAttribute('id');

    /* find the title element *//* get the title from the title element */

    const filmTitleSelector = film.querySelector(opt.titleSelector);
    
    const filmTitle = filmTitleSelector.innerHTML;

    /* create HTML of the link */

    //const linkHTML = '<li><a href="#' + filmId + ' "><span> ' + filmTitle + ' </span></a></li>';
    /* NEW NEW NEW HANDLEBARS */
    const linkHTMLData = {id: filmId, title: filmTitle};
    const linkHTML = templates.filmLink(linkHTMLData);

    /* insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
      
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
      
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
// console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

/*CALCULATE TAGS PARAMS*/
/*CALCULATE TAGS PARAMS*/

function calculateTagsParams(tags){

  const params = {
    max: '0',
    min: '999999'
  };

  for(let tag in tags){
  // console.log(tag + ' is used ' + tags[tag] + ' times ');
    
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    
  };

  return params;
}

/*CALCULATE AUTHORS PARAMS*/
/*CALCULATE AUTHORS PARAMS*/

function calculateAuthorsParams(authors){

  const params = {
    max: '0',
    min: '999999'
  };

  for(let author in authors){
  //console.log(author + ' is used ' + authors[author] + ' times ');
    
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    } 
  }
  return params;
}


/* CALCULATE TAG CLASS */
/* CALCULATE TAG CLASS */

function calculateTagClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
  const classValue = opt.cloudClassPrefix + classNumber;
  return classValue;
}

/* CALCULATE AUTHOR CLASS */
/* CALCULATE AUTHOR CLASS */

function calculateAuthorClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.cloudClassCountAuthor - 1) + 1);
  const classValue = opt.cloudClassPrefixAuthor + classNumber;
  return classValue;
}

/* GENERATING TAGS*/
/* GENERATING TAGS*/
/* GENERATING TAGS*/

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  
  let allTags = {};

  /* find all articles */
  
  const films = document.querySelectorAll(opt.filmSelector);

  /* START LOOP: for every article: */
      
  for(let film of films){

    /* find tags wrapper */

    const tagsWrapper = film.querySelector(opt.filmTagsSelector);
  
    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const filmTags = film.getAttribute('data-tags');

    /* split tags into array */

    const filmTagsArray = filmTags.split(' ');

    /* START LOOP: for each tag */

    for(let tag of filmTagsArray){

      /* generate HTML of the link */

      //const linkHTML = '<li><a href="#tag-' + tag + '"><span> ' + tag + ' </span></a></li>';
      /* NEW NEW NEW HANDLEBARS */
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);


      /* add generated code to html variable */

      html = html + linkHTML;
      
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

    let allTagsHTML = '';
    /* NEW NEW NEW HANDLEBARS */
    const allTagsData = {tags: []};

    /* [NEW][NEW] START LOOP: for each tag in allTags */
      
    for(let tag in allTags){

      /* [NEW][NEW] generate code of a link and add it to allTagsHTML */

      const tagClass = calculateTagClass(allTags[tag], tagsParams);

      const tagLinkHTML = '<li><a class="' + tagClass + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';
      
      allTagsHTML += tagLinkHTML

      /* NEW NEW NEW HANDLEBARS */
      
      allTagsData.tags.push({
       tag: tag,
       count: allTags[tag],
       className: calculateTagClass(allTags[tag], tagsParams)
      });    


    /* [NEW][NEW] END LOOP: for each tag in allTags: */
    }
      
    /* [NEW][NEW] add html from allTags to tagList */

    //tagList.innerHTML = allTagsHTML;

    /* NEW NEW NEW HANDLEBARS */

    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);

    /* insert HTML of all the links into the tags wrapper */
      
    tagsWrapper.innerHTML = html;

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
  
  /* [NEW] create a new variable allAuthors with an empty array */

  let allAuthors = {};

  /* find all authors */
    
  const films = document.querySelectorAll(opt.filmSelector);

  /* START LOOP: for every film: */
  
  for(let film of films){
    
    /* find authors wrapper */
  
    const authorWrapper = film.querySelector(opt.filmAuthorsSelector);

    /* get authors from data-author attribute */

    const author = film.getAttribute('data-author');

    /* generate HTML of the link */

    //const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    /* NEW NEW NEW HANDLEBARS */
    const linkHTMLData = {author: author};
    const linkHTML = templates.authorLink(linkHTMLData);

    /* check if author is not already on the list */
    
    if(!allAuthors.hasOwnProperty(author)){
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
    }

    /* insert HTML of all the links into the authors wrapper */
  
    authorWrapper.insertAdjacentHTML('beforeend', linkHTML);

  /* END LOOP: for every film: */
  }

  /* [NEW][NEW] create var for all links HTML code*/

  const authorsParams = calculateAuthorsParams(allAuthors);
    
  /* make html variable with empty string */

  //let authorsHTML = '';
  /* NEW NEW NEW HANDLEBARS */
  const allAuthorsData = {authors: [] };

  /* START LOOP: for each author */

  for(let author in allAuthors){
      
    const authorsClass = calculateAuthorClass(allAuthors[author], authorsParams);

    const authorsHTML = '<li><a class="' + authorsClass + '" href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li>';
  

 // //allAuthorsHTML += authorsHTML


    /* NEW NEW NEW HANDLEBARS */
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateAuthorClass(allAuthors[author], authorsParams)
     }); 

  /* END LOOP: for each author */
  }

  const authorList = document.querySelector(opt.authorsListSelector);

  //authorsList.innerHTML = authorsHTML;
  /* NEW NEW NEW HANDLEBARS */

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log(allAuthorsData);

  const authors = document.querySelectorAll('.authors a');

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


const addClickListenersToAuthors = function () {

  /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let link of links) {

    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
};

  addClickListenersToAuthors();