
import { IProjectCard } from "./IProjectCard";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { Tags } from "./Tags";

export class ProtectedHabitats implements IProjectCard {
    public cardType: CardType = CardType.ACTIVE;
    public cost: number = 5;
    public tags: Array<Tags> = [];
    public name: string = "Protected Habitats";
    public canPlay(): boolean {
        return true;
    }
    public play(_player: Player, _game: Game) { 
        return undefined;
    }
}
