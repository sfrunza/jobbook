class Api::V1::JobsController < ApplicationController
  before_action :set_jobs, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /jobs or /jobs.json
  def index
    if current_user && current_user.admin
      #   @jobs = Job.all.order("id DESC")
      #   render json: @jobs
      @jobs = current_user.jobs.order("date DESC")
      render json: @jobs
    elsif current_user
      @jobs = current_user.jobs.order("date DESC")
      render json: @jobs
    else
      render json: { current_user: nil, message: "Please sign in.", status: 401, logged_in: false }
    end
  end

  # GET /jobs/1 or /jobs/1.json
  def show
    @jobs = current_user.jobs
    @job = @jobs.find(params[:id])
    render json: @job
  end

  # GET /jobs/new
  def new
    @job = Job.new
  end

  # GET /jobs/1/edit
  def edit
    # if @job.update(job_params)
    #   render json: @job
    # else
    #   render json: @job.errors, status: :unprocessable_entity
    # end
  end

  # job /jobs or /jobs.json
  def create
    @job = Job.new(job_params)

    respond_to do |format|
      if @job.save
        format.json { render json: @job, status: :created }
      else
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /jobs/1 or /jobs/1.json
  def update
    respond_to do |format|
      if @job.update(job_params)
        # format.html { redirect_to job_url(@job), notice: "job was successfully updated." }
        format.json { render json: @job, status: :ok }
      else
        # format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /jobs/1 or /jobs/1.json
  def destroy
    @job.destroy
    render json: { message: "job deleted" }, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_jobs
    @job = Job.find(params[:id])
  rescue => e
    logger.info e
    render json: { message: "job id not found" }, status: :not_found
  end

  # Only allow a list of trusted parameters through.
  def job_params
    params.fetch(:job, {}).permit(:date, :job_id, :work_time, :tips, :comments, :user_id, :teammates => [])
  end
end
