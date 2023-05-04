class Api::V1::ImagesController < ApplicationController
  before_action :set_job, only: %i[ index ]

  def index
    @images = @job.images
    render json: @images
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      render json: {
               message: "Image added!",
               image: @image,
             }, status: :created
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy
    render json: { message: "Image deleted!" }, status: :ok
  end

  protected

  def set_job
    @job = Job.find(params[:job_id])
  rescue => e
    logger.info e
    render json: { message: "job id not found" }, status: :not_found
  end

  def image_params
    params.permit(:id, :image, :job_id)
  end
end
