
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class MassConverter implements IProjectCard {
    public cost: number = 8;
    public tags: Array<Tags> = [Tags.SCIENCE, Tags.ENERGY];
    public name: string = "Mass Converter";
    public cardType: CardType = CardType.ACTIVE;
    public canPlay(player: Player): boolean {
        return player.getTagCount(Tags.SCIENCE) >= 5;
    }
    public getCardDiscount(_player: Player, _game: Game, card: IProjectCard) {
        if (card.tags.indexOf(Tags.SPACE) !== -1) {
            return 2;
        }
        return 0;
    }
    public play(player: Player) {
        player.energyProduction += 6;
        return undefined;
    }
}
