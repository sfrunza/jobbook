class JobSerializer < ActiveModel::Serializer
  attributes :id, :job_id, :date, :work_time, :tips, :boxes, :comments, :teammates, :user_id, :min_time, :extra_hour, :total_images, :user

  def total_images
    object.images.length
  end

  def user
    {
      id: object.user.id,
      username: object.user.username,
      role_names: object.user.role_names,
    }
  end
end
