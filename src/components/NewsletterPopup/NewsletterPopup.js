import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

const POPUP_VISIBLE_LOCAL_STORAGE_KEY = "newsletter_popup_visible"

export function NewsletterPopup() {
  const [isClosed, setClosed] = useState(true)

  const [isCollapsed, setCollapsed] = useState(false)

  const toggleCollapse = useCallback(() => {
    setCollapsed(prevState => !prevState)
  }, [])

  const closePopup = useCallback(() => {
    setClosed(true)
    localStorage.setItem(POPUP_VISIBLE_LOCAL_STORAGE_KEY, "false")
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const shouldPopupBeVisible = localStorage.getItem(
        POPUP_VISIBLE_LOCAL_STORAGE_KEY
      )

      setClosed(Boolean(shouldPopupBeVisible))
    }, 5000)
  }, [])

  return (
    <NewsLetterPopupContainer isClosed={isClosed} isCollapsed={isCollapsed}>
      <NewLetterPopupHeader isCollapsed={isCollapsed}>
        <div>
          <div>
            <div>
              <img
                src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/letter.svg"
                alt=""
              />
              <p>Do not miss anything!</p>
            </div>
          </div>
        </div>
        <div onClick={closePopup}>
          <img
            src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/close.svg"
            alt=""
          />
        </div>
        <span onClick={toggleCollapse}>
          <img
            src=" https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/arrow-down.svg"
            alt=""
          />
        </span>
      </NewLetterPopupHeader>
      <NewLetterPopupContent>
        <div>
          <div>
            <p>
              Would you like to receive the latest Hubert articles on a regular
              basis? Then register now for our newsletter.
            </p>
          </div>
          <div>
            <div>
              <div id="mailjet-widget-title-wrap">
                <h3>Newsletter</h3>
              </div>

              <form
                method="post"
                action=""
                id="mailjetSubscriptionForm"
                name="wp_mailjet_subscribe_widget-2"
              >
                <div>
                  <input
                    type="email"
                    name="subscription_email"
                    id="mailjet_widget_email"
                    required="required"
                    placeholder="* your@email.com"
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
                <input type="submit" value="to register" />
              </form>
              <span />
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
    props.isClosed ? "-255px" : props.isCollapsed ? "-177px" : "0"};
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
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;

    > div:first-child {
      display: flex;
      align-items: center;
      margin-left: 8.3333333333%;
      flex: 0 0 50%;
      max-width: 50%;
      padding-right: 15px;
      padding-left: 15px;
      position: relative;
      width: 100%;
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
      margin-left: 8.3333333333%;
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
      padding-right: 15px;
      padding-left: 15px;
      position: relative;
      width: 100%;
      min-height: 1px;

      > div {
        margin-bottom: 20px;

        > div {
          display: inline;
          font-size: 12px;

          > h3 {
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

          > input:last-child {
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
