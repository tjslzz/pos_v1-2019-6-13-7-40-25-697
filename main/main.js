'use strict';

const isEachBarValid = (barcode,database)=> {
    let itemIds = database.map((item)=>item.barcode);
    let eachBarValid = itemIds.includes(barcode.split('-')[0]);
    return eachBarValid;
}

const isCartItemsValid = (barcodes,database) => {
    let resultValid = barcodes.map((item)=>(isEachBarValid(item,database)?{itemId:item,valid:true}:{itemId:item,valid:false}));
    return resultValid;
}

const getItemListInfo = (barcode,database) => {
    return database.filter((item)=>barcode.split('-')[0].match(item.barcode));
}

module.exports = {isEachBarValid,isCartItemsValid,getItemListInfo};