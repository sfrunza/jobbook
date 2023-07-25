class Api::V1::UserHoursController < ApplicationController
  def index
    if params[:month]
      @date = Date.parse(params[:month])
      @users = User.where(active: true)
      @range = @date.beginning_of_month..@date.end_of_month
    end
    if params[:start] && params[:end]
      @start_date = Date.parse(params[:start])
      @end_date = Date.parse(params[:end])
      @users = User.where(active: true)
      @range = @start_date..@end_date
    end
    render json: {
             :users => ActiveModelSerializers::SerializableResource.new(@users, each_serializer: UserHoursSerializer, range: @range),
           }
  end
end
