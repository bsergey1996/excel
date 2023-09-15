import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.store = options.store;
        this.unsubscribers = [];

       // console.log(options)

        this.prepare();
    }

    // Настраиваем компонент до init
    prepare(){}

    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }

    // Уведоляем слушателей про события event
    $emit(event, ...args){
        this.emitter.emit(event, ...args)
    }

    // Подписываемсся на события event
    $on(event, fn){
     const unsub = this.emitter.subsribe(event, fn);
     this.unsubscribers.push(unsub)
    }

    $dispatch(action){
        this.store.dispatch(action);
    }

    // Сюда приходят только те изменения
    // по тем полям, на которые мы подписались
    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // Инициализирем компонент
    // Добавляем DOM слушателей
    init(){
        this.initDomListeners();
    }

    // Удаляем компонет
    // Чистим слушателей
    destroy(){
        this.removeDomListeners();
        this.unsubscribers.forEach(unsub => unsub())
    }
}
