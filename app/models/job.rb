class Job < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy

  include PgSearch::Model
  pg_search_scope(
    :search,
    against: [:job_id],
    :order_within_rank => "created_at DESC",
    using: {
      tsearch: {
        dictionary: "english",
      },
    },
  )
end
