class Api::V1::JobsController < ApplicationController
  before_action :set_user, only: %i[ index available_months show edit update destroy ]
  before_action :set_job, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  def index
    month_date_to_search = Date.new(params[:year].to_i, params[:month].to_i, 1)
    start_from = month_date_to_search.beginning_of_month
    finish = Date.new(params[:year].to_i, params[:month].to_i, 1).next_month.beginning_of_month

    @jobs = @user.jobs.where(:date => start_from..finish).order("date DESC")

    @total_jobs = @user.jobs.length
    @total_tips = @jobs.sum(:tips)
    @total_hours = sum(@jobs)
    render json: { total_jobs: @total_jobs, total_hours: @total_hours, total_tips: @total_tips, jobs: @jobs }
  end

  def find_job
    if current_user && current_user.admin
      if params[:search] and params[:search] != ""
        @jobs = Job.where("lower(job_id) like ?", "%#{params[:search].downcase}%")
        render json: { :jobs => ActiveModelSerializers::SerializableResource.new(@jobs, each_serializer: JobSerializer) }
      else 
        render json: { message: "not found" }, status: :not_found
      end
    else
      render json: { message: "Unauthorized", status: 401 }
    end
  end

  def available_months
    if @user.jobs.length > 0
      first = Date.parse(@user.jobs.order("date ASC").first.date)
      last = Date.parse(@user.jobs.order("date ASC").last.date)
      @months = @user.jobs.map { |job| Date.parse(job.date).strftime("%b %Y") }.uniq
      @sorted = @months.sort_by { |d| m, y = d.split(" "); [Date.parse(d).strftime("%m"), Date.parse(d).strftime("%Y")] }

      render json: { months: @sorted }
    else
      render json: { months: [] }
    end
  end

  def sum(array)
    sum = 0
    array.each do |job|
      extra_time = job.extra_hour ? 1 : 0
      min_time = job.min_time ? 5 : job.work_time
      sum += extra_time + min_time
    end
    return sum
  end

  # GET /jobs/1 or /jobs/1.json
  def show
    @jobs = current_user.jobs
    @job = @jobs.find(params[:id])
    render json: @job
  end

  def selected_month
    # @jobs = current_user.jobs
    date_range = Date.parse(params[:my]).beginning_of_month..Date.parse(params[:my]).end_of_month
    @jobs = current_user.jobs.where(:date => date_range).order("date DESC")
    render json: @jobs
  end

  # GET /jobs/new
  def new
    @job = Job.new
  end

  # GET /jobs/1/edit
  def edit
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
    if @job.update(job_params)
      render json: {
               status: :accepted,
               message: "Job updated!",
               job: @job,
             }
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

  # DELETE /jobs/1 or /jobs/1.json
  def destroy
    @job.destroy
    render json: { message: "job deleted" }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  rescue => e
    logger.info e
    render json: { message: "user id not found" }, status: :not_found
  end

  def set_job
    @job = @user.jobs.find(params[:id])
  rescue => e
    logger.info e
    render json: { message: "job id not found" }, status: :not_found
  end

  # Only allow a list of trusted parameters through.
  def job_params
    params.fetch(:job, {}).permit(:date, :job_id, :work_time, :tips, :boxes, :comments, :user_id, :extra_hour, :min_time, :teammates => [])
  end
end
