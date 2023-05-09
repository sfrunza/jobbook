class Api::V1::PostsController < ApplicationController
  # before_action :set_truck, only: %i[ index show edit update destroy ]
  before_action :set_post, only: %i[ show edit update destroy ]

  # GET /posts or /posts.json
  def index
    truck = params[:truck]
    start_date = params[:start]
    end_date = params[:end]

    @posts = current_user && current_user.admin ? Post.all : current_user.posts

    if start_date != "null" and end_date != "null" and truck == "all"
      date_range = Date.parse(start_date)..Date.parse(end_date)
      filtered_posts = @posts.where(:date => date_range).order("date DESC")

      render json: filtered_posts
    elsif start_date != "null" and end_date != "null" and truck.match(/^(\d)+$/)
      date_range = Date.parse(start_date)..Date.parse(end_date)
      filtered_posts = @posts.where(:date => date_range, truck_id: truck.to_i).order("date DESC")

      render json: filtered_posts
    elsif truck.match(/^(\d)+$/)
      filtered_posts = @posts.where(truck_id: truck.to_i).order("id DESC").limit(20)

      render json: filtered_posts
    else
fff = @posts.order("id DESC").limit(20)
      render json: fff
    end
  end

  # GET /posts/1 or /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts or /posts.json
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: {
               message: "Saved",
               post: @post,
             }, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    if @post.update(post_params)
      render json: {
               message: "Truck updated!",
               post: @post,
             }, status: :accepted
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy
    render json: { message: "Deleted" }, status: :ok
  end

  private

  # def set_truck
  #   @truck = Truck.find(params[:truck_id])
  # end

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:date, :user_id, :truck_id)
  end
end
