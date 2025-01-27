
import { Game } from "../Game";
import { Player } from "../Player";
import { IProjectCard } from "./IProjectCard";
import { CardType } from "./CardType";
import { Tags } from "./Tags";
import { OrOptions } from "../inputs/OrOptions";
import { SelectPlayer } from "../inputs/SelectPlayer";
import { SelectOption } from "../inputs/SelectOption";

export class HiredRaiders implements IProjectCard {
    public cost: number = 1;
    public tags: Array<Tags> = [];
    public cardType: CardType = CardType.EVENT;
    public name: string = "Hired Raiders";
    public canPlay(): boolean {
        return true;
    }
    public play(player: Player, game: Game) {

        if (game.getPlayers().length == 1) {
            return new OrOptions(
                new SelectOption("Steal 2 steel", () => {
                    player.steel += 2;
                    return undefined;
                }),
                new SelectOption("Steal 3 mega credit", () => {
                    player.megaCredits += 3;
                    return undefined;
                })
            );
        }

        return new OrOptions(
            new SelectPlayer(game.getPlayers(), "Select player to steal up to 2 steel", (selectedPlayer: Player) => {
                player.steel += Math.min(2, selectedPlayer.steel);
                selectedPlayer.steel = Math.max(0, selectedPlayer.steel - 2);
                return undefined;
            }),
            new SelectPlayer(game.getPlayers(), "Select player to steal up to 3 mega credits", (selectedPlayer: Player) => {
                player.megaCredits += Math.min(3, selectedPlayer.megaCredits);
                selectedPlayer.megaCredits = Math.max(0, selectedPlayer.megaCredits - 3);
                return undefined;
            })
        );
    }
}

