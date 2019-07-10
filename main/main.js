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
    let item = database.filter((item)=>barcode.split('-')[0].match(item.barcode));
    return item;
}

const getItemLists = (barcodes) => {
    let ItemLists = new Object();
    barcodes.map((barcode)=>{
        let temp = barcode.split('-');
        temp.length == 2?ItemLists[temp[0]]==undefined?ItemLists[temp[0]]=temp[1]*1.00:ItemLists[temp[0]]+=temp[1]*1.00:ItemLists[temp[0]]==undefined?ItemLists[temp[0]]=1.00:ItemLists[temp[0]]+=1.00;
    });
    return ItemLists;
}

module.exports = {isEachBarValid,isCartItemsValid,getItemListInfo,getItemLists};