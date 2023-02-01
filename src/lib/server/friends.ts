import { Op } from 'sequelize';
import { User, UserFriend } from './database';

export const findFriends = async (userId: number) => {
    const friends = await UserFriend.findAll({
        where: {
            UserId: userId
        }
    });
    return friends;
};
export const findFriendIds = async (userId: number) => {
    const friends = await findFriends(userId);
    const friendIds = friends.map((friend) => friend.dataValues.FriendId);
    friendIds.push(userId);
    return friendIds;
};
export const findPotentialFriends = async (userId: number, limit: number | undefined) => {
    const friendIds = await findFriendIds(userId);
    const users = (
        await User.findAll({
            where: {
                id: { [Op.notIn]: friendIds }
            },
            limit: limit
        })
    ).map(({ dataValues }) => {
        const { id, username, email } = dataValues;
        return { id, username, email };
    });
    return users;
};

export const findFriendsIn = async (userId: number, friendIds: number[]) => {
    const friends = (
        await User.findAll({
            where: {
                id: { [Op.in]: friendIds }
            }
        })
    ).map(({ dataValues }) => {
        const { id, username, email } = dataValues;
        return { id, username, email };
    });
    return friends;
};
