
import { expect } from "chai";
import { EnergySaving } from "../../src/cards/EnergySaving";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("EnergySaving", function () {
    it("Should play", function () {
        const card = new EnergySaving();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        const action = card.play(player, game);
        expect(player.energyProduction).to.eq(0);
        expect(action).to.eq(undefined);
        const landSpace = game.getAvailableSpacesOnLand(player)[0];
        game.addCityTile(player, landSpace.id);
        card.play(player, game);
        expect(player.energyProduction).to.eq(1); 
    });
});
