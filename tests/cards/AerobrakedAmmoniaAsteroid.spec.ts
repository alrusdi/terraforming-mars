
import { expect } from "chai";
import { AerobrakedAmmoniaAsteroid } from "../../src/cards/AerobrakedAmmoniaAsteroid";
import { Ants } from "../../src/cards/Ants";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("AerobrakedAmmoniaAsteroid", function () {
    it("Should play", function () {
        const card = new AerobrakedAmmoniaAsteroid();
        const player = new Player("test", Color.BLUE, false);
        player.playedCards.push(card);
        const game = new Game("foobar", [player,player], player);
        const action = card.play(player, game);
        expect(player.heatProduction).to.eq(3);
        expect(player.plantProduction).to.eq(1);

         // It's okay to not have a card to collect Microbes on
        expect(action).to.eq(undefined); 
    });

    it("Adds microbes to another card", function () {
        const card = new AerobrakedAmmoniaAsteroid();
        const player = new Player("test", Color.BLUE, false);
        player.playedCards.push(card);
        const game = new Game("microbes_add_game", [player,player], player);

        // Add card to collect Microbes on
        const selectedCard = new Ants();
        player.playedCards.push(selectedCard);

        const action = card.play(player, game);
        expect(player.heatProduction).to.eq(3);
        expect(player.plantProduction).to.eq(1);

        expect(action).not.to.eq(undefined); 
        if (action === undefined) return; // Compiller issue, sorry
        action.cb([selectedCard]);

        expect(player.getResourcesOnCard(selectedCard)).to.eq(2);
    });
});
