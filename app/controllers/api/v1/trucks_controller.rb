class Api::V1::TrucksController < ApplicationController
  before_action :set_truck, only: %i[ show edit update destroy ]

  # GET /trucks or /trucks.json
  def index
    @trucks = Truck.all.order("id ASC")
    render json: @trucks
  end

  # GET /trucks/1 or /trucks/1.json
  def show
    @truck = Truck.find(params[:id])
    # render json: @truck.to_json(
    #   :include => {
    #     :posts => { only: [:id, :date, :created_at] },
    #   },
    # )
    render json: @truck
  end

  # GET /trucks/new
  def new
    @truck = Truck.new
  end

  # GET /trucks/1/edit
  def edit
  end

  # POST /trucks or /trucks.json
  def create
    @truck = Truck.new(truck_params)

    if @truck.save
      render json: {
               message: "Truck added!",
               truck: @truck,
             }, status: :created
    else
      render json: @truck.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /trucks/1 or /trucks/1.json
  def update
    if @truck.update(truck_params)
      render json: {
               message: "Truck updated!",
               truck: @truck,
             }, status: :accepted
    else
      render json: @truck.errors, status: :unprocessable_entity
    end
  end

  # DELETE /trucks/1 or /trucks/1.json
  def destroy
    @truck.destroy
    render json: { message: "Truck deleted" }, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_truck
    @truck = Truck.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def truck_params
    params.require(:truck).permit(:name)
  end
end
