
import { expect } from "chai";
import { Soletta } from "../../src/cards/Soletta";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("Soletta", function () {
    it("Should play", function () {
        const card = new Soletta();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        const action = card.play(player, game);
        expect(action).to.eq(undefined);
        expect(player.heatProduction).to.eq(7);
    });
});
