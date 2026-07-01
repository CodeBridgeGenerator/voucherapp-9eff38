
import { faker } from "@faker-js/faker";
export default (user,count,categoryIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
voucherCode: faker.string.alphaNumeric("8"),
voucherTitle: faker.commerce.productName("8"),
description: faker.lorem.paragraph(""),
category: categoryIds[i % categoryIds.length],
discountType: faker.lorem.sentence(""),
discountValue: faker.datatype.number(""),
minPurchaseAmount: faker.datatype.number(""),
maxDiscountAmount: faker.datatype.number(""),
startDate: faker.date.soon(""),
expiryDate: faker.date.future(""),
quantityLimit: faker.datatype.number(""),
quantityUsed: faker.datatype.number(""),
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
