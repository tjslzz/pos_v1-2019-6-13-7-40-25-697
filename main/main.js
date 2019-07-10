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
    barcodes.map((barcode)=>{barcode.split('-').length == 2?ItemLists[barcode.split('-')[0]]==undefined?ItemLists[barcode.split('-')[0]]=barcode.split('-')[1]*1.00:ItemLists[barcode.split('-')[0]]+=barcode.split('-')[1]*1.00:ItemLists[barcode.split('-')[0]]==undefined?ItemLists[barcode.split('-')[0]]=1.00:ItemLists[barcode.split('-')[0]]+=1.00;});
    return ItemLists;
}

const getSumItemsCost = (ItemLists,database,promotion) => {
    var sumItemsCost = new Array();
    for(let item in ItemLists){
        let temp = getItemListInfo(item,database)[0];
        if(promotion[0].barcodes.includes(item)){
            let promot = parseInt(ItemLists[item] / 3);
            sumItemsCost.push({barcode:item,price:temp.price*(ItemLists[item] - promot),promotion:temp.price*promot});
        }
        else{
            sumItemsCost.push({barcode:item,price:temp.price*ItemLists[item],promotion:0});
        }
    }
    return sumItemsCost;
}

module.exports = {isEachBarValid,isCartItemsValid,getItemListInfo,getItemLists,getSumItemsCost};