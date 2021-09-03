/* typehints:start */
import { Application } from "../application";
/* typehints:end */

import { randomChoice } from "../core/utils";
import { T } from "../translations";

export class GameLoadingOverlay {
    /**
     *
     * @param {Application} app
     * @param {HTMLElement} parent
     */
    constructor(app, parent) {
        this.app = app;
        this.parent = parent;

        /** @type {HTMLElement} */
        this.element = null;
    }

    /**
     * Removes the overlay if its currently visible
     */
    removeIfAttached() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }

    /**
     * Returns if the loading overlay is attached
     */
    isAttached() {
        return this.element;
    }

    /**
     * Shows a super basic overlay
     * @param {string} gameModeId
     */
    showBasic(gameModeId) {
        assert(!this.element, "Loading overlay already visible, cant show again");
        console.log(gameModeId);
        this.element = document.createElement("div");
        this.element.classList.add("gameLoadingOverlay");
        this.parent.appendChild(this.element);
        this.internalAddSpinnerAndText(this.element);
        this.internalAddHint(this.element, gameModeId);
    }

    /**
     * Adds a text with 'loading' and a spinner
     * @param {HTMLElement} element
     */
    internalAddSpinnerAndText(element) {
        const inner = document.createElement("span");
        inner.classList.add("prefab_LoadingTextWithAnim");
        element.appendChild(inner);
    }

    /**
     * Adds a random hint
     * @param {HTMLElement} element
     * @param {string} gameModeId
     */
    internalAddHint(element, gameModeId) {
        const hint = document.createElement("span");
        let tips;
        if (!gameModeId) tips = T.tips;
        else if (gameModeId.includes("Edit")) tips = T.createPuzzleTips;
        else tips = T.playPuzzleTips;

        hint.innerHTML = randomChoice(tips);
        hint.classList.add("prefab_GameHint");
        element.appendChild(hint);
    }
}
