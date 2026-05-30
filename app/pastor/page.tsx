import PageGallery from "@/components/PageGallery";

export default function PastorPage() {
  return (
    <div className="page-wrapper">

      <div className="top-bar">
        <div className="site-title">
          <h1>Friendsville Bible Methodist Church</h1>
          <p>Friendsville, Tennessee</p>
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/pastor">Pastor's Page</a>
          <a href="/visit">Visit Us</a>
          <a href="/updates">Updates</a>
        </nav>
      </div>

      <div className="container">

        <div className="layout">

          <div className="left-column">

            <div className="card">

              <h2>Pastor Dana Bentz</h2>

              <p>
                Rev. Dana Bentz has been our pastor since August 2006.
                He was assistant pastor from July 2004 to August 2006.
                He graduated from Penn View Bible Institute with a degree
                in Ministerial studies in May 2004.
              </p>

              <p>
                Pastor Bentz and his wife, Debbie, have been married for
                28 years. They have 2 children, Dawn and Michael.
                Dawn and her husband, Wayne, have blessed the Bentz family
                with two beautiful Grandchildren, Reagan Kate Evans and
                Jace Ethan Evans.
              </p>

              <p>
                Family is very important to Pastor &amp; Mrs. Bentz and
                they consider their church congregation part of their family.
              </p>

            </div>

            <div className="photo-gallery">
            </div>
		<PageGallery pageName="pastor" />

          </div>

          <div className="right-column">

            <div className="card">

              <center>

                <img
                  className="pastor-photo"
                  src="/pastor-family.jpg"
                  alt="Pastor Dana Bentz"
                />

                <hr />

                <h3>Schedule of Services</h3>

                <b>Sunday Morning Worship</b> 11:00 AM

                <br />
                <br />

                <b>Sunday Evening Service</b> 6:00 PM

                <br />

                <hr />

                <h3>Visit Us</h3>

                108 E First Ave
                <br />

                Friendsville, TN 37737

                <br />

                Phone: (865) 850-9539

                <br />

                Email: pastorbentz@yahoo.com

              </center>

            </div>

          </div>

        </div>

      </div>

      <div className="footer">
        Friendsville Bible Methodist Church
      </div>

    </div>
  )
}