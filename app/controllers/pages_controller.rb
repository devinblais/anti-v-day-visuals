class PagesController < ApplicationController
  def bracket
    @teams = Team.all
  end
end
