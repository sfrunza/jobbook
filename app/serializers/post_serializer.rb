class PostSerializer < ActiveModel::Serializer
  attributes :id, :date, :user, :truck, :total_photos

  def user
    {
      id: object.user.id,
      username: object.user.username,
    }
  end

  def truck
    {
      id: object.truck.id,
      name: object.truck.name,
    }
  end

  def total_photos
    object.photos.length
  end
end
