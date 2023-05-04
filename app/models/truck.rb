class Truck < ApplicationRecord
  has_many :posts, dependent: :destroy
end
