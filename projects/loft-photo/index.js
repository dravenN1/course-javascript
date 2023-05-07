import pages from './pages';
import model from '../loft-photo/model'
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {
    const pageName = model.getRandomElement(pageNames);
    pages.openPage(pageName);
});
