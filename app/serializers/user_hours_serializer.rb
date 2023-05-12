class UserHoursSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :total_hours

  def total_hours
    range = @instance_options[:range]
sum(object.jobs.where(:date => range))
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
end
