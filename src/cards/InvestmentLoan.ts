
import { Tags } from "./Tags";
import { IProjectCard } from "./IProjectCard";
import { CardType } from "./CardType";
import { Game } from "../Game";
import { Player } from "../Player";

export class InvestmentLoan implements IProjectCard {
    public cost: number = 3;
    public tags: Array<Tags> = [Tags.EARTH];
    public cardType: CardType = CardType.EVENT;
    public name: string = "Investment Loan";
    public canPlay(player: Player): boolean {
        return player.megaCreditProduction >= -4;
    }
    public play(player: Player, _game: Game) {
        player.megaCreditProduction--;
        player.megaCredits += 10;
        return undefined;
    }
}
