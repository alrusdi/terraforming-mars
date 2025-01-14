
import { expect } from "chai";
import { ArcticAlgae } from "../../src/cards/ArcticAlgae";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("ArcticAlgae", function () {
    it("Can't play", function () {
        const card = new ArcticAlgae();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        game.increaseTemperature(player, 3); // -24
        game.increaseTemperature(player, 3); // -18
        game.increaseTemperature(player, 3); // -12
        game.increaseTemperature(player, 1); // -10
        expect(card.canPlay(player, game)).to.eq(false);
    });
    it("Should play", function () {
        const card = new ArcticAlgae();
        const player = new Player("test", Color.BLUE, false);
        const player2 = new Player("test2", Color.RED, false);
        const game = new Game("foobar", [player,player2], player);
        card.play(player);
        expect(player.plants).to.eq(1);
        player.playedCards.push(card);
        game.addOceanTile(player, game.getAvailableSpacesForOcean(player)[0].id);
        expect(player.plants).to.eq(3); 
    });
});
