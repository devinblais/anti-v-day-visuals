class PagesController < ApplicationController
  def bracket
    @teams = [
      "",
      "Team one",
      "Team Two"
    ]
  end
end
