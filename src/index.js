import './scss/index.scss'
import {Router} from '@core/routes/Router';
import {DashboardPage} from '@/Pages/DashboardPage';
import {ExcelPage} from '@/Pages/ExcelPage';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
});
