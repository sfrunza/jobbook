class Api::V1::PhotosController < ApplicationController
  before_action :set_post, only: %i[ index ]

  def index
    @photos = @post.photos
    render json: @photos
  end

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      render json: {
               message: "Photo added!",
               photo: @photo,
             }, status: :created
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    render json: { message: "Photo deleted!" }, status: :ok
  end

  protected

  def set_post
    @post = Post.find(params[:post_id])
  rescue => e
    logger.info e
    render json: { message: "post id not found" }, status: :not_found
  end

  def photo_params
    params.permit(:id, :photo, :post_id)
  end
end
