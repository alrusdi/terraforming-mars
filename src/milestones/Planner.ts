import { IMilestone } from "./IMilestone";
import { Player } from "../Player";
import { Game } from "../Game";

export class Planner implements IMilestone {
    public name: string = "Planner";
    public description: string = "Having at least 16 cards in your hand when you claim this milestone"
    public canClaim(player: Player, _game: Game): boolean {
        return player.cardsInHand.length >= 16;
    }   
}