
import Vue, { VNode } from "vue";

export const SelectOption = Vue.component("select-option", {
    props: ["playerinput", "onsave", "showtitle"],
    data: function () {
        return {};
    },
    render: function (createElement) {
        const children: Array<VNode> = [];
        if (this.showtitle) {
            children.push(createElement("div", this.playerinput.title));
        }
        children.push(createElement("button", { domProps: { className: "nes-btn" }, on: { click: () => { this.onsave([["1"]]); } } }, "Select"));
        return createElement("div", children);
    }
});


