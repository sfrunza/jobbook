class Api::V1::UsersController < ApplicationController
  before_action :set_users, only: %i[ show edit update destroy ]
wrap_parameters :user, include: [:id, :first_name, :last_name, :email, :phone, :active, :admin, :username, :password, :password_confirmation, :reset_password_token, :role_names]

  def index
    if current_user
      @users = User.all.order("id DESC")
      @current_user = current_user
      render json: {
               current_user: @current_user,
               logged_in: true,
               users: @users,
             }
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
        # .sort_by { |a| a.active ? 0 : 1 }
        render json: @users
      else params[:role]
        if params[:role] == "active"
        @users = User.where(active: true).order("id DESC")
        render json: @users
      else
        @users = User.where("? = ANY (role_names) and (active) = ?", params[:role], true).order("id DESC")
        render json: @users
      end       end
    else
      render json: { message: "Unauthorized", status: 401 }
    end
  end

  def available_users
    @current_user = current_user
    @users = User.where(active: true).where.not(id: @current_user.id).order("id DESC")
    render json: { users: @users }
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def user_jobs
    @user = User.find(params[:user_id])

    if params[:start] != "" || params[:end] != ""
      start_date = params[:start]
      end_date = params[:end]
      date_range = Date.parse(start_date)..Date.parse(end_date)

      @jobs = @user.jobs.where(:date => date_range).order("date DESC")
      render json: @jobs
    elsif params[:my] != ""
      date_range = Date.parse(params[:my]).beginning_of_month..Date.parse(params[:my]).end_of_month
      @jobs = @user.jobs.where(:date => date_range).order("date DESC")
      render json: @jobs
    else
      @jobs = @user.jobs
      render json: @jobs
    end
  end

  def selected_month_users
    @user = User.find(params[:user_id])

    date_range = Date.parse(params[:my]).beginning_of_month..Date.parse(params[:my]).end_of_month
    @jobs = @user.jobs.where(:date => date_range).order("date DESC")
    render json: @jobs
  end

  def reset
    @token = params[:token].to_s
    @user = User.with_reset_password_token(@token)

    if @user.present? && @user.password_token_valid?
      if @user.reset_password!(params[:password])
        render :json => { :success => true }
      else
        render json: { error: @user.errors.full_messages, status: :unprocessable_entity }
      end
    else
      render json: { error: "Link not valid or expired. Try generating a new link." }, status: :not_found
    end
  end

  def new
    @user = User.new
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: {
               status: :created,
               message: "Employee added!",
               user: @user,
             }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    if @user.update(user_params)
      render json: {
               status: :accepted,
               message: "Employee updated!",
               user: @user,
             }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy
    render json: { message: "Employee deleted!" }, status: :ok
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
    params.fetch(:user, {}).permit(:id, :first_name, :last_name, :email, :phone, :active, :admin, :username, :password, :password_confirmation, :reset_password_token, :role_names => [])
  end
end
