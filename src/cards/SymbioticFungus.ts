
import { Tags } from "./Tags";
import { IActionCard } from "./ICard";
import { IProjectCard } from "./IProjectCard";
import { Player } from "../Player";
import { Game } from "../Game";
import { CardType } from "./CardType";
import { SelectCard } from "../inputs/SelectCard";

export class SymbioticFungus implements IActionCard, IProjectCard {
    public cost: number = 4;
    public tags: Array<Tags> = [Tags.MICROBES];
    public cardType: CardType = CardType.ACTIVE;
    public name: string = "Symbiotic Fungus";
    public canPlay(player: Player, game: Game): boolean {
        return game.getTemperature() >= -14 - (2 * player.getRequirementsBonus(game));
    }
    public play() {
        return undefined;
    }
    public canAct(_player: Player, game: Game): boolean {
        return game.getOtherMicrobeCards(this).length > 0;
    }
    public action(player: Player, game: Game) {
        const availableCards = game.getOtherMicrobeCards(this);
        return new SelectCard("Select card to add microbe", availableCards, (foundCards: Array<IProjectCard>) => {
            player.addResourceTo(foundCards[0]);
            return undefined;
        });
    }
}
 
