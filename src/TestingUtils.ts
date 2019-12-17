import { Player } from "./Player";
import { Game } from "./Game";
import * as constants from "./constants"
import { SpaceType } from "./SpaceType";


export const maxOutOceans = function(player: Player, game: Game, toValue: number = 0): void {
    if (toValue < 1) {
        toValue = constants.MAX_OCEAN_TILES;
    }
    
    for (const space of game.getSpaces(SpaceType.OCEAN)) {
        if (game.getOceansOnBoard() >= toValue) break;
        game.addOceanTile(player, space.id)
    }
};