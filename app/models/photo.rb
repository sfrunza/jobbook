require "carrierwave/orm/activerecord"

class Photo < ApplicationRecord
  mount_uploader :photo, ImageUploader
  belongs_to :post

  def total_photos
    self.photos.count
  end
end
