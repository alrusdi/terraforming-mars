
import { expect } from "chai";
import { DeepWellHeating } from "../../src/cards/DeepWellHeating";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("DeepWellHeating", function () {
    it("Should play", function () {
        const card = new DeepWellHeating();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        const action = card.play(player, game);
        expect(action).to.eq(undefined);
        expect(player.energyProduction).to.eq(1);
        expect(game.getTemperature()).to.eq(-28);
    });
});
