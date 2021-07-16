import React from "react"

import { Link } from "gatsby"

import * as styles from "./Footer.module.scss"

export function Footer() {
  //TODO: externalize the value to another place more suitable for data
  return (
    <footer className={styles.container}>
      <div>
        <div>
          <div>
            <div>
              <h1 className={styles.heading}>Hubert Magazin</h1>
              <p>
                Hubert ist das neue Online-Magazin für Holz-Kultur, das
                hochwertige und mitreißende Beiträge rund um den Baustoff Holz
                liefert. Hubert wird herausgegeben von Sorpetaler Fensterbau.
              </p>
              <div>
                <Link to="/hubert/about" aria-label="About">
                  Mehr erfahren
                </Link>
              </div>
              <div>
                <a href="mailto:post@hubert-magazin.de" aria-label="Contact-us">
                  post@hubert-magazin.de
                </a>
              </div>
            </div>
            <div>
              <h1 className={styles.heading}>Folge uns</h1>
              <ul className={styles.list}>
                <li>
                  <a
                    href="https://www.facebook.com/hubertmagazin"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pinterest.de/sorpetaler/hubert-magazin-f%C3%BCr-holzkultur/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Pinterest"
                  >
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h1 className={styles.heading}>newsletter</h1>
              <p>
                Verpasse keine Neuigkeiten von Hubert. Jetzt zum Newsletter
                anmelden!
              </p>

              <div>
                <form
                  method="post"
                  action=""
                  name="wp_mailjet_subscribe_widget-2"
                >
                  <div>
                    <input
                      type="email"
                      name="subscription_email"
                      required="required"
                      placeholder="* ihre@email.com"
                      aria-label="subscription email"
                    />
                    <input
                      type="hidden"
                      name="subscription_locale"
                      value="de_DE"
                      aria-label="subscription locale"
                    />
                    <label>
                      <input
                        type="hidden"
                        name="action"
                        value="send_mailjet_subscription_form"
                      />
                    </label>
                  </div>
                  <input
                    type="hidden"
                    name="widget_id"
                    value="wp_mailjet_subscribe_widget-2"
                  />
                  <input
                    type="submit"
                    value="Registrieren"
                    aria-label="subscription submit button"
                  />
                </form>
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.rule} />

      <div>
        <div>
          <div>
            <div>©2017 Hubert</div>
            <div>|</div>
            <div>
              <Link to="/hubert/impressum" aria-label="Impressum">
                Impressum
              </Link>
            </div>
            <div>|</div>
            <div>
              Powered by&nbsp;
              <Link to="/" aria-label="Home">
                Sorpetaler
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
