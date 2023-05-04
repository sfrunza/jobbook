class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.string :job_id
      t.string :date
      t.float :work_time
      t.float :tips
      t.integer :boxes
      t.text :comments
      t.string :teammates, array: true, default: []
      t.belongs_to :user, index: true
      t.boolean :min_time, default: false
      t.boolean :extra_hour, default: false

      t.timestamps
    end
  end
end
