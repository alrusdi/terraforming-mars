
import { expect } from "chai";
import { TollStation } from "../../src/cards/TollStation";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("TollStation", function () {
    it("Should play", function () {
        const card = new TollStation();
        const player = new Player("test", Color.BLUE, false);
        const anotherPlayer = new Player("foo", Color.RED, false);
        const game = new Game("foobar", [player, anotherPlayer], player);
        const action = card.play(player, game);
        expect(action).to.eq(undefined);
        anotherPlayer.playedCards.push(card);
        expect(player.megaCreditProduction).to.eq(0);
        card.play(player, game);
        expect(player.megaCreditProduction).to.eq(1);
    });
});
