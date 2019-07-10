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