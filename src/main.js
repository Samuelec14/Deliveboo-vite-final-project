import { createApp } from 'vue';
import App from './pages/App.vue';
import { router } from './router'; // Importa l'istanza del router dal file del router
import 'bootstrap/dist/css/bootstrap.css'; // Importa il file CSS di Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Importa il file JS di Bootstrap
import { createStore } from 'vue';
import { store } from './store'; 

createApp(App).use(router).mount('#app');


