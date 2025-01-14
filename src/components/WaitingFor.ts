
import Vue from "vue";

import { AndOptions } from "./AndOptions";
import { OrOptions } from "./OrOptions";
import { PlayerInputFactory } from "./PlayerInputFactory";
import { SelectAmount } from "./SelectAmount";
import { SelectCard } from "./SelectCard";
import { SelectHowToPay } from "./SelectHowToPay";
import { SelectHowToPayForCard } from "./SelectHowToPayForCard";
import { SelectOption } from "./SelectOption";
import { SelectPlayer } from "./SelectPlayer";
import { SelectSpace } from "./SelectSpace";

export const WaitingFor = Vue.component("waiting-for", {
    props: ["player", "players", "waitingfor"],
    data: function () {
        return {}
    },
    components: {
        "and-options": AndOptions,
        "or-options": OrOptions,
        "select-amount": SelectAmount,
        "select-card": SelectCard,
        "select-option": SelectOption,
        "select-how-to-pay": SelectHowToPay,
        "select-how-to-pay-for-card": SelectHowToPayForCard,
        "select-player": SelectPlayer,
        "select-space": SelectSpace
    },
    methods: {
        waitForUpdate: function () {
            const vueApp = this;
            const askForUpdate = () => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "/api/waitingfor" + window.location.search);
                xhr.onerror = function () {
                    alert("Error getting waitingfor data");
                };
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const result = xhr.response;
                        if (result["result"] === "GO") {
                            (vueApp as any).$root.updatePlayer();
                            navigator.serviceWorker.register('/sw.js');
                            Notification.requestPermission(function(result) {
                            if (result === 'granted') {
                                navigator.serviceWorker.ready.then(function(registration) {
                                registration.showNotification("It's your turn!");
                                });
                            }
                            });
                            /*
                            if (Notification.permission !== 'granted') {
                                Notification.requestPermission();
                            }
                            if (Notification.permission === "granted") {
                                new Notification('Terraforming Mars Online', {
                                    icon: "/favicon.ico",
                                    body: "It's your turn!",
                                });
                            }
                            */
                            return
                        }
                        (vueApp as any).waitForUpdate();
                    } else {
                        alert("Unexpected server response");
                    }
                }
                xhr.responseType = "json";
                xhr.send();
            }
            setTimeout(askForUpdate, 5000);
        }
    },
    render: function (createElement) {
        if (this.waitingfor === undefined) {
            (this as any).waitForUpdate();
            return createElement("div", "Not your turn to take any actions");
        }
        return new PlayerInputFactory().getPlayerInput(createElement, this.players, this.player, this.waitingfor, (out: Array<Array<string>>) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/player/input?id=" + (this.$parent as any).player.id);
            xhr.responseType = "json";
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const root = (this.$root as any);
                    root.$data.screen = "empty";
                    root.$data.player = xhr.response;
                    root.$data.playerkey++;
                    root.$data.screen = "player-home";
                    if (root.$data.player.phase == "end" && window.location.pathname !== "/the-end") {
                        (window as any).location = (window as any).location;
                    }

                } else if (xhr.status === 400 && xhr.responseType === 'json') {
                    const element: HTMLElement | null = document.getElementById("dialog-default");
                    const message: HTMLElement | null = document.getElementById("dialog-default-message");
                    if (message !== null && element !== null && (element as HTMLDialogElement).showModal !== undefined) {
                        message.innerHTML = xhr.response.message;
                        (element as HTMLDialogElement).showModal();
                    } else {
                        alert(xhr.response.message);
                    }
                } else {
                    alert("Error sending input");
                }
            }
            xhr.send(JSON.stringify(out));  
        }, true);
    }
});

