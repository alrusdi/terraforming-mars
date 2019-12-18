import { IMilestone } from "./IMilestone";
import { Player } from "../Player";
import { Game } from "../Game";
import { TileType } from "../TileType";

export class Mayor implements IMilestone {
    public name: string = "Mayor";
    public description: string = "Owning at least 3 city tiles"
    public canClaim(player: Player, game: Game): boolean {
        return game.getSpaceCount(TileType.CITY, player) >= 3;
    }   
}