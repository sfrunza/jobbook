class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :date
      t.belongs_to :user, index: true
      t.belongs_to :truck, index: true

      t.timestamps
    end
  end
end
