
import { expect } from "chai";
import { CommercialDistrict } from "../../src/cards/CommercialDistrict";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { SelectSpace } from "../../src/inputs/SelectSpace";
import { TileType } from "../../src/TileType";

describe("CommercialDistrict", function () {
    it("Can't play", function () {
        const card = new CommercialDistrict();
        const player = new Player("test", Color.BLUE, false);
        expect(card.canPlay(player)).to.eq(false);
    });
    it("Should play", function () {
        const card = new CommercialDistrict();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        player.energyProduction = 1;
        const action = card.play(player, game);
        expect(action).not.to.eq(undefined);
        expect(action instanceof SelectSpace);
        action.cb(action.availableSpaces[0]);
        expect(player.energyProduction).to.eq(0);
        expect(player.megaCreditProduction).to.eq(4);
        const adjacent = game.getAdjacentSpaces(action.availableSpaces[0]);
        adjacent[0].tile = { tileType: TileType.CITY, card: card.name };
        adjacent[0].player = player;
        card.onGameEnd(player, game);
        expect(player.victoryPoints).to.eq(1);
    });
});
