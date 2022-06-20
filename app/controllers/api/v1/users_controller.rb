class Api::V1::UsersController < ApplicationController
  before_action :set_users, only: %i[ show edit update destroy ]
  # before_action :authenticate_user!,  only: %i[ show edit update destroy filter_users user_jobs ]
  wrap_parameters :user, include: [:first_name, :last_name, :role, :username, :email, :password, :password_confirmation, :reset_password_token, :admin]

  def index
    if current_user
      @users = User.all.order("id DESC")
      @current_user = current_user
      render json: {
               current_user: @current_user,
               logged_in: true,
               users: @users,
             }
      # elsif current_user
      #   render json: {
      #            current_user: current_user,
      #            logged_in: true,
      #          }
    else
      render json: { current_user: nil, message: "Please sign in.", status: 401, logged_in: false }
    end
  end

  def filter_users
    if current_user && current_user.admin
      if params[:search] != ""
        @users = User.select { |u| u.first_name.downcase.include? (params[:search].downcase) or u.last_name.downcase.include? (params[:search].downcase) or u.username.downcase.include? (params[:search].downcase) }
        render json: @users
      elsif params[:role] == "all"
        @users = User.all.order("id DESC")
        render json: @users
      else
        @users = User.where(role: params[:role])
        render json: @users
      end
    else
      render json: { message: "Unauthorized", status: 401 }
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def user_jobs
    if params[:start] != "" || params[:end] != ""
      start_date = params[:start]
      end_date = params[:end]
      date_range = Date.parse(start_date)..Date.parse(end_date)

      @user = User.find(params[:user_id])
      @jobs = @user.jobs.where(:date => date_range).order("date DESC")
      render json: @jobs
    else
      @user = User.find(params[:user_id])
      @jobs = @user.jobs.order("date DESC").last(15)
      render json: @jobs
    end
  end

  def reset
    @token = params[:token].to_s

    @user = User.with_reset_password_token(@token)

    puts @token
    puts @user

    if @user.present? && @user.password_token_valid?
      if @user.reset_password!(params[:password])
        render json: { status: "ok" }, status: :ok
      else
        render json: { error: @user.errors.full_messages, status: :unprocessable_entity }
      end
    else
      render json: { error: ["Link not valid or expired. Try generating a new link."] }, status: :not_found
    end
  end

  def new
    @user = User.new
  end

  def edit
    # if @job.update(job_params)
    #   render json: @job
    # else
    #   render json: @job.errors, status: :unprocessable_entity
    # end
  end

  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.json { render json: @user, status: :created }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        # format.html { redirect_to user_url(@user), notice: "user was successfully updated." }
        format.json { render json: @user, status: :ok }
      else
        # format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy
    render json: { message: "user deleted" }, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_users
    @user = User.find(params[:id])
  rescue => e
    logger.info e
    render json: { message: "user id not found" }, status: :not_found
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.fetch(:user, {}).permit(:id, :first_name, :last_name, :email, :role, :admin, :username, :password, :password_confirmation, :reset_password_token)
  end
end
