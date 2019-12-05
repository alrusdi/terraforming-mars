
import Vue from "vue";

import { Board } from "./Board";
import { Card } from "./Card";
import { ClaimedMilestone } from "./ClaimedMilestone";
import { FundedAward } from "./FundedAward";
import { OtherPlayer } from "./OtherPlayer";
import { PlayerResources } from "./PlayerResources";
import { WaitingFor } from "./WaitingFor";

export const PlayerHome = Vue.component("player-home", {
    props: ["player"],
    components: {
        "board": Board,
        "card": Card,
        "claimed-milestone": ClaimedMilestone,
        "funded-award": FundedAward,
        "other-player": OtherPlayer,
        "player-resources": PlayerResources,
        "waiting-for": WaitingFor
    },
    data: function () {
        return {}
    },
    template: `
        <div id="player-home">
            <div id="buttonsContainer" style="position: sticky; top: -50px; z-index: 2;">
                <div id="buttonsContainer-header">
                    <div id="titleContainer">
                        <div class="title-style">
                            Player Home - {{player.name}}
                        </div>
                    </div>
                </div>
                <div id="buttonsContainer-body">
                    <div v-if="player.corporationCard">
                        <player-resources :player="player"></player-resources>
                    </div>
                </div>
                <div id="buttonsContainer-footer"></div>
            </div>

            <div style="max-width: 1280px; margin: 0 auto;">
                <div>
                    <section>
                        <dialog class="nes-dialog" id="dialog-default">
                            <form method="dialog">
                                <p class="title">Error with input</p>
                                <p id="dialog-default-message"></p>
                                <menu class="dialog-menu">
                                    <button class="nes-btn is-primary">OK</button>
                                </menu>
                            </form>
                        </dialog>
                    </section>
                </div>

                <div v-if="player.phase === 'end'">
                    <h2>This game is over!</h2>
                    <div v-for="otherPlayer in player.players">
                        <div :style="'color:' + otherPlayer.color">{{otherPlayer.name}} - {{otherPlayer.victoryPoints}}</div>
                    </div>
                </div>

                <div v-if="player.corporationCard">
                    <div class="nofloat">
                        <div class="block-title">Corporation Card</div>
                        <card hideCost="true" :card="player.corporationCard"></card>
                    </div>

                    <div v-if="player.playedCards.length > 0" class="nofloat">
                        <div class="block-title">Played Cards</div>
                        <div v-for="card in player.playedCards" :key="card.name" class="cardbox">
                            <card hideCost="true" :card="card.name" :resources="card.resources"></card>
                        </div>
                    </div>

                    <div class="nofloat" v-if="player.cardsInHand.length > 0">
                        <div class="block-title">Cards In Hand</div>
                        <div v-for="card in player.cardsInHand" :key="card.name" class="cardbox">
                            <card :card="card.name" :resources="card.resources"></card>
                        </div>
                    </div>

                    <div class="nofloat">
                        <div id="buttonsContainer">
                            <div id="buttonsContainer-header">
                                <div id="titleContainer">
                                    <div class="title-style">
                                        Board
                                    </div>
                                </div>
                            </div>

                            <div id="buttonsContainer-body">
                                <div class="board-cont">
                                    <board :spaces="player.spaces"></board>
                                </div>
                                <div class="params-cont">
                                    <h2>Oxygen Level ({{player.oxygenLevel}})</h2>
                                    <div>
                                        <progress class="nes-progress is-success" max="14" :value="player.oxygenLevel"></progress>
                                    </div>
                                    <h2>Temperature ({{player.temperature}})</h2>
                                    <div>
                                        <progress class="nes-progress is-warning" max="38" :value="player.temperature + 30"></progress>
                                    </div>
                                    <h2>Oceans ({{player.oceans}})</h2>
                                    <div>
                                        <progress class="nes-progress is-primary" max="9" :value="player.oceans"></progress>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="player.claimedMilestones.length > 0">
                        <h2>Claimed Milestones</h2>
                        <div>
                            <claimed-milestone v-for="claimedMilestone in player.claimedMilestones" :key="claimedMilestone.milestone" :players="player.players" :claimedmilestone="claimedMilestone"></claimed-milestone>
                        </div>
                    </div>

                    <div v-if="player.fundedAwards.length > 0">
                        <h2>Funded Awards</h2>
                        <div>
                            <funded-award v-for="fundedAward in player.fundedAwards" :key="fundedAward.award" :players="player.players" :fundedaward="fundedAward"></funded-award>
                        </div>
                    </div>

                    <div v-if="player.players.length > 1">
                        <h2>Other Players</h2>
                        <div v-for="otherPlayer in player.players" :key="otherPlayer.id">
                            <other-player v-if="otherPlayer.id !== player.id" :player="otherPlayer"></other-player>
                        </div>
                    </div>
                </div>

                <div class="nofloat">
                    <div id="buttonsContainer">
                        <div id="buttonsContainer-header">
                            <div id="titleContainer">
                                <div class="title-style">
                                    Actions
                                </div>
                            </div>
                        </div>

                        <div id="buttonsContainer-body">
                            <div class="waiting-for">
                                <waiting-for v-if="player.phase !== 'end'" :players="player.players" :player="player" :waitingfor="player.waitingFor"></waiting-for>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    `
});
