
import { expect } from "chai";
import { LunarBeam } from "../../src/cards/LunarBeam";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("LunarBeam", function () {
    it("Can play", function () {
        const card = new LunarBeam();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        player.megaCreditProduction = -4;
        expect(card.canPlay(player, game)).to.eq(false);
        player.megaCreditProduction = -3;
        expect(card.canPlay(player, game)).to.eq(true);
    });
    it("Should play", function () {
        const card = new LunarBeam();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        const action = card.play(player, game);
        expect(action).to.eq(undefined);
        expect(player.megaCreditProduction).to.eq(-2);
        expect(player.heatProduction).to.eq(2);
        expect(player.energyProduction).to.eq(2);
    });
});
