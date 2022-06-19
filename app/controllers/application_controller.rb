class ApplicationController < ActionController::Base
  #   before_action :authenticate_user!
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end
end
