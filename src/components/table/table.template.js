import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@/core/parse'

const CODES = {
    A: 65,
    Z: 91
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toColumn({col, index, width}) {
    return ` <div class="column" data-type="resizeble" data-col="${index}" style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
            </div>`;
}

function createRow(content, index, state) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : '';
    const height = getHeight(state, index);
    return `
    <div 
    class="row" 
     data-type="resizeble"
      data-row="${index}"
      style="height: ${height}">
         <div class="row-info" data-row="${index}">
                ${index ? index : ''}
               ${resize}
         </div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toCell(state, row) {
        return function(_, col) {
            const width = getWidth(state.colState, col);
            const id = `${row}:${col}`;
            const data = state.dataState[id];
            const styles = toInlineStyles({
                ...defaultStyles,
                ...state.stylesState[id]
            });
            return `
        <div class="cell" 
        contenteditable 
        data-type="cell"
        data-col="${col}"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width: ${width}">
            ${parse(data) || ''}</div>
       `
    }
}


function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}


export function createTable(rowsCount = 25, state = {}) {
    const colsCount = CODES.Z - CODES.A;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('');
    
    rows.push(createRow(cols, null, {}));

    for (let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, col) => toCell(row, col))
            .map(toCell(state, row))
            .join('');

        rows.push(createRow(cells, row + 1, state.rowState));
    }

    return rows.join('');
}
