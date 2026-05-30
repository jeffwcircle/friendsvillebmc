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
            </div>
	    <div className="card">

	        <h2>Find Us</h2>

	        <iframe
	            src="https://www.google.com/maps?q=108+E+First+Ave+Friendsville+TN+37737&output=embed"
	            width="100%"
	            height="450"
	            loading="lazy">
	        </iframe>

	    </div>

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