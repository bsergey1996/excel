 export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // dispatch, fire, trigger
    // Уведомляем слушаелей если они есть
    // table.emit('table:select', {a: 1})
    emit(event, ...args) {
        if(!Array.isArray(this.listeners[event])){
           return false;
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        });

        return true;
    }

    // on, listen
    // Подписываемся на уведомление
    // Добавляем нового слушателя
    // formula.subscribe('table:select', () => {})
    subsribe(event, fn){
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// Example
// const emitter = new Emitter();
//
// const unsub = emitter.subsribe('vm',
//         data => console.log('Sub:', data));
//
// emitter.emit('vm', 42);
//
// setTimeout(() => {
//     emitter.emit('vm', '2 sec');
// }, 2000);
//
//  setTimeout(() => {
//      unsub();
//  }, 4000);
//
//  setTimeout(() => {
//      emitter.emit('vm', '6 sec');
//  }, 6000);
