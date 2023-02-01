import { Op } from 'sequelize';
import { BoardGame } from './database';

export const findBoardGamesIn = async (boardgameIds: number[]) => {
    const boardgames = (
        await BoardGame.findAll({
            where: {
                id: { [Op.in]: boardgameIds }
            }
        })
    ).map(({ dataValues }) => {
        const { id, name, imageUrls, rulesUrl } = dataValues;
        return { id, name, imageUrls, rulesUrl };
    });
    return boardgames;
};
