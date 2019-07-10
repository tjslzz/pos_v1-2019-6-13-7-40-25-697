'use strict';

const isEachBarValid = (barcode,database)=>{
    let itemIds = database.map((item)=>item.barcode);
    return itemIds.includes(barcode.split('-')[0]);
}

module.exports = {isEachBarValid};