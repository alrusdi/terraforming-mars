
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class OptimalAerobraking implements IProjectCard {
    public cost: number = 7;
    public tags: Array<Tags> = [Tags.SPACE];
    public cardType: CardType = CardType.ACTIVE;
    public name: string = "Optimal Aerobraking";
    public canPlay(): boolean {
        return true;
    }
    public onCardPlayed(player: Player, _game: Game, card: IProjectCard) {
        if (card.cardType === CardType.EVENT && card.tags.indexOf(Tags.SPACE) !== -1) {
            player.megaCredits += 3;
            player.heat += 3;
        }
    }
    public play() {
        return undefined;
    }
}
