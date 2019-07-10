const Pos_Machine = require('../main/main');
const database = [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
  const promotion = [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
  const tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
  ];


it ('should print true when call isEachBarValid given ITEM000000', () => {
    let barcode = 'ITEM000000';
    expect(Pos_Machine.isEachBarValid(barcode,database)).toBe(true);
});
it ('should print false when call isEachBarValid given 000000', () => {
    let barcode = '000000';
    expect(Pos_Machine.isEachBarValid(barcode,database)).toBe(false);
});
it ('should print false when call isEachBarValid given ITEM999999', () => {
    let barcode = 'ITEM999999';
    expect(Pos_Machine.isEachBarValid(barcode,database)).toBe(false);
});
it ('should print true when call isEachBarValid given ITEM000003-2.5', () => {
    let barcode = 'ITEM000003-2.5';
    expect(Pos_Machine.isEachBarValid(barcode,database)).toBe(true);
});

it ('should print listInfo when call isCartItemsValid given barcodes', () => {
    let barcodes = ['ITEM000000','000000','ITEM999999','ITEM000003-2.5'];
    expect(Pos_Machine.isCartItemsValid(barcodes,database)).toStrictEqual([{itemId:'ITEM000000',valid:true},{itemId:'000000',valid:false},{itemId:'ITEM999999',valid:false},{itemId:'ITEM000003-2.5',valid:true}]);
});

it ('should print ItemInfo when call getItemListInfo given barcode', () => {
    let barcode = 'ITEM000000';
    expect(Pos_Machine.getItemListInfo(barcode,database)).toStrictEqual( [{"barcode": "ITEM000000", "name": "可口可乐", "price": 3, "unit": "瓶"}]);
});

it ('should print ItemList when call getItemLists given barcodes', () => {
    let barcodes = ['ITEM000000','000000','ITEM999999','ITEM000003-2.5'];
    expect(Pos_Machine.getItemLists(barcodes)).toStrictEqual({ ITEM000000: 1, '000000': 1, ITEM999999: 1, ITEM000003: 2.5 });
});

it ('should print ItemSumCost when call getSumItemsCost given Lists', () => {
  let barcodes = ['ITEM000000','ITEM000003-2.5'];
  expect(Pos_Machine.getSumItemsCost(Pos_Machine.getItemLists(barcodes),database,promotion)).toStrictEqual([ { barcode: 'ITEM000000', count: 1, price: 3, promotion: 0 },{ barcode: 'ITEM000003', count: 2.5, price: 37.5, promotion: 0 } ]);
});

it ('should print 40.5 when call getTotalPrices given Lists', () => {
  let barcodes = ['ITEM000000','ITEM000003-2.5'];
  expect(Pos_Machine.getTotalPrices(Pos_Machine.getSumItemsCost(Pos_Machine.getItemLists(barcodes),database,promotion))).toBe(40.5);
});

it ('should print 0 when call getTotalPromotion given Lists', () => {
  let barcodes = ['ITEM000000','ITEM000003-2.5'];
  expect(Pos_Machine.getTotalPromotion(Pos_Machine.getSumItemsCost(Pos_Machine.getItemLists(barcodes),database,promotion))).toBe(0);
});

it ('should print receipt when call createReciept given Lists', () => {
  let sumItemsCost = Pos_Machine.getSumItemsCost(Pos_Machine.getItemLists(tags),database,promotion);
  let totalPrices = Pos_Machine.getTotalPrices(Pos_Machine.getSumItemsCost(Pos_Machine.getItemLists(tags),database,promotion));
  let totalPromotion = Pos_Machine.getTotalPromotion(Pos_Machine.getSumItemsCost(Pos_Machine.getItemLists(tags),database,promotion));
  expect(Pos_Machine.createReciept(sumItemsCost,totalPrices,totalPromotion,database)).toBe(`***<没钱赚商店>收据***\n名称：雪碧，数量：5瓶，单价：3(元)，小计：12(元)\n名称：荔枝，数量：2.5斤，单价：15(元)，小计：37.5(元)\n名称：方便面，数量：3袋，单价：4.5(元)，小计：9(元)\n----------------------\n总计：58.5(元)\n节省：7.5(元)\n**********************`);
});