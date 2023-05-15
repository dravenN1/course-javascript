import pages from './pages';
import model from '../loft-photo/model'
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

import mainPage from './mainPage';
import loginPage from './loginPage';

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();
