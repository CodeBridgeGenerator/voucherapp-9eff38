
import { faker } from "@faker-js/faker";
export default (user,count,voucherCodeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
voucherCode: voucherCodeIds[i % voucherCodeIds.length],
customerName: faker.name.fullName(""),
customerEmail: faker.internet.email(""),
transactionAmount: faker.datatype.number(""),
discountAmount: faker.datatype.number(""),
usageDate: faker.date.past(""),
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
