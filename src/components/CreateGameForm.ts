
import Vue from "vue";
import { Color } from "../Color";

interface CreateGameModel {
    firstIndex: number;
    players: Array<NewPlayerModel>;
	prelude: boolean;
}

interface NewPlayerModel {
    name: string;
    color: Color;
    beginner: boolean;
    first: boolean;
}

export const CreateGameForm = Vue.component("create-game-form", {
    data: function () {
        return {
            firstIndex: 0,
            players: [
                { name: "", color: Color.RED, beginner: false, first: false },
                { name: "", color: Color.GREEN, beginner: false, first: false },
                { name: "", color: Color.YELLOW, beginner: false, first: false },
                { name: "", color: Color.BLUE, beginner: false, first: false },
                { name: "", color: Color.BLACK, beginner: false, first: false }
            ],
			prelude: false
        } as CreateGameModel
    },
    methods: {
        createGame: function () {
            const players = this.$data.players.slice().map((player: any, index: number) => {
                player.first = (this.$data.firstIndex === index);
                return player;
            }).filter((player: any) => player.name);
			const prelude = this.$data.prelude;
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", "/game");
            xhr.onerror = function () {
                alert("Error creating game");
            }
            xhr.onload = () => {
                if (xhr.status === 200) {
                    window.history.replaceState(xhr.response, "Teraforming Mars - Game", "/game?id=" + xhr.response.id);
                    this.$root.$data.game = xhr.response;
                    this.$root.$data.screen = "game-home";
                } else {
                    alert("Unexpected server response");
                }
            };
            xhr.responseType = "json";
            xhr.send(JSON.stringify({
                players: players, prelude
            }));
        }
    },
    template: `
        <div id="create-game">
            <div id="buttonsContainer">
                <div id="buttonsContainer-header">
                    <div id="titleContainer">
                        <div class="title-style">SETUP NEW GAME</div>
                    </div>
                </div>
            

                <div id="buttonsContainer-body">
                    <div class="nes-container with-title" v-for="playerIndex in [1, 2, 3, 4, 5]">
                        <p class="nes-container.title">Player {{playerIndex}}</p>
                        <div class="nes-field">
                            <label :for="'playerName' + playerIndex">Name:</label>
                            <input v-model="players[playerIndex - 1].name" :id="'playerName' + playerIndex" type="text" class="nes-input" />
                        </div>
                        <label :for="'playerColor' + playerIndex">Color:</label>
                        <select :id="'playerColor' + playerIndex" v-model="players[playerIndex - 1].color">
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="yellow">Yellow</option>
                            <option value="blue">Blue</option>
                            <option value="black">Black</option>
                        </select>
                        <label>
                            <input type="checkbox" v-model="players[playerIndex - 1].beginner" />
                            <span>Is Beginner</span>
                        </label>
                        <label>
                            <input v-model="firstIndex" name="firstIndex" type="radio" v-bind:value="playerIndex - 1" />
                            <span>Goes First</span>
                        </label>
                    </div>
                </div>

                <div id="buttonsContainer-footer">
                    <label>
                            <input type="checkbox" v-model="prelude" />
                            <span>Use prelude extension ?</span>
                    </label>			
                    <button class="button btn-req" v-on:click="createGame">Create Game</button>
                </div>
            </div>
        </div>
    `
});

