import { html, css, LitElement } from 'lit';
import { sharedStyles } from '../styles.js'
class MyElement extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
    `,
  ];

  render() {
    return html`
      <section class="main">
        <div class="quest-card">
          <div class="flex-between">
            <div class="task-title">Mastering Eth book</div>
            <div style="display: flex">
              <svg
                width="24"
                height="24"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 12.5L10 15.5L17 8.5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div id="divider"></div>
          <div class="flex-between">
            <div class="timestamp">Daily Task</div>

            <div
              style="
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 5px;
            "
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-edit-3"
                >
                  <path d="M12 20h9"></path>
                  <path
                    d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                  ></path>
                </svg>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
        <div class="quest-card">
          <div>Mastering Eth book</div>
          <div id="divider"></div>
          <div>Crypto Wallet redesign</div>
        </div>
      </section>
    `;
  }
}

customElements.define('my-element', MyElement);
