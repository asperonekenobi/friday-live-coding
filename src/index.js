import {Article} from './js/Article';
import {ArticleModal} from './js/ArticleModal';
import {Modal} from './js/Modal';

const data = [
   {
      id: 1,
      title: 'Increasing Prosperity With Positive Thinking',
      urlToImage: './src/img/strategies/1.jpg',
      tags: ['Art', 'Design'],
      content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
      date: '01.01.2020'
   },
   {
      id: 2,
      title: 'Motivation Is The First Step To Success',
      urlToImage: './src/img/strategies/2.jpg',
      tags: ['Culture'],
      content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
      date: '01.01.2020'
   },
   {
      id: 3,
      title: 'Success Steps For Your Personal Or Business Life',
      urlToImage: './src/img/strategies/3.jpg',
      tags: ['Culture', 'Design', 'Art'],
      content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
      date: '01.01.2020'
   }
];

window.onload = function() {
   console.log('Hello RS!');

   //Render Articles
   if (data) {
      renderArticlesToDom();
   }

   //Tags
   addTagsClickHandler();

   //Generate Base Modal from Modal Class
   addToolsClickHandler();
};

const addTagsClickHandler = () => {
   document.querySelector('.strategies__tags').addEventListener('click', (e) => {
      if (e.target.classList.contains('tag')) {
         let clickedTag = e.target;
         removeSelectedTags();
         selectClickedTag(clickedTag);
         if (clickedTag.innerText === 'All') {
            showAllStrategies();
         } else {
            filterStrategyBySelectedTag(clickedTag.innerText);
         }
      }
   })
};

// Удаляет выделение тэга
const removeSelectedTags = () => {
   let tags = document.querySelectorAll('.strategies__tags .tag');
   tags.forEach(tag => {
      tag.classList.remove('tag_selected');
      tag.classList.add('tag_bordered');
   })
};
// Добавляет выделение на нажатый тэг
const selectClickedTag = (clickedTag) => {
   clickedTag.classList.add('tag_selected');
   clickedTag.classList.remove('tag_bordered');
};
// Показывает все стратегии
const showAllStrategies = () => {
   let strategies = document.querySelectorAll('.strategy-wrapper .strategy');
   strategies.forEach(strategy => {
      strategy.classList.remove('strategy_hidden');
   })
};
// Показывает отфильтрованные стратегии
const filterStrategyBySelectedTag = (selectedTag) => {
   let strategies = document.querySelectorAll('.strategy-wrapper .strategy');
   strategies.forEach(strategy => {
      strategy.classList.add('strategy_hidden');
      strategy.querySelectorAll('.tag').forEach(tag => {
         if (tag.innerText === selectedTag) {
            strategy.classList.remove('strategy_hidden');
         }
      })
   })
};

const renderArticlesToDom = () => {
   let strategiesWrapper = getStrategiesWrapper();
   generateArticles(data).forEach(article => {
      strategiesWrapper.append(article.generateArticle())
   });

   addStrategyClickHandler();
};

const getStrategiesWrapper = () => {
   const strategiesContainer = document.querySelector('.strategy-wrapper');
   strategiesContainer.innerHTML = '';
   return strategiesContainer;
};

const generateArticles = (data) => {
   let articles = [];
   data.forEach(article => {
      articles.push(new Article(article));
   });

   return articles;
};

const addToolsClickHandler = () => {
   document.querySelector('.tools__button .button').addEventListener('click', () => {
      generateToolsModal();
   })
};

const generateToolsModal = () => {
   renderModalWindow('Test content');
};

const renderModalWindow = (content) => {
   let modal = new Modal ('tools-modal');
   modal.buildModal(content);
};

const addStrategyClickHandler = () => {
   document.querySelector('.strategy-wrapper').addEventListener('click', (e) => {
      if (e.target.closest('.strategy')) {
         let clickStrategyId = e.target.closest('.strategy').getAttribute('data-id');
         let clickStrategyData = getClickData(clickStrategyId);

         renderArticleModalWindow(clickStrategyData);
      }
   });
};

const getClickData = (id) => {
   return data.find(article => article.id == id);
};

const renderArticleModalWindow = (article) => {
   let modal = new ArticleModal ('article-modal', article);
   modal.renderModal();
};