class SessionsController < Devise::SessionsController

  # POST /v1/login
  def create
    # @user = User.find_by_email(user_params[:email])
    @user = User.find_for_authentication(:email => user_params[:email])
    return invalid_login_attempt unless @user

    if @user.valid_password?(user_params[:password])
      sign_in :user, @user
      render json: {
        status: :accept,
        user: @user,
      }
    else
      render json: {
               status: 401,
               error: "Invalid password",
             }
    end
  end

  def destroy
    @user = User.find(current_user.id)
    sign_out(@user)
    render :json => { :success => true }
  end

  private

  def invalid_login_attempt
    warden.custom_failure!
    # render json: {error: ['No such user!', ' Verify credentials and try again']}, status: :unprocessable_entity
    render json: {
             status: :unprocessable_entity,
             error: "Verify credentials and try again",
           }
  end

  def user_params
    params.require(:user).permit(:email, :password, :active)
  end
end
