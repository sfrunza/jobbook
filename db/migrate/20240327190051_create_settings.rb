class CreateSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :settings do |t|
      t.float :extra_time

      t.timestamps
    end
  end
end
