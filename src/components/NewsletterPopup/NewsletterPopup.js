import React, { useCallback, useEffect, useState, useRef } from "react"
import styled from "styled-components"
import axios from "axios"

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
  const isMounted = useRef(null)

  const [subscriptionStatus, setSubscriptionStatus] = useState(
    NewsletterSubscriptionStatus.default
  )
  const [email, setEmail] = useState("")
  const [isClosed, setClosed] = useState(true)

  const [isCollapsed, setCollapsed] = useState(false)

  const toggleCollapse = useCallback(() => {
    setCollapsed(prevState => !prevState)
  }, [])

  const closePopup = useCallback(() => {
    setClosed(true)
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
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const shouldPopupBeVisible = localStorage.getItem(
        POPUP_VISIBLE_LOCAL_STORAGE_KEY
      )

      if (shouldPopupBeVisible !== "false") {
        setClosed(false)
      }
    }, 5000)
  }, [])

  return (
    <NewsLetterPopupContainer isClosed={isClosed} isCollapsed={isCollapsed}>
      <NewLetterPopupHeader isCollapsed={isCollapsed}>
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
          <img src={iconArrowDown} alt="" />
        </span>
      </NewLetterPopupHeader>
      <NewLetterPopupContent>
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
      </NewLetterPopupContent>
    </NewsLetterPopupContainer>
  )
}

const NewsLetterPopupContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: ${props =>
    props.isClosed ? "-255px" : props.isCollapsed ? "-162px" : "0"};
  background-color: #fff;
  transition: all 0.5s linear;
  transition-delay: 0.4s;
`

const NewLetterPopupHeader = styled.div`
  position: relative;
  display: flex;
  background-color: #0076bf;
  padding: 20px 20px 20px 0;

  > div:first-child {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-right: 15px;
    padding-left: 15px;

    @media (min-width: 576px) {
      width: 540px;
      max-width: 100%;
    }

    @media (min-width: 768px) {
      width: 720px;
      max-width: 100%;
    }

    @media (min-width: 992px) {
      width: 960px;
      max-width: 100%;
    }

    @media (min-width: 1200px) {
      width: 1140px;
      max-width: 100%;
    }

    > div {
      display: flex;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;

      > div {
        flex: 1;
        display: flex;
        align-items: center;
        margin-left: 8.3333333333%;
        max-width: 91.6666666667%;
        padding-right: 15px;
        padding-left: 15px;
        position: relative;
        width: 100%;
        min-height: 1px;

        > img {
          vertical-align: middle;
          border-style: none;
          margin-bottom: 0;
          margin-right: 10px;
          margin-left: 15px;
        }

        > p {
          font-family: Roboto, sans-serif;
          font-size: 22px;
          font-weight: 900;
          line-height: normal;
          letter-spacing: 0.3px;
          margin: 0;
          text-transform: uppercase;
          color: #fff;
        }
      }
    }
  }

  > div:nth-child(2) {
    display: flex;
    align-items: center;
    outline: none;
    & img {
      width: 16px;
      height: 16px;
      cursor: pointer;
      font-family: Merriweather, Georgia, Times New Roman, Times, serif;
      font-weight: 400;
      line-height: 1.5;
      font-size: 0.75rem;
      color: #fff;
      margin-bottom: 0;
    }
  }

  > span {
    position: absolute;
    background-color: #0076bf;
    top: -7px;
    left: 50%;
    padding: 0 5px;
    border-radius: 50%;
    cursor: pointer;
    outline: none;

    & img {
      width: 25px;
      height: 10px;
      margin-bottom: 0;
      transition: all 0.5s linear;
      transform: rotate(${props => (props.isCollapsed ? "180deg" : "0deg")});
      vertical-align: middle;
      border-style: none;
    }
  }
`

const NewLetterPopupContent = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 576px) {
    width: 540px;
    max-width: 100%;
  }

  @media (min-width: 768px) {
    width: 720px;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    width: 960px;
    max-width: 100%;
  }

  @media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
  }

  > div {
    display: flex;
    flex-direction: column;
    padding-top: 15px;
    padding-bottom: 15px;

    @media (min-width: 992px) {
      flex-direction: row;
      justify-content: center;

      > div:first-child {
        max-width: 50%;
      }
    }

    > div:first-child {
      display: flex;
      align-items: center;
      padding-right: 15px;
      padding-left: 15px;
      position: relative;
      min-height: 1px;

      & p {
        color: #4c3e30;
        font-family: Merriweather;
        font-size: 18px;
        line-height: 1.44;
        letter-spacing: 0.13px;
        margin: 0;
      }
    }

    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 15px;
      padding-left: 15px;
      position: relative;
      min-height: 1px;

      > div {
        > div {
          display: inline;
          font-size: 12px;

          > h3 {
            margin-bottom: 0.5rem !important;
            color: white !important;
            vertical-align: inherit;
            font-size: 1.125rem;
            font-family: GT Pressura, -apple-system, system-ui,
              BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
              sans-serif;
            font-weight: 700;
            line-height: 1.1;
          }
        }

        > form {
          display: block;
          margin-top: 0;

          > div:first-child {
            margin-bottom: 10px;

            > input:first-child {
              width: 100%;
              max-width: 300px;
              border: 1px solid #4c3e30;
              font-size: 16px;
              padding: 6px 15px;
              touch-action: manipulation;
              overflow: visible;
              font-family: sans-serif;
              margin: 0;
            }
          }

          > input:first-child {
            width: 10px;
            line-height: inherit;
            touch-action: manipulation;
          }

          & input:last-child {
            margin: 5px 0;
            align-self: flex-start;
            padding: 10px;
            border-radius: 4px;
            background-color: #0076bf;
            color: #fff;
            font-family: Lato, sans-serif;
            font-size: 16px;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 0.12px;
            text-transform: uppercase;
            cursor: pointer;
            -webkit-appearance: button;
            touch-action: manipulation;
            overflow: visible;
          }
        }

        > span {
          font-size: 14px;
          font-family: Merriweather;
          color: #4c3e30;
          margin: 0;
        }
      }
    }
  }
`
