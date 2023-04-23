const CODES = {
    A: 65,
    Z: 91
};

function toColumn(col, index) {
    return ` <div class="column" data-type="resizeble" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
            </div>`;
}

function createRow(content, index) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : '';
    return `
    <div class="row"  data-type="resizeble">
         <div class="row-info" data-row="${index}">
                ${index ? index : ''}
               ${resize}
         </div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toCell(_, index) {
    return `
    <div class="cell" data-cell="${index}" contenteditable data-col="${index}"></div>`
}


function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 25) {
    const colsCount = CODES.Z - CODES.A;

    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');
    
    rows.push(createRow(cols));

    const cell = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');

    for (let i = 0; i < rowsCount; i++){
        rows.push(createRow(cell, i + 1));
    }


    return rows.join('');
}
