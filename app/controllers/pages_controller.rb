class PagesController < ApplicationController
  def bracket
    @teams = Team.all
  end

  def mobile
    @teams = Team.all
  end
end
