/* Edit this file to fill in the missing pieces of the portfolio.
   Anything left empty stays hidden (or keeps its placeholder), so the page never shows broken buttons. */
window.SITE = {
  /* CV file placed next to index.html, for example "Ahmed-Elzaher-CV.pdf". Empty hides both CV buttons. */
  cv: "",

  /* Short availability line shown above the name, for example "Open to Flutter roles". Empty hides it. */
  status: "",

  /* Experience, training and certificates, newest first. An empty list hides the whole section.
     Example:
     { period: "Jul 2025 - Sep 2025", title: "Flutter Developer Trainee", place: "Company name", text: "One or two sentences about what you did." } */
  experience: [],

  /* Screenshots for the phone frames, in order. Use a file path like "screens/matchin-signin.png".
     An item can also be { src: "screens/x.png", caption: "Sign in" } to change the caption.
     Empty strings keep the "Screenshot coming soon" placeholder. */
  shots: {
    matchin: ["", "", ""],
    engipedia: ["", "", ""]
  },

  /* One screenshot per project to show on the screen of the 3D phone. Empty keeps the project card. */
  phoneShots: {
    matchin: "",
    engipedia: ""
  }
};
