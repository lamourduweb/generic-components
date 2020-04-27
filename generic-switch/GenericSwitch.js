import { randomId } from '../utils/randomId.js';
import { KEYCODES } from '../utils/keycodes.js';

const random = randomId();

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      height: 16px;
    }

    :host([checked]) .thumb {
      right: 0px;
    }

    :host([disabled]) {
      opacity: 50%;
    }
    
    .button {
      display: inline-block;
      position: relative;
      height: 100%;
      width: 36px;
    }

    .track {
      height: 100%;
      background-color: lightgrey;
    }

    .thumb {
      right: 20px;
      transition: right .1s;
      top: 0;
      position: absolute;
      width: 50%;
      height: 100%;
      background-color: grey;
    }

    #button-${random}:focus .thumb {
      box-shadow: 0 0 0 2px skyblue;
    }

  </style>
  <label part="label" id="label-${random}"><slot>Label</slot></label>
  <div part="button" id="button-${random}" class="button">
    <div part="track" id="track-${random}" class="track"></div>
    <div part="thumb" id="thumb-${random}" class="thumb"></div>
  </div>
`;

export class GenericSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.__checked = false;
  }

  static get observedAttributes() {
    return ['disabled', 'checked'];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.button = this.shadowRoot.getElementById(`button-${random}`);

    this.button.addEventListener('click', this.__onClick.bind(this));
    this.button.addEventListener('keydown', this.__onKeyDown.bind(this));

    this.button.setAttribute('aria-labelledby', `label-${random}`);
    this.button.setAttribute('aria-describedby', `label-${random}`);
    this.button.setAttribute('role', 'switch');

    this.__handleDisabled();
  }

  __handleDisabled() {
    if (this.hasAttribute('disabled')) {
      this.setAttribute('disabled', '');
      this.button.setAttribute('disabled', '');
      this.button.removeAttribute('tabindex');
    } else {
      this.removeAttribute('disabled');
      this.button.removeAttribute('disabled');
      this.button.setAttribute('tabindex', '0');
    }
  }

  __onClick() {
    if (this.hasAttribute('checked')) {
      this.removeAttribute('checked');
    } else {
      this.setAttribute('checked', '');
    }
  }

  __onKeyDown(event) {
    switch (event.keyCode) {
      case KEYCODES.SPACE:
      case KEYCODES.ENTER:
        if (this.hasAttribute('checked')) {
          this.removeAttribute('checked');
        } else {
          this.setAttribute('checked', '');
        }
        break;
      default:
        break;
    }
  }

  __update() {
    if (this.__checked && !this.hasAttribute('disabled')) {
      this.button.setAttribute('aria-checked', 'true');
      this.button.setAttribute('checked', '');
    } else {
      this.button.setAttribute('aria-checked', 'false');
      this.button.removeAttribute('checked');
    }

    this.dispatchEvent(new Event('checked-changed'));
  }

  attributeChangedCallback(name, newVal, oldVal) {
    if (newVal !== oldVal) {
      switch (name) {
        case 'disabled':
          this.__checked = !this.__checked;
          this.__handleDisabled();
          break;
        case 'checked':
          this.__checked = !this.__checked;
          this.__update();
          break;
        default:
          break;
      }
    }
  }
}
