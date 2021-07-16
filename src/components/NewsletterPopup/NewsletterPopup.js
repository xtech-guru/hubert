import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"

import * as styles from "./NewsletterPopup.module.scss"
import iconLetter from "../../images/letter.svg"
import iconClose from "../../images/close.svg"
import iconArrowDown from "../../images/arrow-down.svg"

const POPUP_VISIBLE_LOCAL_STORAGE_KEY = "newsletter_popup_visible"
const CREATE_NEWSLETTER_CONTACT_ENDPOINT =
  "/.netlify/functions/create-newsletter-contact"

const NewsletterSubscriptionStatus = {
  default: "DEFAULT",
  success: "SUCCESS",
  fail: "FAIL",
}

export function NewsletterPopup() {
  const [subscriptionStatus, setSubscriptionStatus] = useState(
    NewsletterSubscriptionStatus.default
  )

  const [email, setEmail] = useState("")
  const [isHidden, setHidden] = useState(true)
  const [isClosed, setClosed] = useState(true)
  const [isCollapsed, setCollapsed] = useState(false)

  const toggleCollapse = useCallback(() => {
    setCollapsed(prevState => !prevState)
  }, [])

  const closePopup = useCallback(() => {
    setHidden(true)
    localStorage.setItem(POPUP_VISIBLE_LOCAL_STORAGE_KEY, "false")
  }, [])

  const onSubmit = useCallback(
    async event => {
      event.preventDefault()
      try {
        const response = await axios.post(CREATE_NEWSLETTER_CONTACT_ENDPOINT, {
          email,
        })

        if (response.status === 201) {
          setEmail("")
          return setSubscriptionStatus(NewsletterSubscriptionStatus.success)
        }

        throw new Error()
      } catch (e) {
        setSubscriptionStatus(NewsletterSubscriptionStatus.fail)
      }
    },
    [email]
  )

  const onEmailChange = useCallback(event => {
    setEmail(event.target.value)
  }, [])

  const onCloseButtonKeyPress = useCallback(
    event => {
      if (event.key === " ") {
        closePopup()
      }
    },
    [closePopup]
  )

  const onToggleButtonKeyPress = useCallback(
    event => {
      if (event.key === " ") {
        toggleCollapse()
      }
    },
    [toggleCollapse]
  )

  useEffect(() => {
    setTimeout(() => {
      const shouldPopupBeVisible = localStorage.getItem(
        POPUP_VISIBLE_LOCAL_STORAGE_KEY
      )

      if (shouldPopupBeVisible !== "false") {
        setHidden(false)
        setClosed(false)
      }
    }, 5000)
  }, [])

  return (
    <div
      className={`${styles.container} ${
        (isHidden || isClosed) && styles.hiddenPopup
      }`}
    >
      <div className={styles.header} isCollapsed={isCollapsed}>
        <div>
          <div>
            <div>
              <img src={iconLetter} alt="" />
              <p>NICHTS VERPASSEN!</p>
            </div>
          </div>
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={closePopup}
          onKeyPress={onCloseButtonKeyPress}
        >
          <img src={iconClose} alt="" />
        </div>
        <span
          role="button"
          tabIndex={0}
          onClick={toggleCollapse}
          onKeyPress={onToggleButtonKeyPress}
        >
          <img
            className={`${styles.collapseIcon} ${
              isCollapsed && styles.collapsedIcon
            }`}
            src={iconArrowDown}
            alt=""
          />
        </span>
      </div>
      <div
        className={`${styles.content} ${
          isCollapsed ? styles.collapsedContent : styles.uncollapsedContent
        }`}
      >
        <div>
          <div>
            <p>
              Du willst regelmäßig die neuesten Hubert-Artikel erhalten? Dann
              melde dich jetzt für unseren Newsletter an.
            </p>
          </div>
          <div>
            <div>
              <div id="mailjet-widget-title-wrap">
                <h3>Newsletter</h3>
              </div>

              <form
                id="mailjetSubscriptionForm"
                name="wp_mailjet_subscribe_widget-2"
                onSubmit={onSubmit}
              >
                <div>
                  <input
                    type="email"
                    name="subscription_email"
                    id="mailjet_widget_email"
                    required="required"
                    placeholder="* ihre@email.com"
                    value={email}
                    onChange={onEmailChange}
                  />
                  <input
                    type="hidden"
                    name="subscription_locale"
                    id="mailjet_widget_locale"
                    value="de_DE"
                  />
                  <input
                    type="hidden"
                    name="action"
                    value="send_mailjet_subscription_form"
                  />
                </div>
                <input
                  type="hidden"
                  name="widget_id"
                  value="wp_mailjet_subscribe_widget-2"
                />
                <input type="submit" value="Registrieren" />
              </form>
              <span>
                {subscriptionStatus === NewsletterSubscriptionStatus.success &&
                  "E-Mail zur Bestätigung des Abonnements gesendet. Bitte überprüfen Sie Ihren Posteingang und bestätigen Sie Ihr Abonnement."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
