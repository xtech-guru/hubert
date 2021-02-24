import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Paragraph = () => {
  return (
    <>
      In unserem Fensterratgeber nehmen wir außerdem speziell das Thema Fenster
      unter die Lupe und liefern Ratschläge und Hinweise – etwa zur Pflege und
      zum Streichen von Holzfenstern.<p></p>
      <h2>Unsere Liebe zu Holz</h2>
      <p>
        Hubert wird herausgegeben von
        <a href="https://www.sorpetaler.de/" target="_blank" rel="noopener">
          Sorpetaler Fensterbau
        </a>
        . Wir bauen seit jeher leidenschaftlich gerne Fenster aus Holz und
        Holz-Aluminium-Fenster sowie Haustüren und Terrassentüren aus Holz und
        Holz-Aluminium. Unsere Liebe zum Werkstoff Holz wollen wir mit Hubert
        weitertragen. Wir wissen von vielen anderen, dass sie diese Liebe zum
        Werkstoff Holz teilen. Für all jene ist das Magazin.
      </p>
      <p>
        Der Name unseres Magazins kommt dabei nicht von ungefähr:
        Schreinermeister Hubert Appelhans, seines Zeichens Gründer der
        Sorpetaler Fensterbau GmbH, übernahm die Landschreinerei Appelhans im
        Jahr 1947 und war immer davon überzeugt, dass Holz das beste und
        schönste Material für Fenster ist.
      </p>
      <p>
        Bei dieser Auffassung sind wir bis heute geblieben&nbsp;
        <strong>#WirliebenHolz</strong>.
      </p>
      <h2>Gefällt dir Hubert?</h2>
      <p>
        Wir freuen uns immer sehr über Feedback. Schreib uns gerne eine
        Nachricht an:{" "}
        <a href="mailto:post@hubert-magazin.de">post@hubert-magazin.de</a>
      </p>
    </>
  )
}

const Header = () => {
  return (
    <>
      <h1>Über uns</h1>
      <p>Ein Hallo von Hubert – dem Magazin für Holz-Kultur!</p>
      <p>
        Schön, dass du da bist. Bei Hubert informieren wir dich über die
        neuesten Trends rund um den Werkstoff Holz, über aktuelle Entwicklungen
        in der Architektur und nachhaltiges Bauen und Wohnen. Wir liefern
        Interviews mit spannenden Persönlichkeiten aus der Branche und bieten
        Tipps und Tricks für die ideale Pflege und Behandlung von Holz.
      </p>
    </>
  )
}

const Content = () => {
  return (
    <>
      <div className="float-md-left unpad-left">
        <img
          className="alignnone wp-image-6815"
          src="https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns.png"
          alt="Oben: Hubert Appelhans (ganz rechts) vor der Landschreinerei Appelhans; unten: Holz für die Fensterfertigung, Anfertigung des Glasleistenrahmens"
          width="500"
          height="500"
          srcSet="https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns.png 800w, https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns-150x150.png 150w, https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns-300x300.png 300w, https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns-768x768.png 768w, https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns-380x380.png 380w"
          sizes="(max-width: 500px) 100vw, 500px"
        />
      </div>
      <Paragraph />
    </>
  )
}

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <div className="page-content">
      <article className="container">
        <div className="content padded-content">
          <Header />
          <Content />
        </div>
      </article>
    </div>
  </Layout>
)

export default AboutPage
