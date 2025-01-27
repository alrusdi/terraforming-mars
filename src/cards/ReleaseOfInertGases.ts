
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class ReleaseOfInertGases implements IProjectCard {
    public cost: number = 14;
    public tags: Array<Tags> = [];
    public name: string = "Release of Inert Gases";
    public cardType: CardType = CardType.EVENT;
    public canPlay(): boolean {
        return true;
    }
    public play(player: Player, _game: Game) {
        player.terraformRating += 2;
        return undefined;
    }
}
