class Api::V1::UserHoursController < ApplicationController
  def index
    if params[:month]
# year = Date.parse(params[:month], "%Y")
date = Date.parse(params[:month])
# date = Date.parse("#{year}-#{mo}-01")
      @users = User.all
range = date.beginning_of_month..date.end_of_month

      render json: {
               :users => ActiveModelSerializers::SerializableResource.new(@users, each_serializer: UserHoursSerializer, range: range),
             }
    end
  end
end
