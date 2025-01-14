
import { PlayerInput } from "../PlayerInput";
import { PlayerInputTypes } from "../PlayerInputTypes";
import { SelectSpace } from "./SelectSpace";
import { SelectHowToPay } from "./SelectHowToPay";
import { SelectCard } from "./SelectCard";
import { CorporationCard } from "../cards/corporation/CorporationCard";
import { IProjectCard } from "../cards/IProjectCard";
import { SelectPlayer } from "./SelectPlayer";
import { OrOptions } from "./OrOptions";

export class AndOptions implements PlayerInput {
    public inputType: PlayerInputTypes = PlayerInputTypes.AND_OPTIONS;
    public onend?: () => void;
    public title: string = "Select all";
    public options: Array<PlayerInput>;
    constructor(public cb: () => PlayerInput | undefined, ...options: Array<OrOptions | SelectPlayer | SelectHowToPay | SelectSpace | SelectCard<CorporationCard> | SelectCard<IProjectCard>>) {
        this.options = options;
    }
}
