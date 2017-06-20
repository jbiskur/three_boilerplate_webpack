import "./scss/main.scss";

import TestView from "views/TestView"

var application = null;
$(document).ready(function () {
  "use strict";
  application = new TestView();
  application.Run();
  }
);

/* enables hot reloading of modules */
if (module.hot) {
  module.hot.accept();
}