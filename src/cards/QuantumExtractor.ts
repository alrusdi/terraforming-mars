
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class QuantumExtractor implements IProjectCard {
    public cost: number = 13;
    public tags: Array<Tags> = [Tags.SCIENCE, Tags.ENERGY];
    public name: string = "Quantum Extractor";
    public cardType: CardType = CardType.ACTIVE;
    public canPlay(player: Player): boolean {
        return player.getTagCount(Tags.SCIENCE) >= 4;
    }
    public getCardDiscount(_player: Player, _game: Game, card: IProjectCard) {
        if (card.tags.indexOf(Tags.SCIENCE) !== -1) {
            return 2;
        }
        return 0;
    }
    public play(player: Player) {
        player.energyProduction += 4;
        return undefined;
    }
}
