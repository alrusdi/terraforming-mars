
import Vue, { VNode } from "vue";
import { PlayerInputFactory } from "./PlayerInputFactory";

let unique: number = 0;

export const OrOptions = Vue.component("or-options", {
    props: ["playerinput", "onsave"],
    data: function () {
        return {
            selectedOption: 0
        };
    },
    render: function (createElement) {
        unique++;
        const children: Array<VNode> = [];
        children.push(createElement("div", this.playerinput.title));
        const optionElements: Array<VNode> = [];
        this.playerinput.options.forEach((option: any, idx: number) => {
            const subchildren: Array<VNode> = [];
            subchildren.push(createElement("label", [
                createElement("input", { domProps: { className: "nes-radio", name: "selectOption" + unique, type: "radio", value: String(idx) }, on: { change: (event: any) => {
                    this.selectedOption = Number(event.target.value);
                    optionElements.forEach((optionElement, optionIdx) => {
                        if (optionIdx === this.selectedOption) {
                            (optionElement.elm as HTMLElement).style.display = "block";
                        } else {
                            (optionElement.elm as HTMLElement).style.display = "none";
                        }
                    });
                }}}),
                createElement("span", option.message)
            ]));
            subchildren.push(createElement("div", { style: { display: "none" } }, [new PlayerInputFactory().getPlayerInput(createElement, option, (out: Array<Array<string>>) => {
                out.unshift([String(idx)]);
                this.onsave(out);
            })]));
            optionElements.push(subchildren[subchildren.length - 1]);
            children.push(createElement("div", subchildren));
        });
        return createElement("div", children);
    }
});

