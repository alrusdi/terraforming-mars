
import { Tags } from "../Tags";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { CorporationCard } from "./CorporationCard";

export class PhoboLog implements CorporationCard {
    public name: string = "PhoboLog";
    public tags: Array<Tags> = [Tags.SPACE];
    public startingMegaCredits: number = 23;
    public play(player: Player, _game: Game) {
        player.titanium = 10;
        player.titaniumValue++;
        return undefined;
    }
}
