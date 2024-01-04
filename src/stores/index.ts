import { createPinia } from 'pinia';
import logPlugin from './logPlugin';

const pinia = createPinia();
pinia.use(logPlugin);

export default pinia;
