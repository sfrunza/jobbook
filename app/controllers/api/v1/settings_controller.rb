class Api::V1::SettingsController < ApplicationController
  before_action :set_setting, only: %i[ show edit update destroy ]

  # GET /settings or /settings.json
  def index
    @settings = Setting.all
    render json: @settings
  end

  # GET /settings/1 or /settings/1.json
  def show
    setting = Setting.find(params[:id])
    render json: setting
  end

  # GET /settings/new
  def new
    @setting = Setting.new
  end

  # GET /settings/1/edit
  def edit
  end

  # POST /settings or /settings.json
  def create
    @setting = Setting.new(setting_params)

    if @setting.save
      render json: {
               message: "Setting added!",
               setting: @setting,
             }, status: :created
    else
      render json: @setting.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /settings/1 or /settings/1.json
  def update
    if @setting.update(setting_params)
      render json: {
               message: "Settings updated!",
               setting: @setting,
             }, status: :accepted
    else
      render json: @setting.errors, status: :unprocessable_entity
    end
  end

  # DELETE /settings/1 or /settings/1.json
  def destroy
    @setting.destroy
    render json: { message: "Setting deleted" }, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_setting
      @setting = Setting.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def setting_params
      params.require(:setting).permit(:extra_time)
    end
end
