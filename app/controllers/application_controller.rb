class ApplicationController < ActionController::Base
  #   before_action :authenticate_user!
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  def fallback_index_html
    render :file => "/public/index.html"
  end
end
