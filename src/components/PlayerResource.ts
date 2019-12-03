
import Vue from "vue";

export const PlayerResource = Vue.component("player-resource", {
    props: ["type", "prod_label", "count", "production"],
    data: function () {
        return {};
    },
    methods: {
        "main_css_class": function () {
            return "info-" + this.type;
        },
        "icon_css_class": function () {
            return "ri-" + this.type;
        },
    },
    template: `
        <div class="info-item" :class="main_css_class()">
            <div class="info-stock">
                <icon class="resource-icon" :class="icon_css_class()"></icon>
                <div class="info-stock-count">: {{ count }}</div>
            </div>
            <div class="info-prod">
            {{ prod_label }}: <span class="info-prod-count">{{ production }}</span>
            </div>
        </div>
    `
});

