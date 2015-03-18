describe "app start test",()->
  app = null
  beforeEach ->
    app = angular.module("app")

  it "app defined",->
    expect(app).not.to.be.null

  it "what app?",()->
    expect(app()).to.equal("it's funtastic seed")
