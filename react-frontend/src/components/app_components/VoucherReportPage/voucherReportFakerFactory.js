
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
voucherCode: faker.lorem.sentence(1),
totalIssued: faker.lorem.sentence(1),
totalRedeemed: faker.lorem.sentence(1),
redemptionRate: faker.lorem.sentence(1),
totalDiscountGiven: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
