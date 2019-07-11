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
    barcodes.map((barcode)=>{barcode.split('-').length == 2?(ItemLists[barcode.split('-')[0]]==undefined?ItemLists[barcode.split('-')[0]]=barcode.split('-')[1]*1.00:ItemLists[barcode.split('-')[0]]+=barcode.split('-')[1]*1.00):ItemLists[barcode.split('-')[0]]==undefined?ItemLists[barcode.split('-')[0]]=1.00:ItemLists[barcode.split('-')[0]]+=1.00;});
    return ItemLists;
}

const getSumItemsCost = (ItemLists,database,promotion) => {
    let sumItemsCost = new Array();
    for(let item in ItemLists){
        if(promotion[0].barcodes.includes(item)){
            let promot = parseInt(ItemLists[item] / 3);
            sumItemsCost.push({barcode:item,price:getItemListInfo(item,database)[0].price*(ItemLists[item] - promot),promotion:getItemListInfo(item,database)[0].price*promot,count:ItemLists[item]});
        }
        else{
            sumItemsCost.push({barcode:item,price:getItemListInfo(item,database)[0].price*ItemLists[item],promotion:0.00,count:ItemLists[item]});
        }
    }
    return sumItemsCost;
}

const getTotalPrices = (sumItemsCost) => {
    return sumItemsCost.reduce((pre,cur)=>{pre.price += cur.price;return pre;}).price;
}

const getTotalPromotion = (sumItemsCost) => {
    return sumItemsCost.reduce((pre,cur)=>{pre.promotion += cur.promotion;return pre;}).promotion;
}

const createReciept = (sumItemsCost,totalPrices,totalPromotion,database) => {
    let msg = "***<没钱赚商店>收据***\n";
    sumItemsCost.forEach((item)=>{
        let temp = getItemListInfo(item.barcode,database)[0];
        msg += `名称：${temp.name}，数量：${item.count}${temp.unit}，单价：${temp.price}(元)，小计：${item.price}(元)\n`
    });
    msg += `----------------------\n总计：${totalPrices}(元)\n节省：${totalPromotion}(元)\n**********************`;
    return msg;
}

const printReceipt = (barcodes) => {
    let database = loadAllItems();
    let promotion = loadPromotions();
    let resultValid = [];
    let itemList = [];
    let sumItemsCost = new Array();
    let totalPrices = 0.00;
    let totalPromotion = 0.00;
    let msg = "";
    resultValid = isCartItemsValid(barcodes,database).filter((item)=>item.valid === false);
    if(resultValid.length){
        console.log(resultValid);
        return;
    }
    else{
        itemList = getItemLists(barcodes);
        sumItemsCost = getSumItemsCost(itemList,database,promotion);
        totalPrices = getTotalPrices(JSON.parse(JSON.stringify(sumItemsCost)));
        totalPromotion = getTotalPromotion(JSON.parse(JSON.stringify(sumItemsCost)));
        msg = createReciept(sumItemsCost,totalPrices,totalPromotion,database);
        console.log(msg);
        return;
    }
}

module.exports = {isEachBarValid,isCartItemsValid,getItemListInfo,getItemLists,getSumItemsCost,getTotalPrices,getTotalPromotion,createReciept,printReceipt};