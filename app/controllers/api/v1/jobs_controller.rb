class Api::V1::JobsController < ApplicationController
  before_action :authenticate_user!

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
end
