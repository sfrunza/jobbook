class Api::V1::UserJobsController < ApplicationController
  before_action :set_user, only: %i[ index available_months filtered_jobs show edit update destroy ]
  before_action :set_job, only: %i[ show edit update destroy ]

  def index
    if params[:start] && params[:end]
      start_date = params[:start]
      end_date = params[:end]
      date_range = Date.parse(start_date)..Date.parse(end_date)

      jobs = @user.jobs.where(:date => date_range).order("date DESC")

      total_jobs = jobs.length
      total_tips = jobs.sum(:tips)
      total_boxes = jobs.sum(:boxes)
      total_hours = sum(jobs)
      render json: { total_jobs: total_jobs, total_hours: total_hours, total_tips: total_tips, total_boxes: total_boxes,
                     :jobs => ActiveModelSerializers::SerializableResource.new(jobs, each_serializer: JobSerializer) }
    end
  end

  def filtered_jobs
    if params[:start] != "" || params[:end] != ""
      start_date = params[:start]
      end_date = params[:end]
      date_range = Date.parse(start_date)..Date.parse(end_date)

      jobs = @user.jobs.where(:date => date_range).order("date DESC")
      total_jobs = jobs.length
      total_tips = jobs.sum(:tips)
      total_hours = sum(jobs)
      render json: { total_jobs: total_jobs, total_hours: total_hours, total_tips: total_tips, jobs: jobs }
    end
  end

  def available_months
    if @user.jobs.length > 0
      months = @user.jobs.map { |job| Date.parse(job.date).strftime("%b %Y") }.uniq
      sorted = months.sort_by { |s| Date.parse s }

      render json: { months: sorted.reverse }
    else
      render json: { months: [] }
    end
  end

  def sum(array)
    sum = 0
    array.each do |job|
      extra_time = job.extra_time || 0;
      min_time = job.min_time ? 5 : job.work_time
      sum += extra_time + min_time
    end
    return sum
  end

  def create
    @job = Job.new(job_params)
    if @job.save
      render json: {
               status: :created,
               message: "Job added!",
               job: @job,
             }
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

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

  def destroy
    @job.destroy
    render json: { message: "Job deleted!" }, status: :ok
  end

  protected

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

  def job_params
    params.fetch(:job, {}).permit(:date, :job_id, :work_time, :tips, :boxes, :comments, :user_id, :extra_hour, :min_time, :extra_time, :teammates => [])
  end
end
