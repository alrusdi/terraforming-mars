
import { expect } from "chai";
import { Research } from "../../src/cards/Research";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("Research", function () {
    it("Should play", function () {
        const card = new Research();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        const action = card.play(player, game);
        expect(action).to.eq(undefined);
        expect(player.victoryPoints).to.eq(1);
        expect(player.cardsInHand.length).to.eq(2);
        expect(player.cardsInHand[0]).not.to.eq(player.cardsInHand[1]);
    });
});
