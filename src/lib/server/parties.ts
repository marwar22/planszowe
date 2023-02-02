import { Party, User } from './database';

export const findUserParties = async (userId: number) => {
    const user = (await User.findOne({
        include: [{ model: Party, through: { as: 'UserParty' } }],
        where: { id: userId }
    }))!.dataValues;
    return user.Parties.map(({ dataValues: { id, name, description, date, emailSent } }: any) => {
        return { id, name, description, date, emailSent };
    });
};
