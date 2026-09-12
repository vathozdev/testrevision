import './styles.css';
import { items } from './data';
import { renderList } from './dom';

const app = document.querySelector('#app');
app.innerHTML = renderList(items);
