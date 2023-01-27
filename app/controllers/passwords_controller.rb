class PasswordsController < Devise::PasswordsController
  respond_to :json

  def create
    @user = User.send_reset_password_instructions(params[:user])
    if successfully_sent?(@user)
      render :json => { :success => true }
    else
      render json: {
        status: 404,
        error: "User not found for this Email",
      }
    end
  end
end
