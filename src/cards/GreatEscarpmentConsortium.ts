
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectPlayer } from "../inputs/SelectPlayer";

export class GreatEscarpmentConsortium implements IProjectCard {
    public cost: number = 6;
    public tags: Array<Tags> = [];
    public name: string = "Great Escarpment Consortium";
    public cardType: CardType = CardType.AUTOMATED;
    public canPlay(player: Player): boolean {
        return player.steelProduction > 0;
    }
    public play(player: Player, game: Game) {
        if (game.getPlayers().length == 1) {
            player.steelProduction++;
            return undefined;
        }
        return new SelectPlayer(game.getPlayers(), "Select player to decrease steel production 1 step", (foundPlayer: Player) => {
            foundPlayer.steelProduction = Math.max(0, foundPlayer.steelProduction - 1);
            player.steelProduction++;
            return undefined;
        });
    }
}
