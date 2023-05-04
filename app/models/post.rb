class Post < ApplicationRecord
  belongs_to :user
  belongs_to :truck
  has_many :photos, dependent: :destroy
end
