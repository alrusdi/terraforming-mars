
import Vue from "vue";

export const GameHome = Vue.component("game-home", {
    props: ["game"],
    data: function () {
        return {}
    },
    template: `
        <div id="game-home">
            <div id="buttonsContainer">
                <div id="buttonsContainer-header">
                    <div id="titleContainer">
                        <div class="title-style">SEND LINKS TO PLAYERS</div>
                    </div>
                </div>

                <div id="buttonsContainer-body">
                    <ul>
                        <li v-for="player in game.players">
                            <a :href="'/player?id=' + player.id">{{player.name}} - {{player.color}}</a>
                        </li>
                    </ul>
                </div>
                
                <div id="buttonsContainer-footer">
                </div>
            </div>
        </div>
    `
});

