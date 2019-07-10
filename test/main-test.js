'use strict';

describe('pos', () => {

  it('should print text', () => {

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

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3(元)，小计：12(元)
名称：荔枝，数量：2.5斤，单价：15(元)，小计：37.5(元)
名称：方便面，数量：3袋，单价：4.5(元)，小计：9(元)
----------------------
总计：58.5(元)
节省：7.5(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
