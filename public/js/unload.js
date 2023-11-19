function unload() {
  console.log("Triggered");
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);
  };
}

export default unload;