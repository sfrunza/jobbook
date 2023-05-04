class CreateImages < ActiveRecord::Migration[7.0]
  def change
    create_table :images do |t|
      t.string :image
      t.belongs_to :job, index: true

      t.timestamps
    end
  end
end
