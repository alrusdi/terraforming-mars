
import { IProjectCard } from "./IProjectCard";
import { CardType } from "./CardType";
import { SpaceType } from "../SpaceType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SpaceName } from "../SpaceName";
import { TileType } from "../TileType";
import { Tags } from "./Tags";
import { ISpace } from "../ISpace";
import { SelectSpace } from "../inputs/SelectSpace";

export class LavaFlows implements IProjectCard {
    public cost: number = 18;
    public tags: Array<Tags> = [];
    public name: string = "Lava Flows";
    public cardType: CardType = CardType.EVENT;
    private getAvailableSpaces(player: Player, game: Game): Array<ISpace> {
        return game.getSpaces(SpaceType.LAND)
                .filter((space) => space.tile === undefined && (space.player === undefined || space.player === player))
        .filter((space) => space.id === SpaceName.THARSIS_THOLUS ||
                           space.id === SpaceName.ASCRAEUS_MONS ||
                           space.id === SpaceName.ARSIA_MONS ||
                           space.id === SpaceName.PAVONIS_MONS);
    }
    public canPlay(player: Player, game: Game): boolean {
        return this.getAvailableSpaces(player, game).length > 0;
    }
    public play(player: Player, game: Game) {
        return new SelectSpace("Select either Tharsis Tholus, Ascraeus Mons, Pavonis Mons or Arsia Mons", this.getAvailableSpaces(player, game), (space: ISpace) => {
            game.addTile(player, SpaceType.LAND, space, { tileType: TileType.SPECIAL });
            return game.increaseTemperature(player, 2);
        });
    }
}

