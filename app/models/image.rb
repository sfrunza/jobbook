require "carrierwave/orm/activerecord"

class Image < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :job

  def total_images
    self.images.count
  end
end
