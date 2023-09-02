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

function toCell(row) {
        return function(_, col) {
            return `
        <div class="cell" 
        contenteditable 
        data-type="cell"
        data-col="${col}"
        data-id="${row}:${col}"></div>
       `
    }
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

    for (let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, col) => toCell(row, col))
            .map(toCell(row))
            .join('');

        rows.push(createRow(cells, row + 1));
    }

    return rows.join('');
}
